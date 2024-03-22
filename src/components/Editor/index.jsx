import { useState, useEffect, useRef } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { compile, run } from "@mdx-js/mdx";

import EditorView from "../EditorView";
import EditorWrite from "../EditorWrite";
import ErrorFallback from "../shared/ErrorFallback";
import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import Button from "../shared/Button/Button";

import getVersionCode from "../../services/getVersionCode";

import usePackageStore from "../../store/packageList";

function MDXEditor({ setPreview }) {
  const { id, version } = useParams();

  const [userCode, setUserCode] = useState("");
  const [editorMode, setEditorMode] = useState("code");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineNumber, setLineNumber] = useState(1);

  const lineNumberRef = useRef(null);

  const setPackage = usePackageStore(state => state.setPackage);
  const packageList = usePackageStore(state => state.packageList);

  async function compileToJs() {
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
  }

  async function setBoilerPlateCode(id, version) {
    setIsModalOpen(true);

    try {
      const requestResult = await getVersionCode(id, version);

      if (requestResult.result === "Error") {
        setIsModalOpen(false);

        return;
      }

      const { targetCode, bundleCodeList } = requestResult.content;

      if (!bundleCodeList.length) {
        setUserCode(targetCode);
        setLineNumber(targetCode.split("\n").length);
        setIsModalOpen(false);

        return;
      }

      bundleCodeList.forEach(bundleCode => {
        const { packageInformation, bundledPackageCode } = bundleCode;

        if (packageList[packageInformation.split(" ")[0]]) {
          return;
        }

        const packageBlob = new Blob([bundledPackageCode], {
          type: "application/javascript",
        });

        const packageBlobURL = URL.createObjectURL(packageBlob);
        const packageScriptEl = document.createElement("script");

        packageScriptEl.src = packageBlobURL;
        document.body.append(packageScriptEl);

        setPackage(packageInformation);
      });

      setUserCode(targetCode);
      setLineNumber(targetCode.split("\n").length);
      setIsModalOpen(false);
    } catch (err) {
      setIsModalOpen(false);

      console.log(err);
    }
  }

  function updateUserCode(ev) {
    if (editorMode === "code") {
      setUserCode(ev.target.value);

      return;
    }
  }

  useEffect(() => {
    setBoilerPlateCode(id, version);
  }, [id, version]);

  useEffect(() => {
    compileToJs();

    return;
  }, [userCode]);

  useEffect(() => {
    lineNumberRef.current.innerHTML = Array(lineNumber)
      .fill("<span></span>")
      .join("");
  }, [lineNumber]);

  return (
    <>
      {isModalOpen && (
        <Modal>
          <Loading
            className="package-install-loading"
            text="Installing the requested library,\nplease wait a moment!"
          />
        </Modal>
      )}
      <EditorContainer className="editor">
        <ButtonWrapper className="button-wrapper">
          <Button
            className="code-mode"
            handleClick={() => {
              setEditorMode("code");
            }}
          >
            code
          </Button>
          <Button
            className="package-mode"
            handleClick={() => {
              setEditorMode("package");
            }}
          >
            package
          </Button>
        </ButtonWrapper>
        <EditorInner className="editor-inner">
          <LineNumbers className="line-numbers" ref={lineNumberRef}>
            <span></span>
          </LineNumbers>
          <EditorWrite
            updateUserCode={updateUserCode}
            setLineNumber={setLineNumber}
            value={
              editorMode === "code" ? userCode : JSON.stringify(packageList)
            }
          />
          <EditorView
            userCode={
              editorMode === "code" ? userCode : JSON.stringify(packageList)
            }
          />
        </EditorInner>
      </EditorContainer>
    </>
  );
}

const EditorContainer = styled.section`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const EditorInner = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  margin: 0 10px 10px 10px;

  background-color: #1c1d21;
  color: white;
`;

const LineNumbers = styled.div`
  width: 20px;
  padding: 10px 0 0 10px;

  text-align: right;
  font-size: 1rem;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  white-space: pre-wrap;
  letter-spacing: normal;
  line-height: 20px;

  span {
    counter-increment: lineNumber;
  }

  span::before {
    content: counter(lineNumber);
    display: block;

    color: #506882;
  }
`;

export default MDXEditor;
