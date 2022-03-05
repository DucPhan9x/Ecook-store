import { BackPreviousPage, SpinLoading } from "components/common";
import Comments from "components/common/Comments";
import React, { useState } from "react";
import { useEffect } from "react";
import useNotification from "hooks/useNotification";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { Rating } from "@material-ui/lab";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseById } from "redux/actions/course";
import Certification from "./Certification";

const MyCourseDetail = () => {
  const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });
  const [data, setData] = useState({});
  const [videoCurrent, setVideoCurrent] = useState({});
  const history = useHistory();
  const [openModalCertification, setOpenModalCertification] = useState(false);
  const dispatch = useDispatch();
  const { getCourseByIdState } = useSelector((store) => store.course);
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("id");
  useEffect(() => {
    dispatch(getCourseById(courseId));
  }, [dispatch, courseId]);

  useEffect(() => {
    setData(getCourseByIdState?.data);
    console.log(getCourseByIdState?.data?.videoList);
    if (getCourseByIdState?.data?.videoList?.length > 0) {
      console.log(getCourseByIdState?.data?.videoList[0]);
      setVideoCurrent({
        index: 1,
        video: getCourseByIdState?.data?.videoList[0],
      });
    }
  }, [getCourseByIdState]);
  console.log(videoCurrent);

  return (
    <>
      <BackPreviousPage />
      <div className="my-course-detail-container">
        {getCourseByIdState?.loading && <SpinLoading />}

        <div className="my-course-detail-container-left">
          <div className="my-course-detail-container-left__video-detail">
            {videoCurrent.video?.videoUrl?.includes("/www.youtube.com") ? (
              <iframe
                src={videoCurrent.video?.videoUrl}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                controls
                title="Embedded youtube"
              />
            ) : (
              <video
                src={videoCurrent.video?.videoUrl}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                controls
                title="Embedded youtube"
                autoPlay={videoCurrent.video?.autoPlay}
              />
            )}
            <div className="flex items-center j-space-between">
              <div>
                <div style={{ color: "orangered", fontSize: 19 }}>
                  Bài {videoCurrent.index}. {videoCurrent.video?.title}
                </div>
                <div
                  style={{ color: "gray", fontSize: 15, fontStyle: "italic" }}
                >
                  Tác giả: {data?.instructor?.fullName}
                </div>
              </div>
              <div className="center">
                <button
                  className="btn btn-client btn--access-exam"
                  onClick={() => setOpenModalCertification(true)}
                  style={{ marginRight: 12 }}
                >
                  Xem chứng nhận
                </button>
                <button
                  className="btn btn-client btn--access-exam"
                  onClick={() =>
                    history.push(`examination?courseId=${data?._id}`)
                  }
                >
                  Thi cuối khóa
                </button>
              </div>
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
              data={data?.feedbacks}
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
          {data?.videoList?.map((v, indx) => (
            <div
              className={`my-course-detail-container-right--item flex items-center j-space-between ${
                videoCurrent.video?.title === v.title ? "active" : ""
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
                  onClick={() =>
                    setVideoCurrent({
                      index: indx + 1,
                      video: {
                        ...v,
                        autoPlay: true,
                      },
                    })
                  }
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
        {openModalCertification && (
          <Certification
            close={() => setOpenModalCertification(false)}
            courseId={courseId}
            isOpen={openModalCertification}
          />
        )}
      </div>
    </>
  );
};
export default MyCourseDetail;
