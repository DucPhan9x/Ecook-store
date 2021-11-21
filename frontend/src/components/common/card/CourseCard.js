import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import { IconButton, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import YoutubeEmbed from "../YoutubeEmbed";

const CourseCard = ({ data }) => {
  const { _id, name, price, videoUrl } = data;
  return (
    <div className="course-card">
      <div className="course-card__inner">
        <YoutubeEmbed id={_id} videoUrl={videoUrl} />

        <div className="course-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{name}</span>
            <span className="f-price">{price} đ</span>
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
