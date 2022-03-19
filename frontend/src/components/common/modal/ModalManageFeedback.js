import React from "react";
import { Modal } from "antd";
import CommentsManage from "../CommentsManage";
import { useDispatch } from "react-redux";
import { reply } from "redux/actions/feedbackReply";

const ModalManageFeedback = ({ isModalVisible, close, data }) => {
  const { feedbacks } = data;
  const dispatch = useDispatch();
  return (
    <Modal
      className="modal-container"
      title="Danh sách phản hồi"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      {feedbacks?.length > 0 ? (
        <CommentsManage
          data={feedbacks}
          handleReply={(replyList) => {
            // create reply , call API
            dispatch(reply(replyList));
          }}
        />
      ) : (
        <div className="center" style={{ fontSize: 18, color: "gray" }}>
          Chưa có đánh giá nào từ khách hàng!
        </div>
      )}
    </Modal>
  );
};

export default ModalManageFeedback;
