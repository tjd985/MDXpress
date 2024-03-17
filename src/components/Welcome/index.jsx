import styled from "styled-components";

import Description from "../shared/Description";

function Welcome({ setModalStatus }) {
  return (
    <Wrapper>
      <Title>
        Welcome to <em>MDXpress</em> ✨
      </Title>
      <Description
        className="welcome-descripton"
        text="1. Writing MDX on the left editor will render it in real time on the right!\n
2. Use cmd + s to save your current code, and share it with your friends through a link!\n
3. If there's a third-party library you'd like to use, you can install and use it!"
      />
      <CloseButton
        onClick={() => {
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
`;

const Title = styled.h1`
  margin-bottom: 30px;
`;

const CloseButton = styled.button`
  min-width: 300px;
  min-height: 50px;
  padding: 12px 24px;
  border: 2px solid #000000;
  border-radius: 4px;
  margin-top: 50px;

  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

export default Welcome;
