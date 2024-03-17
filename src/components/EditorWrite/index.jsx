import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import saveCurrentCode from "../../services/saveCurrentCode";

import CONSTANTS from "../../constants/constants";

const { KEYBOARD_STATUS, KEY_CMD, KEY_S } = CONSTANTS;

function EditorWrite({ handleChange, value }) {
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
      const currentCode = ev.target.value;

      const requestResult = await saveCurrentCode(currentCode, id);

      if (requestResult.result === "Error") {
        return;
      }

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
    <CustomEditorWrite
      className="editor-write"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyDown}
      value={value}
    />
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
