import styled from "styled-components";

function EditorWrite({ handleChange, value }) {
  return (
    <CustomEditorWrite
      className="editor-write"
      onChange={handleChange}
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
