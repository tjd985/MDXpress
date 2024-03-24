import { render, screen, cleanup } from "@testing-library/react";
import { expect, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";

import Header from "../../components/Header";

const formatTargetComponent = targetComponent => {
  return <BrowserRouter>{targetComponent}</BrowserRouter>;
};
beforeEach(() => {
  render(formatTargetComponent(<Header />));
});

afterEach(() => {
  cleanup();
});

describe("Header Component Test", () => {
  it("서비스 로고가 렌더링 되어야 합니다.", () => {
    const logoImageEl = screen.getByRole("img");

    expect(logoImageEl).toBeInTheDocument();
  });

  it("사용자가 설치할 패키지를 입력할 input창이 존재해야 합니다.", () => {
    const packageInputEl = screen.getByRole("textbox");

    expect(packageInputEl).toBeInTheDocument();
  });
});
