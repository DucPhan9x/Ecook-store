import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PaymentIcon from "@material-ui/icons/Payment";
import { IconButton, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import { useHistory } from "react-router-dom";

const CourseCard = ({ data }) => {
  const { _id, name, unitPrice, videoUrls, discountOff, discountMaximum } =
    data;
  const history = useHistory();

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
          onClick={() => history.push(`/course?id=${_id}`)}
        />
        <div className="course-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{name}</span>
            <div className="flex items-center">
              <span className="f-price">{formatCurrency(unitPrice)}</span>
              <span className="f-new-price">
                {formatCurrency(
                  getPriceItem(discountOff, unitPrice, discountMaximum)
                )}
              </span>
            </div>
          </div>
          <div className="block-action-food">
            <IconButton aria-label="add to favorites">
              <FavoriteIcon color="secondary" />
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
