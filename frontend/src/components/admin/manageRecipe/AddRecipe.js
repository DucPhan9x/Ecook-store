import { Paper } from "@material-ui/core";
import { BackPreviousPage } from "components/common";
import React, { useState } from "react";
import { Form as ReForm } from "reactstrap";
import { FormBox } from "components/common";
import { isEmpty } from "validator";
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import UploadImage from "components/common/UploadImage";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const AddRecipe = () => {
  const [error, setError] = React.useState({});

  const [form, setForm] = useState({
    name: "",
    contents: ["a", "b"],
    materials: ["a", "b"],
    imageUrl: "",
  });

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.name)) {
      errorState.name = "Vui lòng nhập vào, không được để trống!";
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

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    // API add couse
  };

  const handleChangeImage = (e) => {
    const temp = URL.createObjectURL(e.target.files[0]);
    setForm({ ...form, imageUrl: temp });
  };

  return (
    <div className="add-edit-recipe-container">
      <div className="add-edit-recipe-container-top">
        <BackPreviousPage />
        <button onClick={handleSubmitForm} className="btn-admin">
          Tạo mới
        </button>
      </div>
      <div className="add-edit-recipe-container-bottom">
        <Paper className="add-edit-recipe-container-bottom--left">
          {form?.imageUrl ? (
            <img src={form?.imageUrl} alt="avatar" />
          ) : (
            <WallpaperIcon
              style={{ width: "70%", height: "70%" }}
              color="action"
            />
          )}
          <UploadImage onChangeImage={handleChangeImage} />
        </Paper>
        <Paper className="add-edit-recipe-container-bottom--right">
          <ReForm>
            <div className="block-input-info-course">
              <label>Tên công thức</label>
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
              <label>Danh sách nguyên liệu chính</label>
              {form.materials.map((m, index) => (
                <FormBox
                  propsInput={{
                    name: "materials",
                    onChange: (e) => {
                      let temp = [...form.materials];
                      temp[index] = e.target.value;
                      setForm({
                        ...form,
                        materials: [...temp],
                      });
                    },
                    onFocus: handleFocus,
                    value: m,
                    disabled: false,
                  }}
                  error={error.m}
                />
              ))}
              <button
                className="btn-add-input"
                onClick={(e) => {
                  e.preventDefault();
                  setForm({
                    ...form,
                    materials: [...form.materials, ""],
                  });
                }}
              >
                <AddCircleOutlineIcon color="action" /> Thêm
              </button>
            </div>
            <div className="block-input-info-course">
              <label>Quy trình thực hiện(ghi rõ từng bước)</label>
              {form.contents.map((c, idx) => (
                <FormBox
                  propsInput={{
                    name: "contents",
                    onChange: (e) => {
                      let temp = [...form.contents];
                      temp[idx] = e.target.value;
                      setForm({
                        ...form,
                        contents: [...temp],
                      });
                    },
                    onFocus: handleFocus,
                    value: c,
                    disabled: false,
                  }}
                  error={error.c}
                />
              ))}
              <button
                className="btn-add-input"
                onClick={(e) => {
                  e.preventDefault();
                  setForm({
                    ...form,
                    contents: [...form.contents, ""],
                  });
                }}
              >
                <AddCircleOutlineIcon color="action" /> Thêm
              </button>
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
          </ReForm>
        </Paper>
      </div>
    </div>
  );
};
export default AddRecipe;
