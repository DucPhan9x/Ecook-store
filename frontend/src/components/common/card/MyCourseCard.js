import React from "react";
import { useHistory } from "react-router-dom";

const MyCourseCard = ({ data }) => {
  const { _id, courseName, videoList, description } = data;
  const history = useHistory();
  return (
    <div className="course-card" style={{ height: "100%" }}>
      <div className="course-card__inner">
        <iframe
          id={_id}
          src={videoList?.length > 0 && videoList[0]?.videoUrl}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
        <div className="course-card__inner--information">
          <div
            className="block-title-price"
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/my-course?id=${_id}`);
            }}
          >
            <span className="f-title">{courseName}</span>
            <div className="flex items-center" style={{ color: "gray" }}>
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
