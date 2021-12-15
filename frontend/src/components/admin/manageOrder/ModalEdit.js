import React, { useEffect } from "react";
import { Modal } from "antd";
import { Form as ReForm } from "reactstrap";
import { PopoverStickOnHover } from "components/common";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import moment from "moment";
import StepComponent from "components/common/StepComponent";
import Map from "components/common/Map";
// import InfoIcon from "@material-ui/icons/Info";
// import { IconButton } from "@material-ui/core";

const ModalEdit = ({ isModalVisible, handleSubmit, close, selectedItem }) => {
  const [form, setForm] = React.useState({
    _id: "",
    customer: {},
    employee: {},
    createdAt: Date.now(),
    address: "",
    voucher: {},
    isPaid: true,
    orderStatus: {},
    paymentMethod: "",
    shipmentFee: "",
    merchandiseSubtotal: "",
    total: "",
    items: [],
  });

  useEffect(() => {
    if (!Object.keys(selectedItem)?.length) return;
    setForm(selectedItem);
  }, [selectedItem]);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    console.log({ form });
    handleSubmit(form);
    close();
  };

  console.log(process.env);

  return (
    <Modal
      className="modal-container-edit-order"
      style={{ width: "600px" }}
      title="Thông tin đơn hàng"
      visible={isModalVisible}
      onOk={handleSubmitForm}
      footer={false}
      onCancel={() => {
        close();
      }}
    >
      <div className="flex">
        <div className="gg-map-order-manage">
          <Map
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
              false
                ? process.env.REACT_APP_API_MAP_KEY
                : "AIzaSyClKcvRulhEqBlzazZFLxrTNr5W_DMCps8"
            }&callback=initMap`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={
              <div
                style={{
                  height: `100%`,
                  margin: `auto`,
                  border: "1px solid gray",
                }}
              />
            }
            imageUrlAvatar={form.customer?.imageUrl}
            zoom={15}
            address={form.address}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
        <div className="modal-detail-order-right">
          <StepComponent />
          <ReForm className="flex flex-col" style={{ padding: "0 12px" }}>
            <div className="block_field-modal-edit-order">
              <label>Mã hàng</label>
              <span>{form?._id}</span>
            </div>
            <div className="block_field-modal-edit-order">
              <label>Khách hàng</label>
              <span style={{ marginRight: 4 }}>
                {form.customer?.name} - {form.customer.phoneNumber}
              </span>
              {/* <PopoverStickOnHover
                component={
                  <div className="popover-show-info-student-container">
                    <div className="popover-show-info-student-container--item">
                      <PhoneAndroidIcon />
                      <span>{form?.customer.phoneNumber}</span>
                    </div>
                    <div className="popover-show-info-student-container--item">
                      <MailOutlineIcon />
                      <span>{form?.customer.email}</span>
                    </div>
                  </div>
                }
                placement="top"
                onMouseEnter={() => {}}
                delay={200}
              >
                <IconButton>
                  <InfoIcon
                    style={{ cursor: "pointer", width: 18, height: 18 }}
                    color="action"
                  />
                </IconButton>
              </PopoverStickOnHover> */}
            </div>
            <div className="block_field-modal-edit-order">
              <label>Nhân viên</label>
              {form?.employee._id ? (
                <PopoverStickOnHover
                  component={
                    <div className="popover-show-info-student-container">
                      <div className="popover-show-info-student-container--item">
                        <span>{form?.employee._id}</span>
                      </div>
                      <div className="popover-show-info-student-container--item">
                        <PhoneAndroidIcon />
                        <span>{form?.employee.phoneNumber}</span>
                      </div>
                      <div className="popover-show-info-student-container--item">
                        <MailOutlineIcon />
                        <span>{form?.employee.email}</span>
                      </div>
                    </div>
                  }
                  placement="top"
                  onMouseEnter={() => {}}
                  delay={200}
                >
                  <span>{form?.employee.name}</span>
                </PopoverStickOnHover>
              ) : (
                <span>Chưa có</span>
              )}
            </div>
            <div
              className="block_field-modal-edit-order flex flex-col"
              style={{ alignItems: "flex-start" }}
            >
              <label>Danh sách mặt hàng</label>
              <div
                className="flex flex-col"
                style={{ alignItems: "flex-start" }}
              >
                {form.items.map((item, index) => (
                  <div className="flex items-center">
                    <span>
                      {index + 1}. &nbsp; {item.foodName} ({item.quantity}
                      {item.unitType})
                    </span>
                    <span>
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      {item.quantity * item.unitPrice} VND
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="block_field-modal-edit-order">
              <label style={{ whiteSpace: "nowrap" }}>Địa chỉ giao hàng</label>
              <span>{form?.address}</span>
            </div>
            <div className="block_field-modal-edit-order">
              <label>Ngày lập đơn</label>
              <span>{moment(form?.createdAt).format("DD/MM/YYYY")}</span>
            </div>
            <div className="block_field-modal-edit-order">
              <label>Phí ship</label>
              <span>{form?.shipmentFee} VND</span>
            </div>
            <div className="block_field-modal-edit-order">
              <label>
                Khuyến mãi áp dụng voucher{" "}
                <span style={{ color: "black" }}>{form?.voucher?.name}</span>
              </label>
              <span
                style={{
                  background: "#de1596",
                  color: "white",
                  borderRadius: "12px",
                  padding: "5px",
                  width: "fit-content",
                }}
              >
                {form.voucher?.discount} VND
              </span>
            </div>
            <div className="block_field-modal-edit-order">
              <label>Tổng tiền</label>
              <span
                style={{
                  padding: "5px",
                  color: "white",
                  borderRadius: "5px",
                  background: "#579de4",
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {form.total} VND
              </span>
            </div>
          </ReForm>
        </div>
      </div>
    </Modal>
  );
};

export default ModalEdit;
