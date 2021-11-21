import { Paper } from "@material-ui/core";
import YoutubeEmbed from "components/common/YoutubeEmbed";
import React, { useState } from "react";
import QueueIcon from "@material-ui/icons/Queue";
import { Modal } from "antd";
import { Form as ReForm } from "reactstrap";
import { isEmpty, isCurrency } from "validator";
import isURL from "validator/lib/isURL";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { FormBox } from "components/common";

const AddCourse = () => {
  const [videoUrls, setVideoUrls] = useState([
    {
      title: "Món Châu Á",
      videoUrl: "https://www.youtube.com/embed/9xH3W0Q--60",
      duration: "30 phút",
    },
  ]);
  const [errorVideo, setErrorVideo] = React.useState({});
  const [error, setError] = React.useState({});
  const [formVideo, setFormVideo] = useState({
    title: "",
    videoUrl: "",
  });
  const [form, setForm] = useState({
    name: "",
    unitPrice: "",
    description: "",
    examinationContent: "",
    createAt: Date.now(),
  });
  const validateVideo = () => {
    const errorState = {};
    // check validate
    if (isEmpty(formVideo.title)) {
      errorState.title = "Vui lòng nhập vào, không được để trống!";
    }
    if (!isURL(formVideo.videoUrl)) {
      errorState.videoUrl = "URL không hợp lệ!";
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
    if (!isCurrency(form.unitPrice)) {
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
    temp.push({
      ...formVideo,
      duration: "30 phút",
    });
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
    console.log({ form });
    console.log({ videoUrls });
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
      <button className="btn-admin btn-add-course" onClick={handleSubmitForm}>
        Tạo mới
      </button>
      <div className="edit-course-container">
        <div className="edit-course-container-left">
          <Paper>
            <h3 className="title-information-course">Thông tin khóa học</h3>
            <ReForm>
              <div className="block-input-info-course">
                <label>Ten khoa hoc</label>
                <FormBox
                  propsInput={{
                    name: "name",
                    placeholder: "Tên khóa học",
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
                    placeholder: "Gia ca khoa hoc",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.unitPrice,
                    disabled: false,
                  }}
                  error={error.unitPrice}
                />
              </div>
              <div className="block-input-info-course">
                <label>Mô tả</label>
                <FormBox
                  propsInput={{
                    type: "textarea",
                    name: "description",
                    placeholder: "Nội dung mô tả",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.description,
                    disabled: false,
                  }}
                  error={error.description}
                />
              </div>
              <div className="block-input-info-course">
                <label>Đề bài và quy định bài thi cuối khóa</label>
                <FormBox
                  propsInput={{
                    type: "textarea",
                    name: "examinationContent",
                    placeholder: "Nội dung",
                    onChange: handleChange,
                    onFocus: handleFocus,
                    value: form.examinationContent,
                    disabled: false,
                  }}
                  error={error.examinationContent}
                />
              </div>
            </ReForm>
          </Paper>
        </div>
        <div className="edit-course-container-right">
          <Paper>
            {videoUrls.map((item, index) => (
              <div className="block-video-course-added">
                <YoutubeEmbed videoUrl={item.videoUrl} />
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
        title="Thông tin bài học"
        visible={isModalVisible}
        onOk={(e) => {
          //add into videoUrls
          handleSubmitFormVideo(e);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <ReForm className="form--login">
          <FormBox
            propsInput={{
              name: "videoUrl",
              placeholder: "URL video",
              onChange: handleChangeVideo,
              onFocus: handleFocusVideo,
              value: formVideo.videoUrl,
              disabled: false,
            }}
            error={errorVideo.videoUrl}
          />
          <FormBox
            propsInput={{
              name: "title",
              placeholder: "Tiêu đề",
              onChange: handleChangeVideo,
              onFocus: handleFocusVideo,
              value: formVideo.title,
              disabled: false,
            }}
            error={errorVideo.title}
          />
        </ReForm>
      </Modal>
    </div>
  );
};

export default AddCourse;
