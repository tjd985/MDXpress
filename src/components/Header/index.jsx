import { useEffect, useState } from "react";
import styled from "styled-components";

import getBundlePackageCode from "../../services/getBundleCode";
import CONSTANTS from "../../constants/constants";

function Header() {
  const [packageBlob, setPackageBlob] = useState(null);

  useEffect(() => {
    if (!packageBlob) {
      return;
    }

    const packageBlobURL = URL.createObjectURL(packageBlob);
    const packageScriptEl = document.createElement("script");

    packageScriptEl.src = packageBlobURL;
    document.body.append(packageScriptEl);
  }, [packageBlob]);

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (ev.keyCode === CONSTANTS.KEY_ENTER) {
      const requestResult = await getBundlePackageCode(ev.target.value);

      if (requestResult.result === "Error") {
        console.log(requestResult.message);

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
    <CustomedHeader>
      <Title>MDXpress</Title>
      <InputLabel htmlFor="package-name">Package Name</InputLabel>
      <CustomInput
        id="package-name"
        type="text"
        onKeyUp={handleSubmit}
        placeholder="Enter the third-party library you want to use! (ex: lodash)"
      />
    </CustomedHeader>
  );
}

const Title = styled.h1`
  margin: 0 0 20px 0;

  font-size: 2rem;
  font-weight: bold;
  text-align: center;
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
