import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import Modal from "../shared/Modal";
import Loading from "../shared/Loading";
import Completion from "../shared/Completion";

import usePackageStore from "../../store/packageList";
import useScrollStore from "../../store/scroll";

import saveCurrentCode from "../../services/saveCurrentCode";
import CONSTANTS from "../../constants/constants";
import completeImage from "../../../assets/complete.jpeg";

const { KEYBOARD_STATUS, KEY_CMD, KEY_S } = CONSTANTS;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

function EditorWrite({ updateUserCode, setLineNumber, textAreaValue }) {
  const [modalStatus, setModaStatus] = useState({
    isModalOpen: false,
    isSaved: false,
  });
  const [cursor, setCursor] = useState(0);
  const textAreaRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  const packageList = usePackageStore(state => state.packageList);
  const setScroll = useScrollStore(state => state.setScroll);

  const currentURL = `${CLIENT_URL}${useLocation().pathname}`;

  function handleScroll(ev) {
    setScroll({
      left: ev.target.scrollLeft,
      top: ev.target.scrollLeft,
    });
  }

  async function handleKeyPress(ev) {
    if (ev.type === "keydown") {
      KEYBOARD_STATUS[ev.keyCode] = true;

      if (ev.keyCode === CONSTANTS.KEY_TAB) {
        ev.preventDefault();

        const start = ev.target.selectionStart;
        const editedText = `${ev.target.value.slice(0, start)}  ${ev.target.value.slice(start)}`;

        ev.target.value = editedText;

        updateUserCode(ev);
        setCursor(start + 2);

        return;
      }
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

  useEffect(() => {
    textAreaRef.current.setSelectionRange(cursor, cursor);
  }, [cursor]);

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
        ref={textAreaRef}
        onScroll={handleScroll}
        className="editor-write"
        onChange={updateUserCode}
        onKeyDown={handleKeyPress}
        onKeyUp={handleKeyPress}
        value={textAreaValue}
      />
    </>
  );
}

const CustomEditorWrite = styled.textarea`
  position: absolute;
  top: 0;
  left: 30px;

  box-sizing: border-box;
  flex-grow: 1;
  width: calc(100% - 30px);
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
