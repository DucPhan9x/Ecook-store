import { IconButton, Paper } from "@material-ui/core";
import {
  BackPreviousPage,
  PopoverStickOnHover,
  YoutubeEmbed,
} from "components/common";
import { DropdownCommon } from "components/common/dropdown";
import SearchField from "components/common/input/SearchField";
import React, { useEffect, useState } from "react";
import { EXAMINATIONS_DATA } from "utils/dummyData";
import moment from "moment";
import FlareIcon from "@material-ui/icons/Flare";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Form as ReForm } from "reactstrap";
import { FormBox } from "components/common";
import Button from "@restart/ui/esm/Button";
import { uuid } from "utils/stringUtils";

const ExaminationsCourse = () => {
  const [data, setData] = useState([]);
  const [error, setError] = React.useState({});
  const courseSelected = {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "abcdef",
    examinationContent: "aaaaa",
    regulation: "aaaaaaaaaaaaaaaaaaa",
    criteria: "An toan ve sinh thuc pham, trang tri dep mat",
    videoUrls: [
      {
        title: "Mon Chau A",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        duration: "30 phút",
      },
    ],
    instructor: {
      fullName: "Phan Trong Duc",
      phoneNumber: "0984763232",
      address: "abc",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  };
  const [form, setForm] = useState({
    isPass: true,
    evaluate: "",
  });
  useEffect(() => {
    const temp = EXAMINATIONS_DATA.map((item) => ({
      ...item,
    }));
    setData([...temp]);
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  return (
    <div className="examinations-course-container">
      <h3 className="title-examination-course">
        Danh sách các bài thi cuối khóa học: {courseSelected.name}
      </h3>
      <div className="examinations-course-container-top flex j-space-between">
        <BackPreviousPage />
        <div className="examinations-course-container-top-right flex j-space-between items-center">
          <DropdownCommon
            label="Sắp xếp"
            options={["Mới nhất", "Cũ nhất"]}
            handleMenuClick={(e) => console.log(e)}
          />
          <SearchField onChange={(e) => console.log(e.target.value)} />
        </div>
      </div>
      <Paper className="examinations-course-container-content">
        <div className="examinations-course-container-content-bottom">
          <div className="examinations-course-container-content-bottom-contents">
            <label>
              <FlareIcon />
              Nội dung bài thi:
            </label>
            <span>- {courseSelected.examinationContent}</span>
            <span>- {courseSelected.regulation}</span>
          </div>
          <div className="examinations-course-container-content-bottom-contents">
            <label>
              <FlareIcon />
              Tiêu chí đánh giá:
            </label>
            <span>- {courseSelected.criteria}</span>
          </div>
        </div>
      </Paper>
      {data.map((c, index) => (
        <Paper
          className="examinations-course-container-submit-video"
          key={index}
        >
          <div className="examinations-course-container-submit-video-top">
            <div>
              <span className="name-student">{c?.studentId}</span>
              <PopoverStickOnHover
                component={
                  <div className="popover-container">
                    <span>Phone number</span>
                    <span>Email</span>
                    <span>Address</span>
                  </div>
                }
                placement="top"
                onMouseEnter={() => {}}
                delay={200}
              >
                <IconButton>
                  <InfoOutlinedIcon
                    color="secondary"
                    className="infor-icon-show-student"
                  />
                </IconButton>
              </PopoverStickOnHover>
            </div>
            <span className="time-submit">
              {moment(c?.creatAt).format("DD/MM/YYYY [-] HH:mm:ss")}
            </span>
          </div>
          <div className="examinations-course-container-submit-video-bottom">
            <div className="examinations-course-container-submit-video-bottom--left flex flex-col">
              <YoutubeEmbed videoUrl={c?.videoUrlSubmit} />
            </div>

            <div className="examinations-course-container-submit-video-bottom--right flex">
              <div className="flex flex-col">
                <span>Đánh giá và chấm bài thi</span>
                <ReForm>
                  <div className="flex block-evaluate-exam">
                    <FormBox
                      propsInput={{
                        type: "checkbox",
                        name: "name",
                        onChange: handleChange,
                        onFocus: handleFocus,
                        checked: form.isPass,
                        disabled: false,
                      }}
                      error={error.isPass}
                    />
                    <label style={{ color: "blue", marginLeft: 12 }}>Đạt</label>
                  </div>
                  <div className="flex block-evaluate-exam">
                    <FormBox
                      propsInput={{
                        type: "checkbox",
                        name: "name",
                        onChange: handleChange,
                        onFocus: handleFocus,
                        checked: !form.isPass,
                        disabled: false,
                      }}
                      error={error.isPass}
                    />
                    <label style={{ color: "red", marginLeft: 12 }}>
                      Chưa đạt
                    </label>
                  </div>
                  <div
                    className="flex block-evaluate-exam flex-col"
                    style={{ marginTop: 12 }}
                  >
                    <label style={{ color: "rgb(82, 67, 41)" }}>Nhận xét</label>
                    <FormBox
                      propsInput={{
                        type: "textarea",
                        name: "feedbacks",
                        onChange: handleChange,
                        onFocus: handleFocus,
                        value: form.feedbacks,
                        disabled: false,
                      }}
                      error={error.feedbacks}
                    />
                  </div>
                  <Button className="btn-admin btn-update-exam">
                    Cập nhật
                  </Button>
                </ReForm>
              </div>

              <Button
                className={`btn-admin btn-confirm-exam ${
                  !form.isPass ? "btn-disabled" : ""
                }`}
                disabled={!form.isPass}
              >
                Cấp chứng nhận
              </Button>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default ExaminationsCourse;
