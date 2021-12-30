import React, { useState } from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import { IconButton, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "utils/authUtils";
import ModalConfirm from "../ModalConfirm";
import useNotification from "hooks/useNotification";

const CourseCard = ({ data }) => {
  const { _id, name, unitPrice, videoUrls, discountOff, discountMaximum } =
    data;
  const history = useHistory();
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  return (
    <div className="course-card">
      <div className="course-card__inner">
        <video
          id={_id}
          src={videoUrls[0].videoUrl}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          onClick={() => {
            history.push(`/course?id=${_id}`);
          }}
        />
        <div className="course-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{name}</span>
            <div className="flex items-center">
              <span className={discountOff !== 0 ? "f-price" : "f-new-price"}>
                {formatCurrency(unitPrice)}
              </span>
              {discountOff !== 0 && (
                <span className="f-new-price">
                  {getPriceItem(discountOff, unitPrice, discountMaximum)}
                </span>
              )}
            </div>
          </div>
          <div className="block-action-food">
            <IconButton
              aria-label="add to favorites"
              onClick={() => {
                if (getAccessToken()) {
                  // call API add cart
                  useNotification.Success({
                    title: "",
                    message: "Đã thêm vào bộ sưu tập",
                  });
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            >
              <FavoriteIcon color="secondary" />
            </IconButton>
            <div>
              <Tooltip title="Mua ngay" placement="top">
                <IconButton
                  onClick={() => {
                    if (getAccessToken()) {
                      // call API add cart
                    } else {
                      setIsOpenModalConfirm(true);
                    }
                  }}
                >
                  <PaymentIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Thêm vào giỏ hàng" placement="top">
                <IconButton
                  onClick={() => {
                    if (getAccessToken()) {
                      // call API add cart
                      useNotification.Success({
                        title: "",
                        message: "Đã thêm vào giỏ hàng",
                      });
                    } else {
                      setIsOpenModalConfirm(true);
                    }
                  }}
                >
                  <ShoppingBasketIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm
        title="Thông báo"
        message="Bạn cần đăng nhập để tiếp tục, bạn muốn tiếp tục ?"
        isOpenModal={isOpenModalConfirm}
        close={() => setIsOpenModalConfirm(false)}
        handleOk={() => {
          history.push("/login");
        }}
      />
    </div>
  );
};

export default CourseCard;
