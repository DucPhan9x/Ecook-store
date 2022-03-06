import { Paper } from "@material-ui/core";
import { BackPreviousPage, FormBox, SpinLoading } from "components/common";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTest,
  getExaminationByCourseId,
  getTestById,
} from "redux/actions/course";

const Examination = () => {
  const [data, setData] = useState({});
  const [videoURL, setVideoURL] = useState("");
  const dispatch = useDispatch();
  const { examinationByCourseId, createTestState } = useSelector(
    (store) => store.course
  );
  const [myTest, setMyTest] = useState({});
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("courseId");
  const [l1, setL1] = useState(false);

  useEffect(() => {
    document.title = "Thi cuối khóa | ECook";
    window.scrollTo(0, 0);

    dispatch(getExaminationByCourseId(courseId));
    setL1(true);
    dispatch(
      getTestById(courseId, (res) => {
        setL1(false);
        if (res.status === 200) {
          setMyTest(res.test);
        }
      })
    );
  }, [dispatch, courseId]);

  console.log(myTest);

  useEffect(() => {
    setData(examinationByCourseId?.data);
  }, [examinationByCourseId]);

  useEffect(() => {
    if (Object.keys(myTest)?.length > 0) {
      setVideoURL(myTest?.videoUrlSubmit);
    }
  }, [myTest]);

  return (
    <div className="examination-container">
      <BackPreviousPage />
      <div className="examination-container-body">
        <Paper className="examination-container-body--left">
          <h2 className="examination-container-body--left--title">
            Nội dung bài thi
          </h2>
          <div className="block__data">
            <label>Đề bài</label>
            <span>- {data?.content}</span>
          </div>
          <div className="block__data">
            <label>Quy định</label>
            <span>- {data?.regulation}</span>
          </div>
          <div className="block__data">
            <label>Tiêu chí chấm điểm</label>
            <span>- {data?.criteria}</span>
          </div>
        </Paper>
        <Paper className="examination-container-body--right">
          {!!!myTest?.videoUrlSubmit ? (
            <div className="flex items-center" style={{ marginBottom: 12 }}>
              <label style={{ marginRight: 5 }}>
                Copy link bài thi vào đây:
              </label>
              <FormBox
                propsInput={{
                  name: "videoUrl",
                  placeholder: "https://...",
                  onChange: (e) => setVideoURL(e.target.value),
                  value: videoURL,
                  disabled: !!myTest?.videoUrlSubmit,
                }}
              />
            </div>
          ) : (
            <div>
              <iframe
                src={myTest?.videoUrlSubmit}
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                controls
                title="Embedded youtube"
              />
              <div
                className="center"
                style={{ color: "orangered", fontWeight: "bold" }}
              >
                Bạn đã hoàn thành bài thi!
              </div>
              <div className="" style={{ marginTop: 20, marginBottom: 6 }}>
                <span
                  className=""
                  style={{ color: "gray", fontSize: 15, marginRight: 4 }}
                >
                  Người đánh giá bài thi:
                </span>
                <span
                  style={{
                    fontStyle: "italic",
                    color: "chocolate",
                    fontWeight: 600,
                  }}
                >
                  {myTest.instructor?.fullName} - {myTest.instructor?.email}
                </span>
              </div>
              {/* <div className="center" style={{ marginTop: 12, color: "gray" }}>
                Bạn đã hoàn thành bài thi.
              </div> */}
              <span style={{ color: "gray", fontSize: 15, marginRight: 4 }}>
                Nội dung đánh giá:
              </span>
              <span style={{ fontWeight: "bold" }}> {myTest?.evaluate}</span>
            </div>
          )}

          <div className="block--actions-submit">
            {/* <button className="btn btn-client block--actions-submit--item">
              Nộp lại
            </button> */}
            {!!!myTest?.videoUrlSubmit && (
              <button
                disabled={!!myTest?.videoUrlSubmit}
                className={`btn btn-client ${
                  !!myTest?.videoUrlSubmit ? "btn-disabled" : ""
                }`}
                style={{ color: "white", background: "blue" }}
                onClick={() => {
                  dispatch(
                    createTest({
                      courseId: courseId,
                      videoUrlSubmit: videoURL,
                    })
                  );
                }}
              >
                Nộp bài
              </button>
            )}
          </div>
        </Paper>
      </div>
      {(examinationByCourseId?.loading || createTestState?.loading || l1) && (
        <SpinLoading />
      )}
    </div>
  );
};
export default Examination;
