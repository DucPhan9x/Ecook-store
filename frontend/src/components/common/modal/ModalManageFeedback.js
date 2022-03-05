import React from "react";
import { Modal } from "antd";
import CommentsManage from "../CommentsManage";

const ModalManageFeedback = ({ isModalVisible, close, data }) => {
  return (
    <Modal
      className="modal-container"
      title="Danh sách phản hồi"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      <CommentsManage
        data={data.feedbacksList}
        handleReply={(replyList) => {
          // create reply , call API
          console.log(replyList);
        }}
      />
    </Modal>
  );
};

export default ModalManageFeedback;
