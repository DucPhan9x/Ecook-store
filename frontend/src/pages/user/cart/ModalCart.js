import React from "react";
import { Modal } from "antd";
import { useState } from "react";
import FoodsCart from "./FoodsCart";
import CoursesCart from "./CoursesCart";

const ModalCart = ({ isModalVisible, close }) => {
  const [cartType, setCartType] = useState("food");
  return (
    <Modal
      className="modal-container modal-cart"
      title="Giỏ hàng"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      <div className="modal-body-cart-container">
        <div className="modal-body-cart-container__inner">
          <div className="modal-body-cart-container__inner-top">
            <span
              className={`item-food ${
                cartType === "food" ? "item-active" : ""
              }`}
              onClick={() => setCartType("food")}
            >
              Thực phẩm
            </span>
            <span className="item-or"> hay </span>
            <span
              className={`item-course ${
                cartType === "course" ? "item-active" : ""
              }`}
              onClick={() => setCartType("course")}
            >
              Khóa học
            </span>
          </div>
          {cartType === "food" ? (
            <FoodsCart close={close} />
          ) : (
            <CoursesCart close={close} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalCart;
