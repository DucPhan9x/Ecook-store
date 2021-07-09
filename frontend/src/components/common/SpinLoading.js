import React from "react";
import styled from "styled-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const SpinLoading = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <>
      <SpinLoadingContainer className="spin_loading_container align__center">
        <div className="modal__inner">
          <Spin indicator={antIcon} />
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

  background: #00000043 0% 0% no-repeat padding-box;
  opacity: 1;
  backdrop-filter: blur(2px);
  .modal__inner {
    margin: auto;
    opacity: 1;
    .ant-spin-spinning > span {
      font-size: 50px !important;
      font-weight: bold;
    }
  }
`;

export default SpinLoading;
