import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const BackPreviousPage = () => {
  return (
    <div
      className="text-back-previous-page"
      onClick={() => window.history.back()}
    >
      <ArrowBackIcon />
      Quay lại trang trước
    </div>
  );
};
export default BackPreviousPage;
