import { useState, useEffect } from "react";
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
      setIsModalOpen(false);
    } catch (err) {
      setIsModalOpen(false);

      console.log(err);
    }
  }

  useEffect(() => {
    setBoilerPlateCode(id, version);
  }, [id, version]);

  useEffect(() => {
    compileToJs();

    return;
  }, [userCode]);

  function updateUserCode(ev) {
    if (editorMode === "code") {
      setUserCode(ev.target.value);

      return;
    }
  }

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
          <EditorWrite
            handleChange={updateUserCode}
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const EditorContainer = styled.section`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
`;

const EditorInner = styled.div`
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0 10px 10px 10px;

  background-color: #1c1d21;
  color: white;
`;

export default MDXEditor;
