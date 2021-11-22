import React from "react";
import { Modal } from "antd";
import { FormBox } from "components/common";
import { Form as ReForm } from "reactstrap";
import { isEmpty } from "validator";
import PicturesWall from "components/common/UploadContainer";

const ModalCreated = ({ isModalVisible, handleSubmit, close }) => {
  const [error, setError] = React.useState({});

  const [form, setForm] = React.useState({
    title: "",
    contents: "",
    feedbacks: 0,
    imageUrl: "",
    createAt: Date.now(),
  });

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.title)) {
      errorState.name = "Không được để trống!";
    }
    if (isEmpty(form.contents)) {
      errorState.type = "Không được để trống!";
    }
    return errorState;
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    handleSubmit({ ...form, imageUrl: form.imageUrl[0]?.thumbUrl });
    handleReset();
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

  const handleReset = () => {
    setForm({
      title: "",
      contents: "",
      imageUrl: "",
    });
    setError({});
  };

  return (
    <Modal
      className="modal-container"
      title="Công thức mới"
      visible={isModalVisible}
      onOk={handleSubmitForm}
      onCancel={() => {
        close();
        handleReset();
      }}
    >
      <ReForm>
        <div className="block-label-input-modal">
          <label>Ảnh công thức</label>
          <PicturesWall setImageUrl={setForm} form={form} />
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal" style={{ marginRight: 12 }}>
            <label>Tên công thức</label>
            <FormBox
              propsInput={{
                name: "title",
                placeholder: "Tên công thức",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.title,
                disabled: false,
              }}
              error={error.title}
            />
          </div>
        </div>
        <div className="flex full-width j-space-between body-content-form">
          <div className="block-label-input-modal">
            <label>Nội dung công thức</label>
            <FormBox
              propsInput={{
                type: "textarea",
                name: "contents",
                onChange: handleChange,
                onFocus: handleFocus,
                value: form.contents,
                disabled: false,
              }}
              error={error.contents}
            />
          </div>
        </div>
      </ReForm>
    </Modal>
  );
};

export default ModalCreated;
