import React from "react";

const UploadImage = ({ onChangeImage }) => {
  return (
    <>
      <label className="fade-choice-avt" for="file">
        Upload ảnh sản phẩm
      </label>
      <input
        id="file"
        style={{ display: "none" }}
        type="file"
        onChange={onChangeImage}
      />
    </>
  );
};

export default UploadImage;
