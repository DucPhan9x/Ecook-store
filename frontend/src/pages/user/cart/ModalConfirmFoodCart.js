import { Input } from "@material-ui/core";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useEffect } from "react";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import { uuid } from "utils/stringUtils";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

const ModalConfirmFoodCart = ({ isModalVisible, close }) => {
  const [data, setData] = useState({
    customerName: "",
    addressCustomer: "",
    phoneNumber: "",
    email: "",
    total: 0,
    items: [],
    shipmentFee: 0,
    paymentMethod: "",
    voucher: {},
  });

  useEffect(() => {
    setData({
      customerName: "Phan Trong Duc",
      email: "trongduc@gmail.com",
      phoneNumber: "0987675646",
      addressCustomer: "62/07 Đồng Kè - Hòa Khánh Bắc - Liên Chiểu - Đà Nẵng",
      paymentMethod: "Momo",
      shipmentFee: 15000,
      merchandiseSubtotal: 20000, // tien san pham chua tinh ship
      total: 315000, // tong tien bao gom ship fee
      items: [
        {
          _id: "food_123",
          type: "Thịt",
          unit: "kg",
          quantity: 2,
          name: "Sườn Non Heo",
          unitPrice: 120000,
          discountOff: 20, // percent %,
          discountMaximum: 20000, //vnd
          description: "Hàng tươi sống",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
        },
        {
          _id: uuid(),
          type: "Thịt",
          unit: "kg",
          quantity: 1,
          name: "Sườn Non Heo",
          unitPrice: 120000,
          discountOff: 20, // percent %,
          discountMaximum: 20000, //vnd
          description: "Hàng tươi sống",
          imageUrl:
            "https://res.cloudinary.com/duc/image/upload/v1639206902/ecook/suon_heo_ssbldm.jpg",
        },
      ],
    });
  }, []);

  return (
    <Modal
      className="modal-container modal-confirm-food-cart"
      title="Đơn hàng"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      <div className="modal-confirm-food-cart-container">
        <div className="modal-confirm-food-cart-container__inner">
          <div className="modal-confirm-food-cart-container__inner-top">
            <div className="block__order-info">
              <label>Họ tên khách hàng:</label>
              <Input value={data?.customerName} />
            </div>
            <div className="block__order-info">
              <label>Địa chỉ giao hàng:</label>
              <Input value={data?.addressCustomer} />
            </div>
            <div className="block__order-info">
              <label>Số điện thoại:</label>
              <Input value={data?.phoneNumber} />
            </div>
            <div className="block__order-info">
              <label>Email:</label>
              <Input value={data?.email} />
            </div>
          </div>
          <div className="block__items-detail">
            <span>Chi tiết đơn hàng</span>
            <div className="block__items-detail-content">
              {data.items?.map((item) => (
                <div
                  key={item._id}
                  className="block__items-detail-content--item"
                >
                  <img src={item.imageUrl} alt="" />
                  <div className="block-details-item">
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                    <div>
                      {getPriceItem(
                        item.discountOff,
                        item.unitPrice,
                        item.discountMaximum,
                        item.quantity
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="block-data-normal flex items-center">
            <label style={{ marginRight: 12 }}>Tổng sản phẩm: </label>
            <span>{data?.items.length} s/p</span>
          </div>
          <div className="block-data-normal flex items-center">
            <label style={{ marginRight: 12 }}>Phí vận chuyển:</label>
            <span>{formatCurrency(data?.shipmentFee)}</span>
          </div>
          <div className="block-data-normal flex items-center">
            <label style={{ marginRight: 12 }}>Tổng tiền:</label>
            <span>{formatCurrency(data?.total)}</span>
          </div>
          <div className="block-data-normal flex items-center">
            <label style={{ marginRight: 12 }}>Mã khuyến mãi (nếu có):</label>
            <div className="voucher-list-modal">Open Modal</div>
          </div>
        </div>
      </div>
      <div className="block-momo-direct-moneny">
        <button className="btn btn-client btn-momo">Momo</button>
        <button className="btn btn-client btn-money">
          <LocalAtmIcon style={{ fontSize: 26 }} />
          Tiền mặt
        </button>
      </div>
      <div className="btn-order-food">Đặt hàng</div>
    </Modal>
  );
};
export default ModalConfirmFoodCart;
