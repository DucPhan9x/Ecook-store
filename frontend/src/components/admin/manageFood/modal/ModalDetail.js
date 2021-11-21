import React, { useEffect } from "react";
import { Modal } from "antd";
import { Form as ReForm } from "reactstrap";

const ModalDetail = ({ isModalVisible, close, data }) => {
  const [form, setForm] = React.useState({
    name: "",
    type: "",
    unitPrice: 0,
    description: "",
    discountOff: 0,
    discountMaximum: 0,
    imageUrl: "",
    numOfStars: 0,
    numOfFeedbacks: 0,
  });

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <Modal
      className="modal-container"
      title="Thông tin chi tiết sản phẩm"
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
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal" style={{ marginRight: 12 }}>
            <label>Tên sản phẩm: </label>
            <span className="value-content">{form.name}</span>
          </div>
          <div className="block-label-input-modal" style={{ marginLeft: 12 }}>
            <label>Loại sản phẩm: </label>
            <span className="value-content">{form.type}</span>
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal" style={{ marginRight: 12 }}>
            <label>Giá cả (VNĐ): </label>
            <span className="value-content">{form.unitPrice}</span>
          </div>
          <div className="block-label-input-modal" style={{ marginLeft: 12 }}>
            <label>Giảm giá (%): </label>
            <span className="value-content">{form.discountOff || 0}</span>
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal">
            <label>Mức giảm tối đa (VNĐ): </label>
            <span className="value-content">{form.discountMaximum || 0}</span>
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal">
            <label>Mô tả sản phẩm: </label>
            <span className="value-content">
              {form.description || "Chưa có"}
            </span>
          </div>
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalDetail;
