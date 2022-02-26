import React from "react";
import { useHistory } from "react-router-dom";

const InstructorCard = ({ data }) => {
  const { fullName, expertise, imageUrl, _id } = data;
  const history = useHistory();
  return (
    <div
      className="food-card"
      onClick={() => history.push(`/instructor?id=${_id}`)}
    >
      <div className="food-card__inner">
        <img
          src={
            imageUrl ||
            "https://res.cloudinary.com/duc/image/upload/v1642704006/avatardefault_ux3ryj.png"
          }
          alt=""
          className="food-card__inner--picture"
        />

        <div className="food-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{fullName}</span>
            <span style={{ margin: "6px 0", color: "gray" }}>
              Chuyên: {expertise || "Chưa có"}
            </span>
          </div>
          <div className="block-action-food">
            {/* /calculate from list my course => rates */}
            {/* <Rating name="customized-10" defaultValue={feedbacks} max={5} /> */}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
