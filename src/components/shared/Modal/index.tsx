import { ReactNode } from "react";
import styled from "styled-components";

interface ModalType {
  children: ReactNode;
}

function Modal({ children }: ModalType): ReactNode {
  return (
    <>
      <ModalBackground className="modal-background" />
      <ModalContainer className="modal-container">{children}</ModalContainer>
    </>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);

  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: 64px;
  border: 2px solid #000000;
  border-radius: 8px;

  background-color: #ffffff;
`;

export default Modal;
