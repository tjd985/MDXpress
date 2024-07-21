import { SetStateAction, Dispatch, KeyboardEvent, ChangeEvent } from "react";

interface EditorWriteType {
  updateUserCode: (
    ev: KeyboardEvent<HTMLTextAreaElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  setLineNumber: Dispatch<SetStateAction<number>>;
  userCode: string;
  currentMode: "code" | "package";
}

export default EditorWriteType;
