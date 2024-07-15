import { useState, ReactNode } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Editor from "../Editor/index.tsx";
import Preview from "../Preview/index.tsx";
import Modal from "../shared/Modal/index.tsx";
import Welcome from "../Welcome/index.tsx";

function Home() {
  const { id } = useParams();
  const [previewComponent, setPreviewComponent] = useState<ReactNode>("");
  const [isModalOpen, setIsModalOpen] = useState(id === ":id" || false);

  return (
    <>
      {isModalOpen && (
        <Modal>
          <Welcome setModalStatus={setIsModalOpen} />
        </Modal>
      )}
      <Wrapper>
        <Editor setPreview={setPreviewComponent} />
        <Preview previewComponent={previewComponent} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 80vh;
  padding: 10px;
`;

export default Home;
