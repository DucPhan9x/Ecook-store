import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import QueueIcon from "@material-ui/icons/Queue";
import { Modal } from "antd";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isCurrency } from "validator";
import isURL from "validator/lib/isURL";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { FormBox, SpinLoading } from "components/common";
import { useParams } from "react-router";
import BackPreviousPage from "components/common/BackPreviousPage";
import { useDispatch } from "react-redux";
import { getCourseById, updateCourseById } from "redux/actions/course";
import { useSelector } from "react-redux";

const EditCourse = () => {
  // fetch data by id to edit
  const { courseID } = useParams();
  const [videoUrls, setVideoUrls] = useState([]);
  const [formVideo, setFormVideo] = useState({
    title: "",
    videoUrl: "",
    duration: 0,
  });

  const dispatch = useDispatch();
  const { getCourseByIdState, updateCourseState } = useSelector(
    (store) => store.course
  );

  const [form, setForm] = useState({
    name: "",
    unitPrice: "",
    description: "",
    discountOff: 0,
    discountMaximum: 0,
    examinationContent: "",
    regulation: "",
    criteria: "",
    createAt: Date.now(),
  });

  useEffect(() => {
    dispatch(getCourseById(courseID));
  }, [dispatch, courseID]);

  useEffect(() => {
    let editedCourse = getCourseByIdState.data;
    if (!editedCourse) return;
    setVideoUrls(editedCourse.videoList);
    setForm({
      name: editedCourse.courseName,
      unitPrice: editedCourse.unitPrice,
      description: editedCourse.description,
      discountOff: editedCourse.discountOff,
      discountMaximum: editedCourse.discountMaximum,
      examinationContent: editedCourse.examination?.content,
      regulation: editedCourse.examination?.regulation,
      criteria: editedCourse.examination?.criteria,
      createAt: editedCourse.createAt,
    });
  }, [getCourseByIdState]);

  const [errorVideo, setErrorVideo] = React.useState({});
  const [error, setError] = React.useState({});

  const validateVideo = () => {
    const errorState = {};
    // check validate
    if (isEmpty(formVideo.title)) {
      errorState.title = "Vui lòng nhập vào, không được để trống!";
    }
    if (!isURL(formVideo.videoUrl)) {
      errorState.videoUrl = "URL không hợp lệ!";
    }
    if (!formVideo.duration) {
      errorState.duration = "Vui lòng nhập vào, không được để trống!";
    }

    return errorState;
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.name)) {
      errorState.name = "Vui lòng nhập vào, không được để trống!";
    }
    if (isEmpty(form.examinationContent)) {
      errorState.examinationContent = "Vui lòng nhập vào, không được để trống!";
    }
    if (!isCurrency(String(form.unitPrice))) {
      errorState.unitPrice = "Nhập mệnh giá hợp lệ!";
    }

    return errorState;
  };

  const handleSubmitFormVideo = (event) => {
    event.preventDefault();
    const errorState = validateVideo();
    if (Object.keys(errorState).length > 0) {
      return setErrorVideo(errorState);
    }
    const temp = [...videoUrls];
    temp.push(formVideo);
    setVideoUrls(temp);
    setIsModalVisible(false);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    // API add couse
    const requestData = {
      courseId: courseID,
      courseName: form.name,
      discountOff: form.discountOff,
      discountMaximum: form.discountMaximum,
      description: form.description,
      unitPrice: form.unitPrice,
      videoList: videoUrls,
      examination: {
        regulation: form.regulation,
        criteria: form.criteria,
        content: form.examinationContent,
        tests: [],
      },
    };
    dispatch(updateCourseById(requestData));
  };
  const handleChangeVideo = (event) => {
    setFormVideo({ ...formVideo, [event.target.name]: event.target.value });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleFocusVideo = (event) => {
    setErrorVideo({
      ...errorVideo,
      [event.target.name]: "",
    });
  };

  const handleFocus = (event) => {
    setError({
      ...error,
      [event.target.name]: "",
    });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className="flex flex-col">
      <div className="flex j-space-between">
        <BackPreviousPage />
        <button className="btn-admin btn-add-course" onClick={handleSubmitForm}>
          Cập nhật
        </button>
      </div>
      <div className="edit-course-container">
        <div className="edit-course-container-left">
          <Paper>
            <h3 className="title-information-course">Thông tin khóa học</h3>
            <ReForm>
              <div className="block-input-info-course">
                <label>Tên khóa học</label>
                <FormBox
                  propsInput={{
                    name: "name",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.name,
                    disabled: false,
                  }}
                  error={error.name}
                />
              </div>
              <div className="block-input-info-course">
                <label>Giá cả khóa học</label>
                <FormBox
                  propsInput={{
                    type: "number",
                    min: 0,
                    name: "unitPrice",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.unitPrice,
                    disabled: false,
                  }}
                  error={error.unitPrice}
                />
              </div>
              <div className="block-input-info-course">
                <label>Giảm giá(%)</label>
                <FormBox
                  propsInput={{
                    type: "number",
                    min: 0,
                    name: "discountOff",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.discountOff,
                    disabled: false,
                  }}
                  error={error.discountOff}
                />
              </div>
              <div className="block-input-info-course">
                <label>Giá giảm tối đa:</label>
                <FormBox
                  propsInput={{
                    type: "number",
                    min: 0,
                    name: "discountMaximum",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.discountMaximum,
                    disabled: false,
                  }}
                  error={error.discountMaximum}
                />
              </div>
              <div className="block-input-info-course">
                <label>Mô tả</label>
                <FormBox
                  propsInput={{
                    type: "textarea",
                    name: "description",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.description,
                    disabled: false,
                  }}
                  error={error.description}
                />
              </div>
              <h3 className="title-information-course">Thông tin bài thi</h3>
              <div className="block-input-info-course">
                <label>Đề bài thi cuối khóa</label>
                <FormBox
                  propsInput={{
                    type: "textarea",
                    name: "examinationContent",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.examinationContent,
                    disabled: false,
                  }}
                  error={error.examinationContent}
                />
              </div>
              <div className="block-input-info-course">
                <label>Quy định</label>
                <FormBox
                  propsInput={{
                    type: "textarea",
                    name: "regulation",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.regulation,
                    disabled: false,
                  }}
                  error={error.regulation}
                />
              </div>
              <div className="block-input-info-course">
                <label>Tiêu chí chấm điểm</label>
                <FormBox
                  propsInput={{
                    type: "textarea",
                    name: "criteria",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.criteria,
                    disabled: false,
                  }}
                  error={error.criteria}
                />
              </div>
            </ReForm>
          </Paper>
        </div>
        <div className="edit-course-container-right">
          <Paper>
            {videoUrls?.map((item, index) => (
              <div className="block-video-course-added">
                <iframe
                  src={item?.videoUrl}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  controls
                  title="Embedded youtube"
                />
                <div className="block-video-course-added-right">
                  <div>
                    <label>Bài {index + 1}: </label>
                    <span>{item.title}</span>
                  </div>
                  <div>
                    <label>Thời lượng: </label>
                    <span>{item.duration}</span>
                  </div>
                  <div
                    className="block-remove-video"
                    onClick={() => {
                      setVideoUrls(videoUrls.filter((v, idx) => idx !== index));
                    }}
                  >
                    <DeleteOutlineIcon color="action" />
                    <span>Xóa bài học</span>
                  </div>
                </div>
              </div>
            ))}
            <div
              className="block-action-add-video"
              onClick={() => setIsModalVisible(true)}
            >
              <QueueIcon color="action" />
              <span>Thêm bài mới</span>
            </div>
          </Paper>
        </div>
      </div>
      <Modal
        className="modal-add-video-course"
        title="Thông tin bài học"
        visible={isModalVisible}
        onOk={(e) => {
          //add into videoUrls
          handleSubmitFormVideo(e);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <ReForm>
          <div className="body-content-form-add-video">
            <label>Đường dẫn video</label>
            <FormBox
              propsInput={{
                name: "videoUrl",
                placeholder: "https://...",
                onChange: handleChangeVideo,
                onFocus: handleFocusVideo,
                value: formVideo.videoUrl,
                disabled: false,
              }}
              error={errorVideo.videoUrl}
            />
          </div>
          <div className="body-content-form-add-video">
            <label>Tiêu đề</label>
            <FormBox
              propsInput={{
                name: "title",
                onChange: handleChangeVideo,
                onFocus: handleFocusVideo,
                value: formVideo.title,
                disabled: false,
              }}
              error={errorVideo.title}
            />
          </div>
          <div className="body-content-form-add-video">
            <label>Thời lượng(phút)</label>
            <FormBox
              propsInput={{
                type: "number",
                name: "duration",
                onChange: handleChangeVideo,
                onFocus: handleFocusVideo,
                value: formVideo.duration,
                disabled: false,
              }}
              error={errorVideo.duration}
            />
          </div>
        </ReForm>
      </Modal>
      {(getCourseByIdState.loading || updateCourseState.loading) && (
        <SpinLoading />
      )}
    </div>
  );
};

export default EditCourse;
