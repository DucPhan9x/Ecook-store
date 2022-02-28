import { Checkbox } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getPriceItem, getPriceItemNumber } from "utils/priceUtils";
import ModalConfirm from "components/common/ModalConfirm";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "antd";
import FoodCartEmpty from "assets/images/empty-cart.svg";
import ModalConfirmCourseCart from "./ModalConfirmCourseCart";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllCartItem, deleteCartItem } from "redux/actions/cart";

const CoursesCart = ({ close }) => {
  const [data, setData] = useState([]);
  const [isOpenModalConfirmRemoveAll, setIsOpenModalConfirmRemoveAll] =
    useState(false);
  const [isOpenModalConfirmOrder, setIsOpenModalConfirmOrder] = useState(false);
  const dispatch = useDispatch();

  const { getListCartItemState } = useSelector((store) => store.cart);
  useEffect(() => {
    setData(getListCartItemState?.cartItems);
  }, [getListCartItemState]);

  const [isCheckAll, setIsCheckAll] = useState(false);
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
              setData(
                data?.map((item) => ({ ...item, isCheckbox: isChecked }))
              );
            }}
          />
          <span className="selected--text">
            {data?.filter((item) => item.isCheckbox)?.length || 0} được chọn
          </span>{" "}
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
                    <iframe
                      src={
                        c?.item?.videoList?.length > 0 &&
                        c?.item?.videoList[0].videoUrl
                      }
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Embedded youtube"
                    />
                    <div className="food-cart-container__inner--information-top">
                      <span className="food-cart-container__inner--information-top--title">
                        {c.item?.courseName} ({c?.item?.videoList?.length} bài)
                      </span>
                      <span className="food-cart-container__inner--information-top--description">
                        {c.item?.description}
                      </span>
                      <span
                        className="food-cart-container__inner--information-top--price"
                        style={{ marginTop: "-12px", marginBottom: 12 }}
                      >
                        {getPriceItem(
                          c.item?.discountOff,
                          c.item?.unitPrice,
                          c.item?.discountMaximum
                        )}
                      </span>
                    </div>
                    <Tooltip title="Xóa khỏi giỏ hàng" placement="top">
                      <IconButton
                        style={{ marginLeft: "auto" }}
                        onClick={() => dispatch(deleteCartItem([c._id]))}
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Tooltip>
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
              isOpenModal={isOpenModalConfirmRemoveAll}
              close={() => {
                setIsOpenModalConfirmRemoveAll(false);
              }}
              title="Xác nhận"
              message="Bạn có chắc muốn xóa tất cả?"
              handleOk={() => {
                dispatch(deleteAllCartItem(2));
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
      <ModalConfirmCourseCart
        isModalVisible={isOpenModalConfirmOrder}
        close={() => setIsOpenModalConfirmOrder(false)}
        products={data?.filter((item) => item.isCheckbox)}
        closeCartModal={close}
      />
    </>
  );
};

export default CoursesCart;
