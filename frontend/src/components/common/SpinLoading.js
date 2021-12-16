import React from "react";
import styled from "styled-components";
import BurgerLoaderIcon from "assets/gif/loadingFood.gif";

const SpinLoading = () => {
  return (
    <>
      <SpinLoadingContainer className="spin_loading_container align__center">
        <div className="modal__inner">
          <div className="temp-container" />
          <img
            style={{ width: "400px", zIndex: 1 }}
            src={BurgerLoaderIcon}
            alt=""
          />
        </div>
      </SpinLoadingContainer>
    </>
  );
};

const SpinLoadingContainer = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  background: #00000003 0% 0% no-repeat padding-box;
  opacity: 1;
  backdrop-filter: blur(2px);
  .modal__inner {
    margin: auto;
    opacity: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .ant-spin-spinning > span {
      font-size: 50px !important;
      font-weight: bold;
    }
    .temp-container {
      width: 80px;
      height: 80px;
      background: white;
      border-radius: 50%;
      z-index: 1;
      position: fixed;
      top: calc(50% - 40px);
      left: calc(50% - 40px);
    }
  }
`;

export default SpinLoading;
