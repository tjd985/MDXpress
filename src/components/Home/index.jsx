import styled from "styled-components";

import Editor from "../Editor";
import Preview from "../Preview";

function Home() {
  return (
    <Wrapper>
      <Editor />
      <Preview />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 40px;
`;

export default Home;
