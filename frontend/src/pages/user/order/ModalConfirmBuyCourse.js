import React from "react";
import { Modal } from "antd";

const ModalOrdersCourse = ({ isModalVisible, close, data }) => {
  return (
    <Modal
      className="modal-container"
      title="Thông tin đơn hàng"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    ></Modal>
  );
};

export default ModalOrdersCourse;
