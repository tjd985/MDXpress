import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import Completion from "../shared/Completion";

import usePackageStore from "../../store/packageList";

import saveCurrentCode from "../../services/saveCurrentCode";
import CONSTANTS from "../../constants/constants";
import completeImage from "../../../assets/complete.jpeg";

const { KEYBOARD_STATUS, KEY_CMD, KEY_S } = CONSTANTS;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

function EditorWrite({ handleChange, setLineNumber, value }) {
  const [modalStatus, setModaStatus] = useState({
    isModalOpen: false,
    isSaved: false,
  });
  const packageList = usePackageStore(state => state.packageList);

  const currentURL = `${CLIENT_URL}${useLocation().pathname}`;
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleKeyDown(ev) {
    if (ev.type === "keydown") {
      KEYBOARD_STATUS[ev.keyCode] = true;
    }

    if (ev.type === "keyup") {
      KEYBOARD_STATUS[ev.keyCode] = false;

      setLineNumber(ev.target.value.split("\n").length);
    }

    if (KEYBOARD_STATUS[KEY_CMD] && KEYBOARD_STATUS[KEY_S]) {
      ev.preventDefault();

      setModaStatus({
        isModalOpen: true,
        isSaved: false,
      });

      const currentCode = ev.target.value;
      const requestResult = await saveCurrentCode(currentCode, id, packageList);

      if (requestResult.result === "Error") {
        setModaStatus({
          isModalOpen: true,
          isSaved: false,
        });

        return;
      }

      setModaStatus({
        isModalOpen: true,
        isSaved: true,
      });

      KEYBOARD_STATUS[KEY_CMD] = false;
      KEYBOARD_STATUS[KEY_S] = false;

      const { latestVersion, temporaryUser } = requestResult.content;
      const { _id: temporaryUserId } = temporaryUser;
      const { version, code } = latestVersion;

      navigate(`/id/${temporaryUserId}/version/${version}`, {
        state: {
          code,
        },
      });
    }
  }

  return (
    <>
      {modalStatus.isModalOpen && (
        <Modal>
          {modalStatus.isSaved ? (
            <Completion
              title="The save is complete!"
              description="Try sharing the link with your colleagues!"
              imageSrc={completeImage}
              handleClick={() => {
                setModaStatus({
                  isModalOpen: false,
                  isSaved: false,
                });
              }}
              linkURL={currentURL}
            />
          ) : (
            <Loading text="Saving your current code.\n Please wait a moment..." />
          )}
        </Modal>
      )}
      <CustomEditorWrite
        className="editor-write"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyDown}
        value={value}
      />
    </>
  );
}

const CustomEditorWrite = styled.textarea`
  position: absolute;
  top: 0;
  left: 20px;

  box-sizing: border-box;
  flex-grow: 1;
  width: calc(100% - 20px);
  height: 100%;
  padding: 10px;
  border: none;

  color: transparent;
  background-color: transparent;
  font-size: 1rem;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  white-space: pre;
  letter-spacing: normal;
  line-height: 20px;
  caret-color: orange;
  overflow: auto;

  &:focus {
    outline: none;
  }
`;

export default EditorWrite;
