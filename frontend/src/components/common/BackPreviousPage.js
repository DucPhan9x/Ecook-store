import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const BackPreviousPage = () => {
  return (
    <span
      className="text-back-previous-page"
      onClick={() => window.history.back()}
    >
      <ArrowBackIcon />
      Quay lại trang trước
    </span>
  );
};
export default BackPreviousPage;
