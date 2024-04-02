import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { expect, beforeEach, vi } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

import App from "../../components/App";

import mockServer from "../../mocks/server";

const formatTargetComponent = targetComponent => {
  return <BrowserRouter>{targetComponent}</BrowserRouter>;
};

beforeAll(() => {
  mockServer.listen();
  window.URL.createObjectURL = vi.fn();
});

beforeEach(() => {
  render(formatTargetComponent(<App />));
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterAll(() => {
  cleanup();
  mockServer.close();
});

describe("Header Component Test", () => {
  it("유저가 처음 접속 했을 시 웰컴 모달이 렌더링 되어야 합니다.", () => {
    const ModalTitleEl = screen.getByText("Get started");

    expect(ModalTitleEl).toBeInTheDocument();
  });

  it("화면에 유저가 입력할 수 있는 textArea가 렌더링 되어야 합니다.", async () => {
    const closeButtonEl = screen.getByText("Get started");

    fireEvent.click(closeButtonEl);

    await waitFor(() => {
      const textareaEl = screen.getByText((_, element) => {
        return element.classList.contains("editor-write");
      });

      expect(textareaEl).toBeInTheDocument();
    });
  });

  it("유저가 처음 접속 했을 시 서버로부터 응답받은 보일러 플레이트 코드가 세팅되어야 합니다.", async () => {
    const closeButtonEl = screen.getByText("Get started");

    fireEvent.click(closeButtonEl);

    await waitFor(() => {
      const textareaEl = screen.getByText("boilerPlate code");

      expect(textareaEl).toBeInTheDocument();
    });
  });

  it("유저가 input에 설치할 패키지 이름을 입력하고 엔터를 누르면 패키지가 설치되어야 합니다.", async () => {
    const closeButtonEl = screen.getByText("Get started");

    fireEvent.click(closeButtonEl);

    const packageInputEl = screen.getByPlaceholderText(
      "Enter the third-party library you want to use! (ex: lodash)",
    );

    fireEvent.change(packageInputEl, { target: { value: "lodash" } });
    fireEvent.keyUp(packageInputEl, { key: "Enter" });

    const packageButton = screen.getByText("package");

    fireEvent.click(packageButton);

    await waitFor(() => {
      const textareaEl = screen.getByText('{"lodash":"1.0"}');

      expect(textareaEl).toBeInTheDocument();
    });
  });

  it("유저가 코드를 작성하고 command + s를 누르면 저장되었다는 모달이 렌더링 되어야 합니다.", async () => {
    const closeButtonEl = screen.getByText("Get started");

    fireEvent.click(closeButtonEl);

    await waitFor(() => {
      const textareaEl = screen.getByText("boilerPlate code");

      fireEvent.focus(textareaEl);
      fireEvent.keyDown(textareaEl, { key: "Meta" });
      fireEvent.keyDown(textareaEl, { key: "s" });
    });

    await waitFor(() => {
      const completeModalEl = screen.getByText("The save is complete!");

      expect(completeModalEl).toBeInTheDocument();
    });
  });

  it("유저가 특정 공유받은 링크를 통해서 접속 할 시 해당 버전의 코드와 패키지가 보일러 플레이트로 셋팅 되어야 합니다.", async () => {
    render(
      <MemoryRouter initialEntries={["id/someId/version/someVersion"]}>
        <App />
      </MemoryRouter>,
    );

    const textareaEl = screen.getByText(
      /Installing the requested library,*please wait a moment!/,
    );

    expect(textareaEl).toBeInTheDocument();

    const packageButton = screen.getByText("package");

    fireEvent.click(packageButton);

    await waitFor(() => {
      const textareaEl = screen.getByText('{"lodash":"1.0"}');

      expect(textareaEl).toBeInTheDocument();
    });
  });
});
