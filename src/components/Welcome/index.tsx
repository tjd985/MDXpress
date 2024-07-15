import React, { ReactNode } from "react";
import styled from "styled-components";

import Description from "../shared/Description/index.tsx";
import CloseButton from "../shared/Button/index.tsx";

import CONSTANTS from "../../constants/constants.ts";

interface WelcomeType {
  setModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

function Welcome({ setModalStatus }: WelcomeType): ReactNode {
  return (
    <Wrapper>
      <Title>
        Welcome to <em>MDXpress</em> ✨
      </Title>
      <Description
        className="welcome-descripton"
        text={CONSTANTS.WELCOME_MESSAGE}
      />
      <CloseButton
        className="close-modal"
        handleClick={() => {
          setModalStatus(false);
        }}
      >
        Get started
      </CloseButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .close-modal {
    min-width: 300px;
    min-height: 50px;
    padding: 12px 24px;
    border: 2px solid #000000;
    border-radius: 4px;
    margin-top: 50px;

    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

export default Welcome;
