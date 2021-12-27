import { Paper } from "@material-ui/core";
import { BackPreviousPage } from "components/common";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useEffect, useState } from "react";
import { INSTRUCTORS_DATA } from "utils/dummyData";

const InstructorDetail = () => {
  const [instructor, setInstructor] = useState({});
  const [rate, setRate] = useState(0);
  useEffect(() => {
    document.title = "Chi tiết chef | ECook";

    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const instructorId = params.get("id");
    if (!instructorId) {
      return;
    }
    console.log({ instructorId });
    let t =
      INSTRUCTORS_DATA.find((item) => item._id === instructorId) ||
      INSTRUCTORS_DATA.find((item) => item._id === "instructor_123");
    if (t) {
      setInstructor(t);
      setRate(t.feedbacks);
    }
  }, []);

  console.log({ instructor });
  console.log({ rate });
  return (
    <div className="instructor-detail-container">
      <BackPreviousPage />

      <div className="instructor-detail-container--body">
        <Paper className="instructor-detail-container--body--left">
          <img src={instructor.imageUrl} alt="" />
        </Paper>
        <Paper className="instructor-detail-container--body--right">
          <div className="instructor-detail-container--body--right__inner">
            <div>
              <label>Họ và tên: </label>
              <span>{instructor.fullName}</span>
            </div>
            <div>
              <label>Email: </label>
              <span>{instructor.email}</span>
            </div>
            <div>
              <label>Số điện thoại: </label>
              <span>{instructor.phoneNumber}</span>
            </div>
            <div>
              <label>Địa chỉ: </label>
              <span>{instructor.address}</span>
            </div>
            <div>
              <label>Được đánh giá: </label>
              <span>{instructor.feedbacks}</span>
            </div>
            <div>
              <label>Chuyên môn: </label>
              <span>{instructor.expertise}</span>
            </div>
            <div>
              <span> Với các khóa học có trên hệ thống như: </span>
              <div></div>
            </div>
          </div>
        </Paper>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default InstructorDetail;
