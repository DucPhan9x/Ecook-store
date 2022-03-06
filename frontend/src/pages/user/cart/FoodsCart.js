import { Checkbox, IconButton, Tooltip } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getPriceItem, getPriceItemNumber } from "utils/priceUtils";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import RemoveCircleSharpIcon from "@material-ui/icons/RemoveCircleSharp";
import ModalConfirm from "components/common/ModalConfirm";
import FoodCartEmpty from "assets/images/empty-cart.svg";
import ModalConfirmFoodCart from "./ModalConfirmFoodCart";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  deleteAllCartItem,
  deleteCartItem,
  updateCartItem,
} from "redux/actions/cart";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EmptyFood from "assets/images/emptyFood.jpg";

const FoodsCart = ({ close }) => {
  const [data, setData] = useState([]);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [isOpenModalConfirmRemoveAll, setIsOpenModalConfirmRemoveAll] =
    useState(false);
  const dispatch = useDispatch();

  const { getListCartItemState } = useSelector((store) => store.cart);
  useEffect(() => {
    setData(getListCartItemState?.cartItems);
  }, [getListCartItemState]);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [itemSelected, setItemSelected] = useState({});

  const [isOpenModalConfirmOrder, setIsOpenModalConfirmOrder] = useState(false);

  return (
    <>
      <div className="modal-body-cart-container__inner-body-top">
        <div className="block__check-all">
          <Checkbox
            disabled={!data?.length}
            checked={isCheckAll}
            onChange={(e) => {
              let isChecked = e.target.checked;
              setIsCheckAll(isChecked);
              setData(data.map((item) => ({ ...item, isCheckbox: isChecked })));
            }}
          />
          <span className="selected--text">
            {data?.filter((item) => item.isCheckbox)?.length || 0} được chọn
          </span>
          {data?.filter((item) => item.isCheckbox)?.length > 0 && (
            <Tooltip title="Xóa khỏi giỏ hàng" placement="top">
              <IconButton
                style={{ marginLeft: "auto" }}
                onClick={() =>
                  dispatch(
                    deleteCartItem(
                      data?.filter((item) => item.isCheckbox)?.map((i) => i._id)
                    )
                  )
                }
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <button
          disabled={!data?.length}
          className={`btn btn-client ${!data?.length ? "btn-disabled" : ""}`}
          onClick={() => {
            setIsOpenModalConfirmRemoveAll(true);
          }}
        >
          Xóa hết
        </button>
      </div>
      <div className="modal-body-cart-container__inner-body">
        <div className="modal-body-cart-container__inner-body-bottom">
          <div className="food-cart-container">
            {data?.length > 0 ? (
              data?.map((c) => (
                <div className="food-cart-container__inner" key={c._id}>
                  <Checkbox
                    disabled={c.item.isRemoveTemp}
                    checked={c.isCheckbox}
                    onChange={(e) => {
                      let temp = [...data];
                      const indexSelected = temp.findIndex(
                        (item) => item._id === c._id
                      );
                      temp[indexSelected].isCheckbox = e.target.checked;
                      setData(temp);
                    }}
                  />
                  <div className="food-cart-container__inner--information">
                    <img
                      src={!c.item.isRemoveTemp ? c.item?.imageUrl : EmptyFood}
                      alt=""
                    />
                    <div className="food-cart-container__inner--information-top">
                      <span className="food-cart-container__inner--information-top--title">
                        {c.item?.name} (1
                        {c.item?.unit})
                      </span>
                      <span className="food-cart-container__inner--information-top--description">
                        {c.item?.description}
                      </span>
                      <span className="food-cart-container__inner--information-top--price">
                        {getPriceItem(
                          c.item?.discountOff,
                          c.item?.unitPrice,
                          c.item?.discountMaximum,
                          c.quantity
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="food-cart-container__inner--action">
                    <RemoveCircleSharpIcon
                      onClick={() => {
                        if (c.item.isRemoveTemp) return;

                        let temp = [...data];
                        const indexSelected = temp.findIndex(
                          (item) => item._id === c._id
                        );
                        setItemSelected(c);
                        if (temp[indexSelected].quantity === 1) {
                          setIsOpenModalConfirm(true);
                          temp[indexSelected].quantity--;
                        } else {
                          temp[indexSelected].quantity--;
                          dispatch(
                            updateCartItem(
                              temp.map((item) => ({
                                id: item._id,
                                quantity: item.quantity,
                              }))
                            )
                          );
                        }
                      }}
                    />
                    <span className="quantity--text">{c.quantity}</span>
                    <AddCircleSharpIcon
                      onClick={() => {
                        if (c.item.isRemoveTemp) return;
                        let temp = [...data];
                        const indexSelected = temp.findIndex(
                          (item) => item._id === c._id
                        );
                        temp[indexSelected].quantity++;
                        setData(temp);
                        // update database
                        dispatch(
                          updateCartItem(
                            temp.map((item) => ({
                              id: item._id,
                              quantity: item.quantity,
                            }))
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div
                className="flex items-center flex-col"
                style={{ marginTop: 120 }}
              >
                <span style={{ fontSize: 24, color: "gray" }}>
                  Giỏ hàng trống
                </span>
                <img src={FoodCartEmpty} alt="" />
              </div>
            )}
            <ModalConfirm
              isOpenModal={isOpenModalConfirm}
              close={() => {
                setIsOpenModalConfirm(false);
                let temp = [...data];
                const indexSelected = temp.findIndex(
                  (item) => item._id === itemSelected._id
                );
                temp[indexSelected].quantity++;
                setData(temp);
              }}
              title="Xác nhận"
              message="Bạn có chắc muốn xóa?"
              handleOk={() => {
                const idRemoved = itemSelected._id;
                dispatch(deleteCartItem([idRemoved]));
                setIsOpenModalConfirm(false);
              }}
            />
            <ModalConfirm
              isOpenModal={isOpenModalConfirmRemoveAll}
              close={() => {
                setIsOpenModalConfirmRemoveAll(false);
              }}
              title="Xác nhận"
              message="Bạn có chắc muốn xóa tất cả?"
              handleOk={() => {
                dispatch(deleteAllCartItem(1));
                setIsOpenModalConfirmRemoveAll(false);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={`modal-body-cart-container__inner-bottom ${
          data?.filter((item) => item.isCheckbox)?.length ? "" : "btn-disabled"
        }`}
        onClick={() => {
          setIsOpenModalConfirmOrder(true);
        }}
      >
        {(
          data
            ?.filter((item) => item.isCheckbox)
            .reduce(
              (f, s) =>
                f +
                getPriceItemNumber(
                  s.item?.discountOff,
                  s.item?.unitPrice,
                  s.item?.discountMaximum,
                  s.quantity
                ),
              0
            ) || 0
        )?.toLocaleString("vi-VI", {
          style: "currency",
          currency: "VND",
        })}{" "}
        - Thanh toán
      </div>
      {isOpenModalConfirmOrder && (
        <ModalConfirmFoodCart
          isModalVisible={true}
          close={() => setIsOpenModalConfirmOrder(false)}
          products={data?.filter((item) => item.isCheckbox)}
          closeCartModal={close}
        />
      )}
    </>
  );
};

export default FoodsCart;
