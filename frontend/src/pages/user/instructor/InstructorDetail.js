import { Chip, Paper } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { BackPreviousPage } from "components/common";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { INSTRUCTORS_DATA } from "utils/dummyData";
import DvrIcon from "@material-ui/icons/Dvr";

const InstructorDetail = () => {
  const [instructor, setInstructor] = useState({});
  const [rate, setRate] = useState(0);
  const history = useHistory();

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
              <span>
                <Rating value={rate} readOnly />
              </span>
            </div>
            <div>
              <label>Chuyên môn: </label>
              <span>{instructor.expertise}</span>
            </div>
            <div
              style={{
                marginTop: 15,
                paddingTop: 10,
                borderTop: "1px solid rgb(254, 219, 58, 0.8)",
              }}
            >
              <span className="courses__detail-of__instructor">
                <DvrIcon color="secondary" /> Với các khóa học có trên hệ thống
                như:
              </span>
              <div
                style={{
                  marginTop: 8,
                }}
              >
                {instructor.courses?.map((r) => (
                  <Chip
                    key={r._id}
                    onClick={() => history.push(`/course?id=course_123`)}
                    label={r.name}
                    className="chip-course-detail"
                    variant="outlined"
                  />
                ))}
              </div>
            </div>
          </div>
        </Paper>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default InstructorDetail;
