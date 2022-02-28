import React, { useEffect } from "react";
import { Modal } from "antd";
import { useState } from "react";
import FoodsCart from "./FoodsCart";
import CoursesCart from "./CoursesCart";
import { useDispatch, useSelector } from "react-redux";
import { getListCartItem } from "redux/actions/cart";
import { SpinLoading } from "components/common";

const ModalCart = ({ isModalVisible, close }) => {
  const [cartType, setCartType] = useState("food");
  const dispatch = useDispatch();
  const {
    getListCartItemState,
    updateCartItemState,
    deleteCartItemState,
    deleteAllCartItemState,
  } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(getListCartItem(cartType === "food" ? 1 : 2));
  }, [dispatch, cartType]);

  return (
    <Modal
      className="modal-container modal-cart"
      title="Giỏ hàng"
      visible={isModalVisible}
      onCancel={close}
      footer={false}
    >
      <div className="modal-body-cart-container">
        {(getListCartItemState?.loading ||
          updateCartItemState?.loading ||
          deleteCartItemState?.loading ||
          deleteAllCartItemState?.loading) && <SpinLoading />}
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
