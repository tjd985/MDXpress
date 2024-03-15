import styled from "styled-components";

function ErrorFallback({ error }) {
  return (
    <ErrorMessage className="ErrorMessage">
      <h1>Error</h1>
      <code>{error.message}</code>
    </ErrorMessage>
  );
}

const ErrorMessage = styled.div`
  width: 100%;
  height: 70vh;

  white-space: pre-wrap;
`;

export default ErrorFallback;
