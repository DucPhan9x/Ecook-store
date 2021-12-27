import { Rating } from "@material-ui/lab";
import { BackPreviousPage } from "components/common";
// import Comments from "components/common/Comments";
// import useNotification from "hooks/useNotification";
import React, { useEffect, useState } from "react";
import { COURSES_DATA } from "utils/dummyData";
import AssignmentIcon from "@material-ui/icons/Assignment";
// import FeedbackIcon from "@material-ui/icons/Feedback";
import ScrollToTop from "components/common/ScrollToTop";
import { formatCurrency, getPriceItem } from "utils/priceUtils";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CourseCard from "components/common/card/CourseCard";
import moment from "moment";
import _ from "lodash";
import FlareIcon from "@material-ui/icons/Flare";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const [rate, setRate] = useState(0);

  const history = useHistory();
  useEffect(() => {
    document.title = "Chi tiết khóa học | ECook";
    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const courseID = params.get("id") || "course_123";
    if (!courseID) {
      return;
    }
    let t = COURSES_DATA.find((item) => item._id === courseID);
    if (t) {
      setCourse(t);
      setRate(t.numOfStars);
    }
  }, []);

  // const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });

  return (
    <div className="course-detail-container">
      <BackPreviousPage />
      <div className="course-detail-container-top">
        <div className="course-detail-container-top__right">
          <div className="flex flex-col">
            <div className="flex flex-col course-detail-container-top__right--title">
              <h3>{course?.name}</h3>
              <Rating defaultValue={0} value={rate} max={5} readOnly />
              <span className="course-detail-container-top__right--title--description">
                {course.description}
              </span>
            </div>
            <div className="flex flex-col block__information__course">
              <div>
                <label>Tác giả:</label>
                <span style={{ marginRight: 8 }}>
                  {course.instructor?.fullName}
                </span>
                <IconButton
                  onClick={() =>
                    history.push(`instructor?id=${course.instructor?._id}`)
                  }
                >
                  <VisibilityIcon />
                </IconButton>
              </div>
              <div>
                <label>Ngày xuất bản: </label>
                <span>{moment(course.createAt).format("DD/MM/YYYY")}</span>
              </div>
              <div>
                <label>Tổng số video: </label>
                <span>{course?.videoUrls?.length}</span>
              </div>
              <div
                style={{
                  paddingBottom: 6,
                }}
              >
                <label>Tổng thời gian khóa học: </label>
                <span>{_.sum(course?.videoUrls?.map((v) => v.duration))}</span>
              </div>
              <div
                style={{
                  paddingTop: 6,
                  borderTop: "1px solid #f8fd8c",
                }}
              >
                <label
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    paddingTop: 6,
                    color: "red",
                  }}
                >
                  <FlareIcon /> Đặc biệt:{" "}
                </label>
                <span
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Có chứng nhận sau khi học và thi bài thi cuối khóa
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="course-detail-container-top__left">
          <video
            src={course?.videoUrls && course?.videoUrls[0]?.videoUrl}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
          <div className="course-detail-container-top__left--price">
            <LocalAtmIcon />
            <div className="block__disCountOff">
              <span className="real-price">
                {formatCurrency(
                  getPriceItem(
                    course.discountOff,
                    course.unitPrice,
                    course.discountMaximum
                  )
                )}
              </span>
            </div>
            {course?.discountOff !== 0 && (
              <div className="unit-price">
                {formatCurrency(course.unitPrice)}
              </div>
            )}
          </div>
          <div className="course-detail-container-top__left--actions flex flex-col">
            <div className="flex items-center block__like-cart">
              <button className="btn btn--favorite">
                <FavoriteBorderIcon /> Lưu
              </button>
              <button className="btn btn--add-to-cart">
                <ShoppingCartIcon style={{ marginRight: 4 }} />
                Thêm vào giỏ hàng
              </button>
            </div>
            <button className="btn btn--buy-now">Mua ngay</button>
          </div>
        </div>
      </div>
      {/* <div className="course-detail-container-bottom">
        <div className="flex items-center" style={{ marginBottom: 12 }}>
          <span
            style={{ marginRight: 36, color: "orangered", fontWeight: "bold" }}
          >
            <FeedbackIcon color="secondary" style={{ marginRight: 12 }} />
            Đánh giá & Nhận xét
          </span>
          <Rating
            value={formFeedback.rating}
            onChange={(e, value) =>
              setFormFeedback({ ...formFeedback, rating: value })
            }
          />
        </div>
        <Comments
          data={course.feedbacksList}
          formFeedback={formFeedback}
          handleReply={(replyList) => {
            // create reply , call API
            console.log(replyList);
          }}
          handleFeedback={(comment) => {
            // check if stars > 3 => call API send feedback
            if (formFeedback.rating > 2) {
              setFormFeedback({ ...formFeedback, comment });
              console.log({ ...formFeedback, comment });
              // CALL API add feedback for this recipe id
            } else {
              useNotification.Warning({
                title: "Message",
                message: "Bạn không thể bình luận vì đánh giá quá thấp",
              });
            }
          }}
        />
      </div> */}
      <div className="course-detail__related">
        <div className="course-detail__related--title">
          <AssignmentIcon color="secondary" />
          <span>Khóa học liên quan</span>
        </div>
        <div className="course-detail__related--body">
          {COURSES_DATA.map((item) => (
            <CourseCard key={item._id} data={item} />
          ))}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};
export default CourseDetail;
