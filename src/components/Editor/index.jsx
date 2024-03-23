import { useState, useEffect, useRef } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { compile, run } from "@mdx-js/mdx";
import styled from "styled-components";
import PropTypes from "prop-types";

import EditorView from "../EditorView";
import EditorWrite from "../EditorWrite";
import ErrorFallback from "../shared/ErrorFallback";
import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import Button from "../shared/Button";
import Toast from "../shared/Toast";

import usePackageStore from "../../store/packageList";

import useLoadPackage from "../../hooks/useLoadPackage";

import getVersionCode from "../../services/getVersionCode";

function MDXEditor({ setPreview }) {
  const { id, version } = useParams();

  const [userCode, setUserCode] = useState("");
  const [editorMode, setEditorMode] = useState("code");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineNumber, setLineNumber] = useState(1);
  const [toast, setToast] = useState({
    status: false,
    message: "",
  });
  const loadPackage = useLoadPackage();

  const lineNumberRef = useRef(null);

  const packageList = usePackageStore(state => state.packageList);

  async function compileToJs() {
    try {
      const compiledCode = await compile(
        editorMode === "code" ? userCode : JSON.stringify(packageList),
        {
          outputFormat: "function-body",
          baseUrl: "/Users/ohseongho/Desktop/MDXpress/node_modules",
        },
      );
      const result = await run(compiledCode.value, jsxRuntime);
      const MDXContent = result.default;

      setPreview(<MDXContent />);
    } catch (error) {
      setPreview(<ErrorFallback error={error} />);
    }
  }

  async function setBoilerPlateCode(id, version) {
    try {
      setIsModalOpen(id !== ":id" || false);

      const requestResult = await getVersionCode(id, version);

      if (requestResult.result === "Error") {
        setToast({ status: true, message: requestResult.message });
        setIsModalOpen(false);

        return;
      }

      const { targetCode, bundleCodeList } = requestResult.content;

      setUserCode(targetCode);
      setLineNumber(targetCode.split("\n").length);

      if (!bundleCodeList.length) {
        setIsModalOpen(false);

        return;
      }

      loadPackage(bundleCodeList);

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
  }, [lineNumber, editorMode]);

  return (
    <>
      {toast.status && (
        <Toast setToast={setToast} toastMessage={toast.message} />
      )}
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
            userCode={userCode}
            currentMode={editorMode}
          />
          <EditorView userCode={userCode} currentMode={editorMode} />
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
  height: 100%;
  overflow: hidden;
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
  height: calc(100% - 35px);
  border-radius: 0 3% 3% 3%;

  background-color: #1c1d21;
  color: #ffffff;
`;

const LineNumbers = styled.div`
  max-height: 100%;
  margin: 10px 0 10px 10px;
  margin-top: 10px;

  text-align: right;
  font-size: 1rem;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  white-space: pre-wrap;
  letter-spacing: normal;
  line-height: 20px;
  overflow-y: auto;

  span {
    display: block;
    width: 20px;

    counter-increment: lineNumber;
  }

  span::before {
    content: counter(lineNumber);
    display: block;
    width: 20px;
    white-space: nowrap;

    color: #506882;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

MDXEditor.propTypes = {
  setPreview: PropTypes.func.isRequired,
};

export default MDXEditor;
