import { Paper } from "@material-ui/core";
import { BackPreviousPage, FormBox } from "components/common";
import React, { useEffect } from "react";
import { useState } from "react";
import { uuid } from "utils/stringUtils";

const Examination = () => {
  const [data, setData] = useState({});
  const [videoURL, setVideoURL] = useState("");

  useEffect(() => {
    document.title = "Thi cuối khóa | ECook";
    window.scrollTo(0, 0);

    setData({
      _id: uuid(),
      name: "Món Á cơ bản",
      numOfStars: 4,
      description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
      examinationContent: "Bò hầm tiêu xanh",
      regulation:
        "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
      criteria: "An toan ve sinh thuc pham, trang tri dep mat",
      createAt: Date.now(),
      amountStudent: 12,
    });
  }, []);
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
            <span>- {data?.examinationContent}</span>
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
          <div>
            <label>Copy link bài thi vào đây:</label>
            <FormBox
              propsInput={{
                name: "videoUrl",
                placeholder: "https://...",
                onChange: (e) => setVideoURL(e.target.value),
                value: videoURL,
                disabled: false,
              }}
            />
          </div>
          <div className="block--actions-submit">
            {/* <button className="btn btn-client block--actions-submit--item">
              Lưu nháp
            </button> */}
            <button
              className="btn btn-client"
              style={{ color: "white", background: "blue" }}
            >
              Nộp bài
            </button>
          </div>
        </Paper>
      </div>
    </div>
  );
};
export default Examination;
