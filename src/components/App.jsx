import styled from "styled-components";
import { Reset } from "styled-reset";

import Editor from "./Editor";
import Preview from "./Preview";

function App() {
  return (
    <Container>
      <Reset />
      <Editor />
      <Preview />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export default App;
