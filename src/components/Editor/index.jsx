import { useState, useEffect } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { compile, run } from "@mdx-js/mdx";

import EditorView from "../EditorView";
import EditorWrite from "../EditorWrite";
import ErrorFallback from "../shared/ErrorFallback";

import getVersionCode from "../../services/getVersionCode";

function MDXEditor({ setPreview }) {
  const [userCode, setUserCode] = useState("");
  const { id, version } = useParams();

  const compileToJs = async () => {
    try {
      const compiledCode = await compile(userCode, {
        outputFormat: "function-body",
        baseUrl: "/Users/ohseongho/Desktop/MDXpress/node_modules",
      });
      const result = await run(compiledCode.value, jsxRuntime);
      const MDXContent = result.default;

      setPreview(<MDXContent />);
    } catch (error) {
      setPreview(<ErrorFallback error={error} />);
    }
  };

  async function setBoilerPlateCode(id, version) {
    const requestResult = await getVersionCode(id, version);

    if (requestResult.result === "Error") {
      return;
    }

    setUserCode(requestResult.content);
  }

  useEffect(() => {
    setBoilerPlateCode(id, version);
  }, [id, version]);

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
