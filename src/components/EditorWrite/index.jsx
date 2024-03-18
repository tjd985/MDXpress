import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import Completion from "../shared/Completion";

import saveCurrentCode from "../../services/saveCurrentCode";
import CONSTANTS from "../../constants/constants";

import completeImage from "../../../assets/complete.jpeg";

const { KEYBOARD_STATUS, KEY_CMD, KEY_S } = CONSTANTS;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

function EditorWrite({ handleChange, value }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const currentURL = `${CLIENT_URL}${useLocation().pathname}`;

  const { id } = useParams();
  const navigate = useNavigate();

  async function handleKeyDown(ev) {
    if (ev.type === "keydown") {
      KEYBOARD_STATUS[ev.keyCode] = true;
    }

    if (ev.type === "keyup") {
      KEYBOARD_STATUS[ev.keyCode] = false;
    }

    if (KEYBOARD_STATUS[KEY_CMD] && KEYBOARD_STATUS[KEY_S]) {
      ev.preventDefault();

      setIsModalOpen(true);

      const currentCode = ev.target.value;
      const requestResult = await saveCurrentCode(currentCode, id);

      if (requestResult.result === "Error") {
        setIsModalOpen(false);

        return;
      }

      setIsSaved(true);

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
      {isModalOpen && (
        <Modal>
          {isSaved ? (
            <Completion
              title="The save is complete!"
              description="Try sharing the link with your colleagues!"
              imageSrc={completeImage}
              handleClick={() => {
                setIsSaved(false);
                setIsModalOpen(false);
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

  box-sizing: border-box;
  flex-grow: 1;
  width: 100%;
  height: 70vh;
  padding: 10px;

  color: transparent;
  background-color: transparent;
  font-size: 1rem;
  font-weight: bold;
  font-family: "Courier New", Courier, monospace;
  white-space: pre-wrap;
  letter-spacing: normal;
  line-height: 20px;
  tab-size: 2;
  caret-color: orange;
`;

export default EditorWrite;
