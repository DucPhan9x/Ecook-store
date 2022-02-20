import React, { useEffect } from "react";
import { Modal } from "antd";
import { Form as ReForm } from "reactstrap";
import { formatCurrency } from "utils/priceUtils";
import { getFoodType } from "utils/convertUtils";
import NoImage from "assets/images/notImage.png";

const ModalDetail = ({ isModalVisible, close, data }) => {
  const [form, setForm] = React.useState({
    name: "",
    type: "",
    typeId: 1,
    unitPrice: 0,
    description: "",
    discountOff: 0,
    discountMaximum: 0,
    imageUrl: "",
    numOfStars: 0,
    numOfFeedbacks: 0,
    unit: "",
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
      <ReForm className="flex">
        <div className="block-label-input-modal">
          <img
            style={{ width: "100%", maxHeight: 200, borderRadius: "6px" }}
            src={form?.imageUrl ? form.imageUrl : NoImage}
            alt="image_product"
          />
        </div>
        <div style={{ marginLeft: 48 }}>
          <div className="flex flex-col full-width j-space-between body-content-form">
            <div
              className="block-label-input-modal"
              style={{ marginRight: 12 }}
            >
              <label>Tên sản phẩm: </label>
              <span className="value-content">{form.name}</span>
            </div>
            <div className="block-label-input-modal">
              <label>Loại sản phẩm: </label>
              <span className="value-content">{getFoodType(form.typeId)}</span>
            </div>
          </div>
          <div className="flex full-width j-space-between body-content-form">
            <div className="block-label-input-modal">
              <label>Giá cả (VNĐ): </label>
              <span className="value-content">
                {formatCurrency(form.unitPrice)} {"  "}(1 {form.unit})
              </span>
            </div>
          </div>
          <div className="flex full-width j-space-between body-content-form">
            <div className="block-label-input-modal">
              <label>Giảm giá (%): </label>
              <span className="value-content">{form.discountOff || 0}</span>
            </div>
          </div>
          <div className="flex full-width j-space-between body-content-form">
            <div className="block-label-input-modal">
              <label>Mức giảm tối đa (VNĐ): </label>
              <span className="value-content">
                {formatCurrency(form.discountMaximum) || 0}
              </span>
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
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalDetail;
