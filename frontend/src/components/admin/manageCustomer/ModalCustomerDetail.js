import React, { useEffect } from "react";
import { Modal } from "antd";
import { Form as ReForm } from "reactstrap";
import moment from "moment";

const ModalCustomerDetail = ({ isModalVisible, close, data }) => {
  const [form, setForm] = React.useState({
    address: "TT.La Hai - H.Dong Xuan - T. Phu Yen",
    dateOfBirth: Date.now(),
    email: "trongduc@gmail.com",
    fullName: "Phan Trong Duc",
    imageUrl:
      "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
    phoneNumber: "09873678265",
    _id: "e082540a-94f3",
  });

  useEffect(() => {
    setForm(data);
  }, [data]);

  return (
    <Modal
      className="modal-container"
      title="Thông tin khách hàng"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      <ReForm className="flex">
        <div className="block-label-input-modal">
          <img
            style={{ width: "100%", maxHeight: 200 }}
            src={form.imageUrl}
            alt="image_product"
          />
        </div>
        <div style={{ marginLeft: 48 }}>
          <div className="flex flex-col full-width j-space-between body-content-form">
            <div
              className="block-label-input-modal"
              style={{ marginRight: 12 }}
            >
              <label>Họ & Tên: </label>
              <span className="value-content">{form.fullName}</span>
            </div>
            <div
              className="block-label-input-modal"
              style={{ margin: "12px 0" }}
            >
              <label>Ngày sinh: </label>
              <span className="value-content">
                {moment(form.dateOfBirth).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="block-label-input-modal">
              <label>Email: </label>
              <span className="value-content">{form.email}</span>
            </div>
            <div
              className="block-label-input-modal flex"
              style={{ margin: "12px 0" }}
            >
              <label>Điện thoại: </label>
              <span className="value-content">{form.phoneNumber}</span>
            </div>
          </div>
          <div className="flex full-width j-space-between body-content-form">
            <div className="block-label-input-modal">
              <label>Địa chỉ: </label>
              <span className="value-content">{form.address}</span>
            </div>
          </div>
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalCustomerDetail;
