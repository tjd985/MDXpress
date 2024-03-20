import { useState } from "react";
import styled from "styled-components";

import Editor from "../Editor";
import Preview from "../Preview";
import Modal from "../shared/Modal";
import Welcome from "../Welcome";

function Home() {
  const [previewComponent, setPreviewComponent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <>
      {isModalOpen && (
        <Modal>
          <Welcome setModalStatus={setIsModalOpen} />
        </Modal>
      )}
      <Wrapper>
        <Editor className="editor" setPreview={setPreviewComponent} />
        <Preview className="preview" previewComponent={previewComponent} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export default Home;
