import styled from "styled-components";
import { nanoid } from "nanoid";

import ErrorBoundary from "../shared/ErrorBoundary";
import ErrorFallback from "../shared/ErrorFallback";

function Preview({ previewComponent }) {
  return (
    <Container id="preview">
      <ErrorBoundary key={nanoid(10)} FallbackComponent={ErrorFallback}>
        {previewComponent}
      </ErrorBoundary>
    </Container>
  );
}

const Container = styled.section`
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 50%;
  height: calc(100% - 35px);
  border: 1px solid #000000;
  padding: 10px;
  margin: 35px 10px 0 10px;
  border: 1px solid grey;
  border-radius: 3%;
  overflow: auto;

  background-color: #000000;
  color: #ffffff;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Preview;
