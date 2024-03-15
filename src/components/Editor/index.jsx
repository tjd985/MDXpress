import { useState, useEffect } from "react";
import styled from "styled-components";
import { compile, run } from "@mdx-js/mdx";
import * as jsxRuntime from "react/jsx-runtime";

import EditorView from "../EditorView";
import EditorWrite from "../EditorWrite";
import ErrorFallback from "../shared/ErrorFallback";

function MDXEditor({ setPreview }) {
  const [userCode, setUserCode] = useState("");

  const compileToJs = async () => {
    try {
      const compiledCode = await compile(userCode, {
        outputFormat: "function-body",
      });
      const result = await run(compiledCode.value, jsxRuntime);
      const MDXContent = result.default;

      setPreview(<MDXContent />);
    } catch (error) {
      setPreview(<ErrorFallback error={error} />);
    }
  };

  useEffect(() => {
    compileToJs();

    return;
  }, [userCode]);

  function updateUserCode(ev) {
    setUserCode(ev.target.value);
  }

  return (
    <EditorContainer className="editor">
      <EditorInner className="editor-inner">
        <EditorWrite handleChange={updateUserCode} value={userCode} />
        <EditorView userCode={userCode} />
      </EditorInner>
    </EditorContainer>
  );
}

const EditorContainer = styled.section`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 50vh;
`;

const EditorInner = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  margin: 10px;

  background-color: #1c1d21;
  color: white;
`;

export default MDXEditor;
