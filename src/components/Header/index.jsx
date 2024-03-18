import { useEffect, useState } from "react";
import styled from "styled-components";

import Modal from "../shared/Modal";
import Loading from "../shared/Loading";

import getBundlePackageCode from "../../services/getBundleCode";
import CONSTANTS from "../../constants/constants";

import MDXpressLogo from "../../../assets/MDXpress-logo.png";

function Header() {
  const [packageBlob, setPackageBlob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!packageBlob) {
      return;
    }

    const packageBlobURL = URL.createObjectURL(packageBlob);
    const packageScriptEl = document.createElement("script");

    packageScriptEl.src = packageBlobURL;
    document.body.append(packageScriptEl);

    setIsModalOpen(false);
  }, [packageBlob]);

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (ev.keyCode === CONSTANTS.KEY_ENTER) {
      setIsModalOpen(true);

      const requestResult = await getBundlePackageCode(ev.target.value);

      if (requestResult.result === "Error") {
        console.log(requestResult.message);

        setIsModalOpen(false);

        return;
      }

      const bundlePackageCode = requestResult.content;

      setPackageBlob(
        new Blob([bundlePackageCode], {
          type: "application/javascript",
        }),
      );

      ev.target.value = "";

      return;
    }
  }

  return (
    <>
      {isModalOpen && (
        <Modal>
          <Loading text="Installing the requested library,\nplease wait a moment!" />
        </Modal>
      )}
      <CustomedHeader>
        <LogoImage src={MDXpressLogo} />
        <InputLabel htmlFor="package-name">Package Name</InputLabel>
        <CustomInput
          id="package-name"
          type="text"
          onKeyUp={handleSubmit}
          placeholder="Enter the third-party library you want to use! (ex: lodash)"
        />
      </CustomedHeader>
    </>
  );
}

const LogoImage = styled.img`
  width: 100px;
  margin: 0 0 20px 0;
`;

const InputLabel = styled.label`
  margin-bottom: 10px;

  font-size: 1.2rem;
  font-weight: bold;
`;

const CustomInput = styled.input`
  width: 350px;
  height: 30px;

  font-size: 0.8rem;
  text-indent: 5px;
`;

const CustomedHeader = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px 20px 10px 20px;
`;

export default Header;
