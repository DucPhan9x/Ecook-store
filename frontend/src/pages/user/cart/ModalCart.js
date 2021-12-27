import React from "react";
import { Modal } from "antd";

const ModalCart = ({ isModalVisible, close, data }) => {
  return (
    <Modal
      className="modal-container"
      title="Giỏ hàng"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    ></Modal>
  );
};

export default ModalCart;
