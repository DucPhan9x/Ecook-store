import React from "react";

const UploadImage = ({ onChangeImage }) => {
  return (
    <>
      <label className="fade-choice-avt" htmlFor="file">
        Upload ảnh
      </label>
      <input
        id="file"
        style={{ display: "none" }}
        type="file"
        name="avatar"
        onChange={onChangeImage}
      />
    </>
  );
};

export default UploadImage;
