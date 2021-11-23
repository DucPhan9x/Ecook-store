import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import { IconButton, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const CourseCard = ({ data }) => {
  const { _id, name, unitPrice, videoUrls } = data;
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
        />
        <div className="course-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{name}</span>
            <span className="f-price">{unitPrice} đ</span>
          </div>
          <div className="block-action-food">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <div>
              <Tooltip title="Mua ngay" placement="top">
                <IconButton>
                  <PaymentIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Thêm vào giỏ hàng" placement="top">
                <IconButton>
                  <ShoppingBasketIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
