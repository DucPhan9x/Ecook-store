import { IconButton, Input, Paper } from "@material-ui/core";
import {
  BackPreviousPage,
  PopoverStickOnHover,
  YoutubeEmbed,
} from "components/common";
import { DropdownCommon } from "components/common/dropdown";
import SearchField from "components/common/input/SearchField";
import React, { useEffect, useRef, useState } from "react";
import { EXAMINATIONS_DATA } from "utils/dummyData";
import moment from "moment";
import FlareIcon from "@material-ui/icons/Flare";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Form as ReForm } from "reactstrap";
import { FormBox } from "components/common";
import Button from "@restart/ui/esm/Button";
import { uuid } from "utils/stringUtils";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BusinessIcon from "@material-ui/icons/Business";
import { Modal } from "antd";
import SignaturePad from "react-signature-canvas";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import UploadImage from "components/common/UploadImage";
import { isEmpty } from "validator";

const ExaminationsCourse = () => {
  const [data, setData] = useState([]);
  const [openModalCertification, setOpenModalCertification] = useState(false);
  // fetch course by id course
  const courseSelected = {
    _id: uuid(),
    name: "Món Á cơ bản",
    unitPrice: 799999,
    description: "Đây là khóa học chủ yếu tập trung vào các món ăn Châu Á.",
    examinationContent: "Bò hầm tiêu xanh",
    regulation:
      "Thời gian 45 phút, quay video từ khâu sơ chế đến khi thành phẩm.",
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
      address: "TT. La Hai - H.Dong Xuan - T.Phu Yen",
      imageUrl: "https://picsum.photos/200/300",
      email: "trongduc@gmail.com",
    },
    createAt: Date.now(),
  };

  useEffect(() => {
    // fetch examination by course id
    const temp = EXAMINATIONS_DATA.map((item) => ({
      ...item,
    }));
    setData([...temp]);
  }, []);

  let padRef = useRef(null);

  const handleSubmitCertification = () => {
    console.log("Submit, Call API post certification");
  };

  function handleClear() {
    padRef?.current?.clear();
  }

  useEffect(() => {
    if (padRef) {
      handleClear();
    }
  }, [padRef]);

  // certification data
  const [form, setForm] = useState({
    studentName: "",
    courseName: "",
    startDate: "",
    endDate: "",
    evaluate: "",
    studentDayOfBirth: Date.now(),
    positionCreate: "",
    createAt_date: moment(Date.now()).get("date"),
    createAt_month: moment(Date.now()).get("month"),
    createAt_year: moment(Date.now()).get("year"),
  });
  const [error, setError] = React.useState({});

  const handleChangeImage = (e) => {
    const temp = URL.createObjectURL(e.target.files[0]);
    setForm({ ...form, imageUrl: temp });
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.studentName)) {
      errorState.studentName = "Vui lòng nhập vào, không được để trống!";
    }
    if (isEmpty(form.courseName)) {
      errorState.courseName = "Vui lòng nhập vào, không được để trống!";
    }

    return errorState;
  };
  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  const handleUpdateEvaluate = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    // const formData = {
    //   email: form.email,
    //   password: form.password,
    // };
    // // handleSubmit(formData);
  };

  return (
    <div className="examinations-course-container">
      <h3 className="title-examination-course">
        Danh sách các bài thi cuối khóa học: {courseSelected.content}
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
              <span className="name-student">{c?.student.fullName}</span>
              <PopoverStickOnHover
                component={
                  <div className="popover-show-info-student-container">
                    <div className="popover-show-info-student-container--item">
                      <PhoneAndroidIcon />
                      <span>{c?.student.phoneNumber}</span>
                    </div>
                    <div className="popover-show-info-student-container--item">
                      <MailOutlineIcon />
                      <span>{c?.student.email}</span>
                    </div>
                    <div className="popover-show-info-student-container--item">
                      <BusinessIcon />
                      <span>{c?.student.address}</span>
                    </div>
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
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="evaluate"
                    name="evaluate"
                    value={c.isPass ? "pass" : "fail"}
                    onChange={(e) => {
                      let temp = [...data];
                      temp.forEach((item) => {
                        if (item._id === c._id) {
                          item.isPass = e.target.value === "pass";
                        }
                      });
                      setData(temp);
                    }}
                    className="flex flex-row"
                  >
                    <FormControlLabel
                      style={{ color: "blue" }}
                      value="pass"
                      control={<Radio />}
                      label="Đạt"
                    />
                    <FormControlLabel
                      style={{ color: "red" }}
                      value="fail"
                      control={<Radio />}
                      label="Chưa đạt"
                    />
                  </RadioGroup>
                </FormControl>
                <div
                  className="flex block-evaluate-exam flex-col"
                  style={{ marginTop: 12 }}
                >
                  <label style={{ color: "rgb(82, 67, 41)" }}>Nhận xét</label>
                  <FormBox
                    propsInput={{
                      type: "textarea",
                      name: "feedbacks",
                      onChange: (e) => {
                        let temp = [...data];
                        temp[index].feedbacks = e.target.value;
                        setData(temp);
                      },
                      value: c.feedbacks,
                      disabled: false,
                    }}
                  />
                </div>
                <ReForm>
                  <Button
                    className="btn-admin btn-update-exam"
                    onClick={handleUpdateEvaluate}
                  >
                    Cập nhật
                  </Button>
                </ReForm>
              </div>

              <Button
                className={`btn-admin btn-confirm-exam ${
                  !c.isPass ? "btn-disabled" : ""
                }`}
                disabled={!c.isPass}
                onClick={() => setOpenModalCertification(true)}
              >
                Cấp chứng nhận
              </Button>
            </div>
          </div>
        </Paper>
      ))}
      <Modal
        className="certification-form-container"
        title="Chứng nhận nấu ăn"
        visible={openModalCertification}
        onOk={handleSubmitCertification}
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
              {form?.imageUrl ? (
                <img src={form?.imageUrl} alt="avatar" />
              ) : (
                <span style={{ fontSize: 20, color: "gray" }}>Ảnh 3x4</span>
              )}
              <UploadImage onChangeImage={handleChangeImage} />
            </div>
            <div className="certification-form--body-main">
              <div className="block-input-info-student-course">
                <label>Học viên:</label>
                <FormControl>
                  <Input
                    name="studentName"
                    id="standard-adornment-weight"
                    value={form.studentName}
                    onFocus={handleFocus}
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <div className="block-input-info-student-course">
                <label>Sinh ngày:</label>
                <FormControl>
                  <Input
                    type="date"
                    name="studentDayOfBirth"
                    id="standard-adornment-weight"
                    value={moment(form.studentDayOfBirth).format("DD/MM/YYYY")}
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                </FormControl>
              </div>
              <div className="block-input-info-student-course">
                <label>Đã hoàn thành khóa học:</label>
                <FormControl>
                  <Input
                    name="courseName"
                    id="standard-adornment-weight"
                    value={form.courseName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                </FormControl>
              </div>
              <div className="block-input-info-student-course">
                <div className="flex">
                  <label>Từ ngày</label>
                  <FormControl>
                    <Input
                      type="date"
                      style={{ paddingBottom: 0 }}
                      name="startDate"
                      id="standard-adornment-weight"
                      value={form.startDate}
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                  </FormControl>
                </div>
                <div className="flex">
                  <label style={{ padding: "0 2px" }}>đến ngày</label>
                  <FormControl>
                    <Input
                      type="date"
                      style={{ paddingBottom: 0 }}
                      name="endDate"
                      id="standard-adornment-weight"
                      value={form.endDate}
                      onChange={handleChange}
                      onFocus={handleFocus}
                    />
                  </FormControl>
                </div>
              </div>
              <div className="block-input-info-student-course">
                <label>Xếp loại:</label>
                <FormControl>
                  <Input
                    name="evaluate"
                    id="standard-adornment-weight"
                    value={form.evaluate}
                    onChange={handleChange}
                    onFocus={handleFocus}
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div className="block--signature-certification">
          <div className="block--signature-certification--title">
            <FormControl>
              <Input
                name="positionCreate"
                id="standard-adornment-weight"
                value={form.positionCreate}
                onChange={handleChange}
                onFocus={handleFocus}
              />
            </FormControl>
            <span>,</span>
            <span>ngày</span>
            <FormControl>
              <Input
                name="createAt_date"
                id="standard-adornment-weight"
                value={form.createAt_date}
                onChange={handleChange}
                onFocus={handleFocus}
              />
            </FormControl>
            <span>tháng</span>
            <FormControl>
              <Input
                name="createAt_month"
                id="standard-adornment-weight"
                value={form.createAt_month}
                onChange={handleChange}
                onFocus={handleFocus}
              />
            </FormControl>
            <span>năm</span>
            <FormControl>
              <Input
                name="createAt_year"
                id="standard-adornment-weight"
                value={form.createAt_year}
                onChange={handleChange}
                onFocus={handleFocus}
              />
            </FormControl>
          </div>
          <div className="flex">
            <SignaturePad
              ref={padRef}
              onEnd={(e) => console.log(e)}
              canvasProps={{
                width: "100%",
                height: "100%",
                className: "sigCanvas",
              }}
            />
            <IconButton onClick={handleClear} style={{ alignSelf: "center" }}>
              <DeleteOutlineIcon />
            </IconButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ExaminationsCourse;
