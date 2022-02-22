import { BackPreviousPage } from "components/common";
import Comments from "components/common/Comments";
import React, { useState } from "react";
import { useEffect } from "react";
import useNotification from "hooks/useNotification";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { Rating } from "@material-ui/lab";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import FormControl from "@material-ui/core/FormControl";
import { Modal } from "antd";
import moment from "moment";
import { COURSES_DATA } from "utils/dummyData";

const MyCourseDetail = () => {
  const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });
  const [data, setData] = useState({});
  const [videoCurrent, setVideoCurrent] = useState({});
  const history = useHistory();
  const [openModalCertification, setOpenModalCertification] = useState(false);
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    setData(COURSES_DATA.find((item) => item._id === params.get("id")));
    setVideoCurrent({
      title: "Nghêu hấp thái",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: 30, // unit : min
      createAt: Date.now(),
      autoPlay: false,
    });
    // eslint-disable-next-line
  }, []);

  console.log(videoCurrent);

  return (
    <>
      <BackPreviousPage />
      <div className="my-course-detail-container">
        <div className="my-course-detail-container-left">
          <div className="my-course-detail-container-left__video-detail">
            {videoCurrent?.videoUrl?.includes("/www.youtube.com") ? (
              <iframe
                src={videoCurrent?.videoUrl}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                controls
                title="Embedded youtube"
              />
            ) : (
              <video
                src={videoCurrent?.videoUrl}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                controls
                title="Embedded youtube"
                autoPlay={videoCurrent?.autoPlay}
              />
            )}
            <div className="center">
              {data?.isPass ? (
                <button
                  className="btn btn-client btn--access-exam"
                  onClick={() => setOpenModalCertification(true)}
                >
                  Xem chứng nhận
                </button>
              ) : (
                <button
                  className="btn btn-client btn--access-exam"
                  onClick={() =>
                    history.push(`examination?courseId=${data?._id}`)
                  }
                >
                  Thi cuối khóa
                </button>
              )}
            </div>
          </div>
          <div>
            <div className="flex items-center" style={{ marginBottom: 12 }}>
              <span
                style={{
                  marginRight: 36,
                  color: "orangered",
                  fontWeight: "bold",
                }}
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
              data={data?.feedbacksList}
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
          </div>
        </div>
        <div className="my-course-detail-container-right">
          {data?.videoUrls?.map((v, indx) => (
            <div
              className={`my-course-detail-container-right--item flex items-center j-space-between ${
                videoCurrent?.title === v.title ? "active" : ""
              }`}
              key={indx}
            >
              <div className="my-course-detail-container-right--item-info">
                <span style={{ fontSize: 18, whiteSpace: "nowrap" }}>
                  Bài {indx + 1}.{" "}
                </span>
                <span
                  style={{
                    color: "orangered",
                    fontSize: 19,
                    marginLeft: 12,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    maxWidth: 210,
                  }}
                >
                  {v.title}
                </span>
              </div>
              <div
                style={{
                  marginLeft: 32,
                }}
                className="center"
              >
                <IconButton
                  className="icon-show-video"
                  onClick={() => setVideoCurrent({ ...v, autoPlay: true })}
                >
                  <PlayCircleFilledIcon
                    color="action"
                    style={{ fontSize: 36 }}
                  />
                </IconButton>
                <span style={{ whiteSpace: "nowrap" }}>{v.duration} min</span>
              </div>
            </div>
          ))}
        </div>
        <Modal
          className="certification-form-container"
          title="Chứng nhận nấu ăn"
          footer={false}
          visible={openModalCertification}
          onOk={() => setOpenModalCertification(false)}
          onCancel={() => {
            setOpenModalCertification(false);
          }}
        >
          <div className="certification-form">
            <div className="certification-form--title flex flex-col items-center">
              <span>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</span>
              <span>Độc lập - Tự do - Hạnh phúc</span>
            </div>
            <div className="certification-form-people-sent flex flex-col items-center">
              <span>Hệ thống đào tạo hướng dẫn nấu ăn</span>
              <span>ECook</span>
            </div>
            <div className="chung-chi-title">GIẤY CHỨNG NHẬN</div>
            <div className="certification-form--body">
              <div
                className="add-edit-recipe-container-bottom--left"
                style={{ width: "25%", height: 180, border: "1px dashed gray" }}
              >
                <img
                  src={data?.certification?.student?.imageUrl}
                  alt="avatar"
                />
              </div>
              <div className="certification-form--body-main">
                <div className="block-input-info-student-course">
                  <label>Học viên:</label>
                  <FormControl>
                    <span>{data?.certification?.student?.fullName}</span>
                  </FormControl>
                </div>
                <div className="block-input-info-student-course">
                  <label>Sinh ngày:</label>
                  <FormControl>
                    <span>
                      {moment(data?.certification?.student?.dayOfBirth).format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                  </FormControl>
                </div>
                <div className="block-input-info-student-course">
                  <label>Đã hoàn thành khóa học:</label>
                  <FormControl>
                    <span>{data?.certification?.course?.courseName}</span>
                  </FormControl>
                </div>
                <div className="block-input-info-student-course">
                  <div className="flex">
                    <label>Từ ngày</label>
                    <FormControl>
                      <span>
                        {moment(data?.certification?.startDate).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </FormControl>
                  </div>
                  <div className="flex">
                    <label style={{ padding: "0 8px" }}>đến ngày</label>
                    <FormControl>
                      <span>
                        {moment(data?.certification?.endDate).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </FormControl>
                  </div>
                </div>
                <div className="block-input-info-student-course">
                  <label>Xếp loại:</label>
                  <FormControl>
                    <span>{data?.certification?.evaluate}</span>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>
          <div
            className="block--signature-certification"
            style={{ marginTop: 48 }}
          >
            <div className="block--signature-certification--title">
              <FormControl>
                <span>{data?.certification?.positionCreate}</span>
              </FormControl>
              <span>,</span>
              <span>ngày</span>
              <FormControl>
                <span>{moment(data?.certification?.createAt).get("date")}</span>
              </FormControl>
              <span>tháng</span>
              <FormControl>
                <span>
                  {moment(data?.certification?.createAt).get("month") + 1}
                </span>
              </FormControl>
              <span>năm</span>
              <FormControl>
                <span>{moment(data?.certification?.createAt).get("year")}</span>
              </FormControl>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default MyCourseDetail;
