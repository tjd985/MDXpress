import { useEffect, useState, useRef, UIEvent, KeyboardEvent } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styled from "styled-components";

import Modal from "../shared/Modal/index.tsx";
import Loading from "../shared/Loading/index.tsx";
import Completion from "../shared/Completion/index.tsx";

import usePackageStore from "../../store/packageList.ts";
import useScrollStore from "../../store/scroll.ts";

import EditorWriteType from "../../types/EditorWriteType.ts";

import saveCurrentCode from "../../services/saveCurrentCode.ts";
import CONSTANTS from "../../constants/constants.ts";
import completeImage from "../../../assets/complete.jpeg";

const { KEYBOARD_STATUS, KEY_CMD, KEY_S } = CONSTANTS;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

function EditorWrite({
  updateUserCode,
  setLineNumber,
  userCode,
  currentMode,
}: EditorWriteType) {
  const [modalStatus, setModaStatus] = useState({
    isModalOpen: false,
    isSaved: false,
  });
  const [cursor, setCursor] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const packageList = usePackageStore(state => state.packageList);
  const setScroll = useScrollStore(state => state.setScroll);

  const currentURL = `${CLIENT_URL}${useLocation().pathname}`;

  function handleScroll(ev: UIEvent<HTMLElement>) {
    const targetEl = ev.target as HTMLElement;

    setScroll({
      left: targetEl.scrollLeft,
      top: targetEl.scrollTop,
    });
  }

  async function handleKeyPress(ev: KeyboardEvent<HTMLTextAreaElement>) {
    const textAreaEl = ev.target as HTMLTextAreaElement;

    setLineNumber(textAreaEl.value.split("\n").length);

    if (ev.type === "keyup") {
      KEYBOARD_STATUS[ev.key] = false;

      return;
    }

    KEYBOARD_STATUS[ev.key] = true;

    if (ev.key === "Tab") {
      ev.preventDefault();

      const start = textAreaEl.selectionStart;
      const editedText = `${textAreaEl.value.slice(0, start)}  ${textAreaEl.value.slice(start)}`;

      textAreaEl.value = editedText;

      updateUserCode(ev);
      setCursor(start + 2);

      return;
    }

    if (KEYBOARD_STATUS[KEY_CMD] && KEYBOARD_STATUS[KEY_S]) {
      ev.preventDefault();

      setModaStatus({
        isModalOpen: true,
        isSaved: false,
      });

      const requestResult = await saveCurrentCode(userCode, id!, packageList);

      if (requestResult!.result === "Error") {
        setModaStatus({
          isModalOpen: false,
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

      const { latestVersion, temporaryUser } = requestResult!.content;
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
    textAreaRef.current!.setSelectionRange(cursor, cursor);
  }, [cursor]);

  useEffect(() => {
    setLineNumber(textAreaRef.current!.value.split("\n").length);
  }, [currentMode]);

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
            <Loading
              className="save-loading"
              text="Saving your current code.\n Please wait a moment..."
            />
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
        value={currentMode === "code" ? userCode : JSON.stringify(packageList)}
      />
    </>
  );
}

const CustomEditorWrite = styled.textarea`
  position: absolute;
  top: 0;
  left: 40px;

  box-sizing: border-box;
  flex-grow: 1;
  width: calc(100% - 40px);
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

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default EditorWrite;
