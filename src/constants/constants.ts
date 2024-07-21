interface KEYBOARD_STATUS_TYPE {
  [key: string]: boolean;
}

const CONSTANTS = {
  KEY_CMD: "Meta",
  KEY_S: "s",
  KEY_ENTER: "Enter",
  KEY_TAB: "Tab",
  KEYBOARD_STATUS: {
    Meta: false,
    s: false,
  } as KEYBOARD_STATUS_TYPE,
  TOAST_TIME: 3000,
  WELCOME_MESSAGE:
    "1. Writing MDX on the left editor will render it in real time on the right!\\n" +
    "2.Use cmd + s to save your current code, and share it with your friends through a link!\\n" +
    "3. If there's a third-party library you'd like to use, you can install and use it!",
  MOCK_REQUEST_PACKAGE_URL: "/package/:package",
  MOCK_REQUEST_BOILERPLATE_URL: "/id/:id/version/:version",
  MOCK_REQUEST_SAVE_URL: "/id/:id",
};

export default CONSTANTS;
