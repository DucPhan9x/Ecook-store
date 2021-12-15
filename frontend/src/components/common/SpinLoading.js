import React from "react";
import styled from "styled-components";
import BurgerLoaderIcon from "assets/gif/loadingFood.gif";

const SpinLoading = () => {
  return (
    <>
      <SpinLoadingContainer className="spin_loading_container align__center">
        <div className="modal__inner">
          <img style={{ width: "350px" }} src={BurgerLoaderIcon} alt="" />
        </div>
      </SpinLoadingContainer>
    </>
  );
};

const SpinLoadingContainer = styled.div`
  width: 100%;
  height: 100%;

  position: fixed;
  top: -25%;
  left: 0;
  z-index: 9999;

  background: #00000003 0% 0% no-repeat padding-box;
  opacity: 1;
  backdrop-filter: blur(1px);
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
  }
`;

export default SpinLoading;
