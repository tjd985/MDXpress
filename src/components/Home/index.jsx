import { useState } from "react";
import styled from "styled-components";

import Editor from "../Editor";
import Preview from "../Preview";

function Home() {
  const [previewComponent, setPreviewComponent] = useState("");

  return (
    <Wrapper>
      <Editor className="editor" setPreview={setPreviewComponent} />
      <Preview className="preview" previewComponent={previewComponent} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 70vh;
  padding: 20px;
`;

export default Home;
