import { Rating } from "@material-ui/lab";
import React from "react";
import { useHistory } from "react-router-dom";

const InstructorCard = ({ data }) => {
  const { fullName, expertise, imageUrl, feedbacks, _id } = data;
  const history = useHistory();
  return (
    <div
      className="food-card"
      onClick={() => history.push(`/instructor?id=${_id}`)}
    >
      <div className="food-card__inner">
        <img src={imageUrl} alt="" className="food-card__inner--picture" />

        <div className="food-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{fullName}</span>
            <span style={{ margin: "6px 0", color: "gray" }}>
              Chuyên: {expertise}
            </span>
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
