import { render, screen, cleanup } from "@testing-library/react";
import { expect, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";

import Preview from "../../components/Preview";

const formatTargetComponent = targetComponent => {
  return <BrowserRouter>{targetComponent}</BrowserRouter>;
};

beforeEach(() => {
  render(formatTargetComponent(<Preview />));
});

afterEach(() => {
  cleanup();
});

it("화면에 유저가 입력한 코드를 실시간으로 렌더링 해주는 프리뷰가 렌더링 되어야 합니다.", () => {
  const previewEl = screen.getByRole("generic");

  expect(previewEl).toBeInTheDocument();
});
