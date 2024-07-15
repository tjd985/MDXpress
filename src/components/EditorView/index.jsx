import { useEffect, useState, useRef } from "react";
import * as JSXRuntime from "react/jsx-runtime";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { createStarryNight, all } from "@wooorm/starry-night";
import styled from "styled-components";
import PropTypes from "prop-types";

import ErrorBoundary from "../shared/ErrorBoundary";
import ErrorFallback from "../shared/ErrorFallback";

import useScrollStore from "../../store/scroll.ts";
import usePackageStore from "../../store/packageList.ts";

function EditorView({ userCode, currentMode }) {
  const [starryNight, setStarryNight] = useState("");
  const viewRef = useRef(null);

  const { left, top } = useScrollStore(state => state.scroll);
  const packageList = usePackageStore(state => state.packageList);

  async function generageStarryNight() {
    setStarryNight(await createStarryNight(all));
  }

  useEffect(() => {
    generageStarryNight();
  }, []);

  useEffect(() => {
    viewRef.current.scrollLeft = left;
    viewRef.current.scrollTop = top;
  }, [left, top]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CustomEditorView className="editor-view" ref={viewRef}>
        {starryNight &&
          toJsxRuntime(
            starryNight.highlight(
              currentMode === "code" ? userCode : JSON.stringify(packageList),
              "source.mdx",
            ),
            {
              ...JSXRuntime,
            },
          )}
      </CustomEditorView>
    </ErrorBoundary>
  );
}

const CustomEditorView = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;

  font-size: 1rem;
  font-family: "Courier New", Courier, monospace;
  line-height: 20px;
  letter-spacing: normal;
  white-space: pre;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

EditorView.propTypes = {
  userCode: PropTypes.string.isRequired,
  currentMode: PropTypes.string.isRequired,
};

export default EditorView;
