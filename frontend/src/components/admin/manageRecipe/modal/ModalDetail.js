import React, { useEffect } from "react";
import { Modal } from "antd";
import { Form as ReForm } from "reactstrap";

const ModalDetail = ({ isModalVisible, close, data }) => {
  const [form, setForm] = React.useState({
    title: "",
    contents: "",
    feedbacks: 0,
    imageUrl: "",
    createAt: Date.now(),
  });

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <Modal
      className="modal-container"
      title="Thông tin chi tiết công thức"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      <ReForm>
        <div className="block-label-input-modal">
          <img
            style={{ width: "100%", maxHeight: 200 }}
            src={form.imageUrl}
            alt="image_product"
          />
        </div>
        <div className="block-label-input-modal">
          <label style={{ color: "rgb(88, 53, 18)" }}>Tên công thức: </label>
          <span className="value-content">{form.title}</span>
        </div>
        <div className="block-label-input-modal">
          <label style={{ color: "rgb(88, 53, 18)" }}>
            Nội dung công thức:{" "}
          </label>
          <span className="value-content">{form.contents}</span>
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalDetail;
