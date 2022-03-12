import { Chip, Paper } from "@material-ui/core";
import { BackPreviousPage, SpinLoading } from "components/common";
import ScrollToTop from "components/common/ScrollToTop";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DvrIcon from "@material-ui/icons/Dvr";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeById } from "redux/actions/employee";
import courseAPI from "api/courseAPI";

const InstructorDetail = () => {
  const [instructor, setInstructor] = useState({});
  const history = useHistory();
  const [myCourses, setMyCourses] = useState([]);
  const dispatch = useDispatch();
  const { getEmployeeByIdState } = useSelector((store) => store.employee);
  const [l1, setL2] = useState(true);

  useEffect(() => {
    document.title = "Chi tiết chef | ECook";
    window.scrollTo(0, 0);

    const params = new URLSearchParams(window.location.search);
    const instructorId = params.get("id");
    if (!instructorId) {
      return;
    }
    dispatch(getEmployeeById(instructorId));
  }, [dispatch]);

  useEffect(() => {
    const t = getEmployeeByIdState.data || {};
    setInstructor(t);

    //
    setL2(true);
    courseAPI
      .getListCourseByInstructor({
        instructorIdReq: t._id,
        page: 1,
        numOfPerPage: 10,
        orderType: "asc",
        searchText: "",
        orderBy: "unitPrice",
      })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setMyCourses(res.courses);
          setL2(false);
        }
      });
  }, [getEmployeeByIdState]);

  return (
    <div className="instructor-detail-container">
      <BackPreviousPage />
      {(getEmployeeByIdState?.loading || l1) && <SpinLoading />}
      <div className="instructor-detail-container--body">
        <Paper className="instructor-detail-container--body--left">
          <img
            src={
              instructor.imageUrl ||
              "https://res.cloudinary.com/duc/image/upload/v1642704006/avatardefault_ux3ryj.png"
            }
            alt=""
          />
        </Paper>
        <Paper className="instructor-detail-container--body--right">
          <div className="instructor-detail-container--body--right__inner">
            <div>
              <label>Họ và tên: </label>
              <span>{instructor.fullName || "Chưa cập nhật"}</span>
            </div>
            <div>
              <label>Email: </label>
              <span>{instructor.email || "Chưa cập nhật"}</span>
            </div>
            <div>
              <label>Số điện thoại: </label>
              <span>{instructor.phoneNumber || "Chưa cập nhật"}</span>
            </div>
            <div>
              <label>Địa chỉ: </label>
              <span>{instructor.address || "Chưa cập nhật"}</span>
            </div>
            <div>
              <label>Chuyên môn: </label>
              <span>{instructor.expertise || "Chưa cập nhật"}</span>
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
                {myCourses?.length > 0 ? (
                  myCourses?.map((r) => (
                    <Chip
                      key={r._id}
                      onClick={() => history.push(`/course?id=${r._id}`)}
                      label={r.courseName}
                      className="chip-course-detail"
                      variant="outlined"
                      style={{ margin: 6 }}
                    />
                  ))
                ) : (
                  <div style={{ color: "gray" }}>Hiện tại chưa có</div>
                )}
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
