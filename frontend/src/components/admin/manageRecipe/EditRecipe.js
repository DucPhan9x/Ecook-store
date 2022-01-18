import { Paper } from "@material-ui/core";
import { BackPreviousPage } from "components/common";
import React, { useEffect, useState } from "react";
import { Form as ReForm } from "reactstrap";
import { FormBox } from "components/common";
import { isEmpty } from "validator";
import NoImage from "assets/images/notImage.png";
import UploadImage from "components/common/UploadImage";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Select } from "antd";
import { useParams } from "react-router";
import { RECIPES_DATA } from "utils/dummyData";

const { Option } = Select;

const EditRecipe = () => {
  const [error, setError] = React.useState({});

  const [form, setForm] = useState({
    name: "",
    contents: ["a", "b"],
    materials: [
      {
        foodName: "a",
        quantity: 0.5,
        unit: "kg",
      },
    ],
    imageUrl: "",
    slotQuantity: 0,
  });

  const { recipeID } = useParams();

  useEffect(() => {
    const data = RECIPES_DATA.find((r) => r._id === recipeID);
    setForm({
      name: data?.title,
      contents: data?.contents,
      materials: data?.material,
      imageUrl: data?.imageUrl,
    });
  }, [recipeID]);

  function onChange(value, index) {
    let temp = [...form.materials];
    temp[index].unit = value;
    setForm({
      ...form,
      materials: [...temp],
    });
  }

  const validate = () => {
    const errorState = {};
    // check validate
    if (isEmpty(form.name)) {
      errorState.name = "Vui lòng nhập vào, không được để trống!";
    }
    if (!form.slotQuantity) {
      errorState.slotQuantity = "Vui lòng nhập vào!";
    }
    form.materials.forEach((m) => {
      if (
        isEmpty(m.foodName) ||
        isEmpty(String(m.quantity)) ||
        isEmpty(m.unit)
      ) {
        errorState.materials = "Vui lòng nhập đầy đủ thông tin!";
        return;
      }
    });

    form.contents.forEach((c) => {
      if (isEmpty(c)) {
        errorState.contents = "Vui lòng nhập đầy đủ thông tin!";
        return;
      }
    });
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
    // API add recipe
    console.log({ form });
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
          <img src={form?.imageUrl || NoImage} alt="avatar" />
          <UploadImage onChangeImage={handleChangeImage} />
        </Paper>
        <Paper className="add-edit-recipe-container-bottom--right">
          <ReForm>
            <div className="block-input-info-course">
              <label>Tên công thức</label>
              <FormBox
                propsInput={{
                  placeholder: "Nhập tên",
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
              {form.materials?.map((m, index) => (
                <div key={index} className="block-material-input">
                  <FormBox
                    propsInput={{
                      placeholder: "Tên nguyên liệu",
                      name: "materials",
                      onChange: (e) => {
                        let temp = [...form.materials];
                        temp[index].foodName = e.target.value;
                        setForm({
                          ...form,
                          materials: [...temp],
                        });
                      },
                      onFocus: handleFocus,
                      value: m.foodName,
                      disabled: false,
                    }}
                  />
                  <FormBox
                    propsInput={{
                      placeholder: "Số lượng",
                      name: "materials",
                      type: "number",
                      min: 0,
                      step: 0.5,
                      onChange: (e) => {
                        let temp = [...form.materials];
                        temp[index].quantity = e.target.value;
                        setForm({
                          ...form,
                          materials: [...temp],
                        });
                      },
                      onFocus: handleFocus,
                      value: m.quantity,
                      disabled: false,
                    }}
                  />
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Đơn vị"
                    onFocus={() => {
                      setError({
                        ...error,
                        materials: "",
                      });
                    }}
                    value={m.unit}
                    optionFilterProp="children"
                    onChange={(value) => onChange(value, index)}
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="kg">kg</Option>
                    <Option value="g">g</Option>
                    <Option value="l">l</Option>
                    <Option value="ml">ml</Option>
                    <Option value="others">Khác(tự ghi chú)</Option>
                  </Select>
                </div>
              ))}
              {error.materials && (
                <span className="invalid-feedback-error">
                  {error.materials}
                </span>
              )}
              <button
                className="btn-add-input"
                onClick={(e) => {
                  e.preventDefault();
                  setForm({
                    ...form,
                    materials: [
                      ...form.materials,
                      {
                        foodName: "",
                        unit: "",
                        quantity: "",
                      },
                    ],
                  });
                }}
              >
                <AddCircleOutlineIcon color="action" />
              </button>
            </div>
            <div className="block-input-info-course">
              <label>Quy trình thực hiện(ghi rõ từng bước)</label>
              {form.contents?.map((c, idx) => (
                <FormBox
                  key={idx}
                  propsInput={{
                    placeholder: `Bước ${idx + 1}`,
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
                />
              ))}
              {error.contents && (
                <span className="invalid-feedback-error">{error.contents}</span>
              )}
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
                <AddCircleOutlineIcon color="action" />
              </button>
            </div>
            <div className="block-input-info-course">
              <label>Định lượng (số người ăn)</label>
              <FormBox
                propsInput={{
                  placeholder: "Định lượng",
                  type: "number",
                  name: "slotQuantity",
                  onChange: handleChange,
                  onFocus: handleFocus,
                  value: form.slotQuantity,
                  disabled: false,
                }}
                error={error.slotQuantity}
              />
            </div>
            <div className="block-input-info-course">
              <label>Mô tả/chú thích thêm</label>
              <FormBox
                propsInput={{
                  placeholder: "Nội dung",
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
export default EditRecipe;
