import { Button, Result } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

const ErrorPage = () => {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn đã truy cập không tồn tại."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Trở lại trang chủ
        </Button>
      }
    />
  );
};

export default ErrorPage;
