import React from "react";
import { useHistory } from "react-router-dom";

const MyCourseCard = ({ data }) => {
  const { _id, name, videoUrls, description } = data;
  const history = useHistory();
  return (
    <div className="course-card">
      <div className="course-card__inner">
        <video
          id={_id}
          src={videoUrls?.length > 0 && videoUrls[0]?.videoUrl}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
          onClick={() => {
            history.push(`/my-course?id=${_id}`);
          }}
        />
        <div className="course-card__inner--information">
          <div className="block-title-price">
            <span className="f-title">{name}</span>
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
