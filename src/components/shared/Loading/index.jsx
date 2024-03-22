import styled, { keyframes } from "styled-components";

import Description from "../Description";

function Loading({ className, text }) {
  return (
    <Wrapper className={className}>
      <DotWrapper className="dot-wrapper">
        <Dot />
        <Dot />
        <Dot />
      </DotWrapper>
      <Description className="loading-description" text={text} />
    </Wrapper>
  );
}

const slideAnimation = keyframes`
  0%,
  100% {
    opacity: 0;
    transform: scale(0.5);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
`;

const Wrapper = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .dot-wrapper > span:nth-child(1) {
    animation-delay: 0s;
    background-color: crimson;
  }

  .dot-wrapper > span:nth-child(2) {
    animation-delay: 0.2s;
    background-color: dodgerblue;
  }

  .dot-wrapper > span:nth-child(3) {
    animation-delay: 0.4s;
    background-color: royalblue;
  }

  .loading-description {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 2rem;
  }
`;

const DotWrapper = styled.div`
  margin-bottom: 30px;

  text-align: center;
`;

const Dot = styled.span`
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 10px;

  background-color: grey;
  animation: ${slideAnimation} 1s linear infinite;
`;

export default Loading;
