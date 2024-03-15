import { useMemo } from "react";
import styled from "styled-components";

import ErrorBoundary from "../shared/ErrorBoundary";
import ErrorFallback from "../shared/ErrorFallback";

function Preview({ previewComponent }) {
  const key = useMemo(() => Math.random().toString(), [previewComponent]);

  return (
    <Container id="preview">
      <ErrorBoundary key={key} FallbackComponent={ErrorFallback}>
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
  flex-grow: 1;
  width: 100%;
  height: 70vh;
  border: 1px solid #000;
  padding: 10px;
  margin: 10px;
`;

export default Preview;
