import React, { ReactNode, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

import CONSTANT from "../../../constants/constants.ts";

interface ToastType {
  setToast: React.Dispatch<
    React.SetStateAction<{
      status: boolean;
      message: string;
    }>
  >;
  toastMessage: string;
}

function Toast({ setToast, toastMessage }: ToastType): ReactNode {
  useEffect(() => {
    const toastTimer = setTimeout(() => {
      setToast({
        status: false,
        message: "",
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
  height: 60px;
  border-radius: 10px;
  z-index: 2;

  font-size: 1.5rem;
  color: #fff;
  background-color: #cd5c5c;
  text-align: center;
  animation: ${fadeInUp} 1s ease-in-out;
`;

Toast.propTypes = {
  setToast: PropTypes.func.isRequired,
  toastMessage: PropTypes.string.isRequired,
};

export default Toast;
