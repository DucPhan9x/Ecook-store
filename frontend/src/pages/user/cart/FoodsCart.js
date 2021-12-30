import { Checkbox } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FOODS_CART } from "utils/dummyData";
import { getPriceItem, getPriceItemNumber } from "utils/priceUtils";
import AddCircleSharpIcon from "@material-ui/icons/AddCircleSharp";
import RemoveCircleSharpIcon from "@material-ui/icons/RemoveCircleSharp";
import ModalConfirm from "components/common/ModalConfirm";
import FoodCartEmpty from "assets/images/empty-cart.svg";

const FoodsCart = ({ close }) => {
  const [data, setData] = useState([]);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);
  const [isOpenModalConfirmRemoveAll, setIsOpenModalConfirmRemoveAll] =
    useState(false);

  useEffect(() => {
    setData(FOODS_CART.map((item) => ({ ...item, isCheckbox: false })));
    // eslint-disable-next-line
  }, []);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [itemSelected, setItemSelected] = useState({});
  const handleRemoveSingleItem = (id) => {
    let temp = [...data];
    setData(temp.filter((item) => item._id !== id));
  };
  return (
    <>
      <div className="modal-body-cart-container__inner-body-top">
        <div className="block__check-all">
          <Checkbox
            disabled={!data.length}
            checked={isCheckAll}
            onChange={(e) => {
              let isChecked = e.target.checked;
              setIsCheckAll(isChecked);
              setData(data.map((item) => ({ ...item, isCheckbox: isChecked })));
            }}
          />
          <span className="selected--text">
            {data?.filter((item) => item.isCheckbox)?.length} được chọn
          </span>
        </div>
        <button
          disabled={!data.length}
          className={`btn btn-client ${!data.length ? "btn-disabled" : ""}`}
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
            {data.length > 0 ? (
              data.map((c) => (
                <div className="food-cart-container__inner" key={c._id}>
                  <Checkbox
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
                    <img src={c.food?.imageUrl} alt="" />
                    <div className="food-cart-container__inner--information-top">
                      <span className="food-cart-container__inner--information-top--title">
                        {c.food?.name} ({c.food?.quantity}
                        {c.food?.unit})
                      </span>
                      <span className="food-cart-container__inner--information-top--description">
                        {c.food?.description}
                      </span>
                      <span className="food-cart-container__inner--information-top--price">
                        {getPriceItem(
                          c.food?.discountOff,
                          c.food?.unitPrice,
                          c.food?.discountMaximum,
                          c.quantity
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="food-cart-container__inner--action">
                    <RemoveCircleSharpIcon
                      onClick={() => {
                        let temp = [...data];
                        const indexSelected = temp.findIndex(
                          (item) => item._id === c._id
                        );
                        setItemSelected(c);
                        if (temp[indexSelected].quantity === 1) {
                          setIsOpenModalConfirm(true);
                          temp[indexSelected].quantity--;
                          setData(temp);
                        } else {
                          temp[indexSelected].quantity--;
                          setData(temp);
                        }
                      }}
                    />
                    <span className="quantity--text">{c.quantity}</span>
                    <AddCircleSharpIcon
                      onClick={() => {
                        let temp = [...data];
                        const indexSelected = temp.findIndex(
                          (item) => item._id === c._id
                        );
                        temp[indexSelected].quantity++;
                        setData(temp);
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
                handleRemoveSingleItem(itemSelected?._id);
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
                setData([]);
                setIsOpenModalConfirmRemoveAll(false);
              }}
            />
          </div>
        </div>
      </div>
      <div className="modal-body-cart-container__inner-bottom" onClick={close}>
        {data
          .reduce(
            (f, s) =>
              f +
              getPriceItemNumber(
                s.food?.discountOff,
                s.food?.unitPrice,
                s.food?.discountMaximum,
                s.quantity
              ),
            0
          )
          ?.toLocaleString("vi-VI", {
            style: "currency",
            currency: "VND",
          })}{" "}
        - Thanh toán
      </div>
    </>
  );
};

export default FoodsCart;
