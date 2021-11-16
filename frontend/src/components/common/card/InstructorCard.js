import { Rating } from "@material-ui/lab";
import React from "react";

const InstructorCard = ({ data }) => {
  const { name, expertise, imageUrl, feedbacks } = data;
  return (
    <div className="food-card">
      <div className="food-card__inner">
        <img src={imageUrl} alt="" className="food-card__inner--picture" />

        <div className="food-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{name}</span>
            <span className="f-price">Chuyên: {expertise}</span>
          </div>
          <div className="block-action-food">
            <Rating name="customized-10" defaultValue={feedbacks} max={5} />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
