import { BackPreviousPage } from "components/common";
import Comments from "components/common/Comments";
import React, { useState } from "react";
import { useEffect } from "react";
import ECookIcon from "assets/images/logoECook.png";
import { uuid } from "utils/stringUtils";
import useNotification from "hooks/useNotification";
import FeedbackIcon from "@material-ui/icons/Feedback";
import { Rating } from "@material-ui/lab";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

const MyCourseDetail = () => {
  const [formFeedback, setFormFeedback] = useState({ rating: 0, comment: "" });
  const [data, setData] = useState({});
  const [videoCurrent, setVideoCurrent] = useState({});
  const history = useHistory();

  useEffect(() => {
    setData({
      _id: "course_123",
      name: "Món Á cơ bản",
      numOfStars: 4,
      unitPrice: 650000,
      discountOff: 10,
      discountMaximum: 100000,
      description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
      examinationContent: "Bò hầm tiêu xanh",
      regulation:
        "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
      criteria: "An toan ve sinh thuc pham, trang tri dep mat",
      videoUrls: [
        {
          title: "Nghêu hấp thái",
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
        {
          title: "Sườn xào chua ngọt",
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
        {
          title: "Đuôi  bò hầm tiêu xanh",
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
        {
          title: "Cá lốc chiên xù xoài xanh",
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
        {
          title: "Tôm hấp hành",
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
        {
          title: "Lẫu gà lá giang",
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
        {
          title: "Lòng xào nghệ",
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
        {
          title: "Giò heo hầm đu đủ",
          videoUrl:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
        {
          title: "Phở bò",
          videoUrl: "https://www.youtube.com/embed/c9GfHgMk1ac",
          duration: 30, // unit : min
          createAt: Date.now(),
        },
      ],
      instructor: {
        _id: "instructor_123",
        fullName: "Duc Trong",
        phoneNumber: "0984763232",
        address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
        imageUrl: "https://picsum.photos/200/300",
        email: "trongduc@gmail.com",
      },
      amountStudent: 12,
      createAt: Date.now(),
      feedbacksList: [
        {
          _id: uuid(),
          itemId: uuid(), // recipe id
          user: {
            userId: "user_1", // user feedback
            fullName: "Phan Trong Duc",
            imageUrl:
              "https://res.cloudinary.com/duc/image/upload/v1629482114/avatar_o86nuc.jpg",
          },
          numOfStars: 4,
          content: "Cong thuc hay qua",
          createdAt: Date.now(),
          feedbackType: 1, // 1: recipe, 2: food, 3:course
          reply: [
            // Reply cua he thong, phan hoi lai khach hang
            {
              _id: uuid(),
              feedbackId: uuid(),
              user: {
                _id: uuid(),
                imageUrl: ECookIcon,
              },
              content: "Cam on ban da phan hoi",
            },
          ],
        },
      ],
    });
    setVideoCurrent({
      title: "Nghêu hấp thái",
      videoUrl:
        "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      duration: 30, // unit : min
      createAt: Date.now(),
      autoPlay: false,
    });
  }, []);

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
              data={data.feedbacksList}
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
                <span style={{ fontSize: 18 }}>Bài {indx + 1}. </span>
                <span
                  style={{ color: "orangered", fontSize: 19, marginLeft: 12 }}
                >
                  {v.title}
                </span>
              </div>
              <div style={{ marginLeft: 32 }} className="center">
                <IconButton
                  className="icon-show-video"
                  onClick={() => setVideoCurrent({ ...v, autoPlay: true })}
                >
                  <PlayCircleFilledIcon
                    color="action"
                    style={{ fontSize: 36 }}
                  />
                </IconButton>
                <span>{v.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default MyCourseDetail;
