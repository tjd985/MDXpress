import { useEffect } from "react";
import styled, { keyframes } from "styled-components";

import CONSTANT from "../../../constants/constants";

function Toast({ setToast, toastMessage }) {
  useEffect(() => {
    const toastTimer = setTimeout(() => {
      setToast({
        toastStatus: false,
      });
    }, CONSTANT.TOAST_TIME);

    return () => {
      clearTimeout(toastTimer);
    };
  }, []);

  return <ToastPopup>{toastMessage}</ToastPopup>;
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ToastPopup = styled.div`
  position: fixed;
  top: 30px;
  right: 30px;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 150px;
  border-radius: 10px;
  z-index: 2;

  font-size: 1.5rem;
  color: #fff;
  background-color: #696969;
  text-align: center;
  animation: ${fadeInUp} 1s ease-in-out;
`;

export default Toast;
