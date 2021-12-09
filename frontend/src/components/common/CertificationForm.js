import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import { IconButton, Input, Modal } from "@material-ui/core";
import UploadImage from "./UploadImage";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import SignaturePad from "react-signature-canvas";
import { useRef } from "react";

const CertificationForm = ({ isOpen, close, handleSubmitCertification }) => {
  const padRef = useRef(null);
  function handleClear() {
    padRef?.current?.clear();
  }

  const [form, setForm] = useState({
    imageUrl: "",
    studentName: "",
    dateOfBirthStudent: "",
    courseName: "",
    startStudy: "",
    endStudy: "",
    positionCreate: "",
    createAt: "", // date - month -year
  });
  const handleChangeImage = (e) => {
    const temp = URL.createObjectURL(e.target.files[0]);
    setForm({ ...form, imageUrl: temp });
  };

  return (
    <Modal
      className="certification-form-container"
      title="Chứng nhận nấu ăn"
      visible={isOpen}
      onOk={handleSubmitCertification}
      onCancel={close}
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
                  id="standard-adornment-weight"
                  value=""
                  // onChange={}
                />
              </FormControl>
            </div>
            <div className="block-input-info-student-course">
              <label>Sinh ngày:</label>
              <FormControl>
                <Input
                  id="standard-adornment-weight"
                  value=""
                  // onChange={}
                />
              </FormControl>
            </div>
            <div className="block-input-info-student-course">
              <label>Đã hoàn thành khóa học:</label>
              <FormControl>
                <Input
                  id="standard-adornment-weight"
                  value=""
                  // onChange={}
                />
              </FormControl>
            </div>
            <div className="block-input-info-student-course">
              <div className="flex">
                <label>Từ ngày</label>
                <FormControl>
                  <Input
                    style={{ paddingBottom: 0 }}
                    id="standard-adornment-weight"
                    value=""
                    // onChange={}
                  />
                </FormControl>
              </div>
              <div className="flex">
                <label style={{ padding: "0 2px" }}>đến ngày</label>
                <FormControl>
                  <Input
                    style={{ paddingBottom: 0 }}
                    id="standard-adornment-weight"
                    value=""
                    // onChange={}
                  />
                </FormControl>
              </div>
            </div>
            <div className="block-input-info-student-course">
              <label>Xếp loại:</label>
              <FormControl>
                <Input
                  id="standard-adornment-weight"
                  value=""
                  // onChange={}
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
              id="standard-adornment-weight"
              value=""
              // onChange={}
            />
          </FormControl>
          <span>,</span>
          <span>ngày</span>
          <FormControl>
            <Input
              id="standard-adornment-weight"
              value=""
              // onChange={}
            />
          </FormControl>
          <span>tháng</span>
          <FormControl>
            <Input
              id="standard-adornment-weight"
              value=""
              // onChange={}
            />
          </FormControl>
          <span>năm</span>
          <FormControl>
            <Input
              id="standard-adornment-weight"
              value=""
              // onChange={}
            />
          </FormControl>
        </div>
        <div className="flex">
          <SignaturePad
            ref={padRef}
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
  );
};

export default CertificationForm;
