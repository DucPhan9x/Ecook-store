import { Rating } from "@material-ui/lab";
import { SpinLoading } from "components/common";
// import Comments from "components/common/Comments";
// import useNotification from "hooks/useNotification";
import React, { useEffect, useState } from "react";
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
import { getAccessToken } from "utils/authUtils";
import useNotification from "hooks/useNotification";
import ModalConfirm from "components/common/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById } from "redux/actions/course";
import courseAPI from "api/courseAPI";

const CourseDetail = () => {
  const [course, setCourse] = useState({});
  const [courseRelated, setCourseRelated] = useState([]);
  const [rate, setRate] = useState(0);
  const [l1, setL1] = useState(true);
  const dispatch = useDispatch();
  const { getCourseByIdState } = useSelector((store) => store.course);

  const history = useHistory();
  useEffect(() => {
    document.title = "Chi tiết khóa học | ECook";
    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const courseID = params.get("id") || "course_123";
    if (!courseID) {
      return;
    }
    dispatch(getCourseById(courseID));
  }, [dispatch]);

  useEffect(() => {
    const t = getCourseByIdState.data || {};
    setCourse(t);
    setRate(t?.numOfStars || 0);
  }, [getCourseByIdState]);

  useEffect(() => {
    if (!course.courseName) return;
    setL1(true);
    courseAPI
      .getListCourseRelated(course.courseName)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setCourseRelated(res.courses);
          setL1(false);
        }
      });
  }, [course]);

  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  // const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });

  return (
    <div className="course-detail-container">
      {(getCourseByIdState?.loading || l1) && <SpinLoading />}
      <div className="course-detail-container-top">
        <div className="course-detail-container-top__right">
          <div className="flex flex-col">
            <div className="flex flex-col course-detail-container-top__right--title">
              <h3>{course?.courseName}</h3>
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
                    history.push(`instructor?id=${course.instructorId}`)
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
                <span>{course?.videoList?.length}</span>
              </div>
              <div
                style={{
                  paddingBottom: 6,
                }}
              >
                <label>Tổng thời gian khóa học: </label>
                <span>
                  {_.sum(course?.videoList?.map((v) => Number(v.duration)))} min
                </span>
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
          <iframe
            style={{ height: 200 }}
            src={course?.videoList && course?.videoList[0]?.videoUrl}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
          <div className="course-detail-container-top__left--price">
            <LocalAtmIcon />
            <div className="block__disCountOff">
              <span className="real-price">
                {getPriceItem(
                  course.discountOff,
                  course.unitPrice,
                  course.discountMaximum
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
              <button
                className="btn btn--favorite"
                onClick={() => {
                  if (getAccessToken()) {
                    // call API add cart
                    useNotification.Success({
                      title: "",
                      message: "Đã thêm vào bộ sưu tập",
                    });
                  } else {
                    setIsOpenModalConfirm(true);
                  }
                }}
              >
                <FavoriteBorderIcon />
              </button>
              <button
                className="btn btn--add-to-cart"
                onClick={() => {
                  if (getAccessToken()) {
                    // call API add cart
                    useNotification.Success({
                      title: "",
                      message: "Đã thêm vào giỏ hàng",
                    });
                  } else {
                    setIsOpenModalConfirm(true);
                  }
                }}
              >
                <ShoppingCartIcon style={{ marginRight: 4 }} />
                Thêm vào giỏ hàng
              </button>
            </div>
            <button
              className="btn btn--buy-now"
              onClick={() => {
                if (getAccessToken()) {
                  // call API add cart
                } else {
                  setIsOpenModalConfirm(true);
                }
              }}
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
      {courseRelated?.length > 0 && (
        <div className="course-detail__related">
          <div className="course-detail__related--title">
            <AssignmentIcon color="secondary" />
            <span>Khóa học liên quan</span>
          </div>
          <div className="course-detail__related--body">
            {courseRelated.map((item) => (
              <CourseCard key={item._id} data={item} />
            ))}
          </div>
        </div>
      )}
      <ScrollToTop />
      <ModalConfirm
        title="Thông báo"
        message="Bạn cần đăng nhập để tiếp tục, bạn muốn tiếp tục ?"
        isOpenModal={isOpenModalConfirm}
        close={() => setIsOpenModalConfirm(false)}
        handleOk={() => {
          history.push("/login");
        }}
      />
    </div>
  );
};
export default CourseDetail;
