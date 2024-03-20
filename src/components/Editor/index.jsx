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

import getVersionCode from "../../services/getVersionCode";

import usePackageStore from "../../store/packageList";

function MDXEditor({ setPreview }) {
  const [userCode, setUserCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, version } = useParams();
  const setPackage = usePackageStore(state => state.setPackage);
  const packageList = usePackageStore(state => state.packageList);

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
    setUserCode(ev.target.value);
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
        <EditorInner className="editor-inner">
          <EditorWrite handleChange={updateUserCode} value={userCode} />
          <EditorView userCode={userCode} />
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
