import { useEffect, useState } from "react";
import styled from "styled-components";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import * as JSXRuntime from "react/jsx-runtime";
import { createStarryNight, all } from "@wooorm/starry-night";

import ErrorBoundary from "../shared/ErrorBoundary";
import ErrorFallback from "../shared/ErrorFallback";

function EditorView({ userCode }) {
  const [starryNight, setStarryNight] = useState("");

  async function generageStarryNight() {
    setStarryNight(await createStarryNight(all));
  }

  useEffect(() => {
    generageStarryNight();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <CustomEditorView className="editor-view">
        {starryNight &&
          toJsxRuntime(starryNight.highlight(userCode, "source.mdx"), {
            ...JSXRuntime,
          })}
      </CustomEditorView>
    </ErrorBoundary>
  );
}

const CustomEditorView = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
  min-height: 70vh;
  padding: 10px;

  font-size: 1rem;
  font-family: "Courier New", Courier, monospace;
  line-height: 20px;
  letter-spacing: normal;
  white-space: pre-wrap;
  tab-size: 2;
`;

export default EditorView;
