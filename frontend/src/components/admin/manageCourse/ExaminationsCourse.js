import { IconButton, Input, Paper } from "@material-ui/core";
import {
  BackPreviousPage,
  PopoverStickOnHover,
  SpinLoading,
  YoutubeEmbed,
} from "components/common";
import { DropdownCommon } from "components/common/dropdown";
import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import FlareIcon from "@material-ui/icons/Flare";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Form as ReForm } from "reactstrap";
import { FormBox } from "components/common";
import Button from "@restart/ui/esm/Button";
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
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getExaminationByCourseId,
  getListTestPerPage,
} from "redux/actions/course";

const ExaminationsCourse = () => {
  const [data, setData] = useState({});
  const [openModalCertification, setOpenModalCertification] = useState(false);
  const dispatch = useDispatch();
  const { courseID } = useParams();
  const { examinationByCourseId, getListTestState, updateTestState } =
    useSelector((store) => store.course);
  const [queries, setQueries] = useState({
    orderBy: "createAt",
    orderType: "asc",
    page: 1,
    isPass: false,
    numOfPerPage: 5,
  });

  useEffect(() => {
    dispatch(getExaminationByCourseId(courseID));
  }, [courseID, dispatch]);

  useEffect(() => {
    dispatch(getListTestPerPage({ ...queries, courseId: courseID }));
  }, [queries, dispatch, courseID]);

  const [tests, setTests] = useState([]);
  useEffect(() => {
    setData(examinationByCourseId?.data);
  }, [examinationByCourseId]);

  useEffect(() => {
    setTests(getListTestState?.testList);
  }, [getListTestState]);

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
    studentDayOfBirth: "",
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
        Danh sách các bài thi cuối khóa học: {data?.courseName}
      </h3>
      <div className="examinations-course-container-top flex j-space-between">
        <BackPreviousPage />
        <div className="examinations-course-container-top-right flex j-space-between items-center">
          <DropdownCommon
            label="Sắp xếp"
            selectedItem={
              ["Mới nhất", "Cũ nhất"][queries.orderType === "asc" ? 1 : 0]
            }
            options={["Mới nhất", "Cũ nhất"]}
            handleMenuClick={(e) =>
              setQueries({
                ...queries,
                orderType: Number(e.key) === 0 ? "desc" : "asc",
                page: 1,
              })
            }
          />
          <div className="flex items-center">
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="isPass"
                name="isPass"
                value={queries.isPass ? "pass" : "fail"}
                onChange={(e) =>
                  setQueries({ ...queries, isPass: e.target.value === "pass" })
                }
                className="flex flex-row"
              >
                <FormControlLabel
                  value="pass"
                  control={<Radio />}
                  label="Pass"
                />
                <FormControlLabel
                  value="fail"
                  control={<Radio />}
                  label="Fail"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
      <Paper className="examinations-course-container-content">
        <div className="examinations-course-container-content-bottom">
          <div className="examinations-course-container-content-bottom-contents">
            <label>
              <FlareIcon />
              Nội dung bài thi:
            </label>
            <span>- {data?.content}</span>
            <span>- {data?.regulation}</span>
          </div>
          <div className="examinations-course-container-content-bottom-contents">
            <label>
              <FlareIcon />
              Tiêu chí đánh giá:
            </label>
            <span>- {data?.criteria}</span>
          </div>
        </div>
      </Paper>
      {tests?.length > 0 ? (
        tests?.map((c, index) => (
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
                        // setData(temp);
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
                          // setData(temp);
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
        ))
      ) : (
        <div style={{ color: "gray", marginTop: 50 }} className="center">
          Không có bài thi nào được tìm thấy!
        </div>
      )}
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
                    value={form.studentDayOfBirth}
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
      {(examinationByCourseId?.loading ||
        getListTestState.loading ||
        updateTestState.loading) && <SpinLoading />}
    </div>
  );
};

export default ExaminationsCourse;
