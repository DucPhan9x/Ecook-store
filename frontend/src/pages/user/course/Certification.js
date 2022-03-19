import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import { Modal } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCertificationByClientIdAndCourseId } from "redux/actions/certification";
import { SpinLoading } from "components/common";
import { IconButton } from "@material-ui/core";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import GetAppIcon from "@material-ui/icons/GetApp";

const Certification = ({ close, courseId, isOpen }) => {
  const [data, setData] = useState({});
  const [l1, setL1] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setL1(true);
    dispatch(
      getCertificationByClientIdAndCourseId(courseId, (res) => {
        if (res.status === 200) {
          setData(res.certification);
          setL1(false);
        } else {
          setL1(false);
          close();
        }
      })
    );
    // eslint-disable-next-line
  }, [dispatch, courseId]);
  return (
    <Modal
      className="certification-form-container"
      title="Chứng nhận nấu ăn"
      footer={false}
      visible={isOpen}
      onOk={close}
      onCancel={close}
    >
      <div className="certification-form" id={data?._id}>
        {l1 && <SpinLoading />}
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
            <img src={data?.student?.imageUrl} alt="avatar" />
          </div>
          <div className="certification-form--body-main">
            <div className="block-input-info-student-course">
              <label>Học viên:</label>
              <FormControl>
                <span>{data?.student?.fullName}</span>
              </FormControl>
            </div>
            <div className="block-input-info-student-course">
              <label>Sinh ngày:</label>
              <FormControl>
                <span>
                  {moment(data?.student?.dateOfBirth).format("DD/MM/YYYY")}
                </span>
              </FormControl>
            </div>
            <div className="block-input-info-student-course">
              <label>Đã hoàn thành khóa học:</label>
              <FormControl>
                <span>{data?.course?.courseName}</span>
              </FormControl>
            </div>
            <div className="block-input-info-student-course">
              <label>Xếp loại:</label>
              <FormControl>
                <span>{data?.graded}</span>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <div className="block--signature-certification" style={{ marginTop: 48 }}>
        <div className="block--signature-certification--title">
          <FormControl>
            <span>{data?.positionCreate}</span>
          </FormControl>
          <span>,</span>
          <span>ngày</span>
          <FormControl>
            <span>{moment(data?.createAt).get("date")}</span>
          </FormControl>
          <span>tháng</span>
          <FormControl>
            <span>{moment(data?.createAt).get("month") + 1}</span>
          </FormControl>
          <span>năm</span>
          <FormControl>
            <span>{moment(data?.createAt).get("year")}</span>
          </FormControl>
        </div>
        <IconButton
          style={{
            position: "absolute",
            top: "-478px",
            right: "250px",
          }}
          onClick={() => {
            const input = document.getElementById(data?._id);
            html2canvas(input).then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF();
              pdf.addImage(imgData, "JPEG", 10, 30);
              pdf.save(
                `Chứng nhận_${data?.student?.fullName}_${data?._id}.pdf`
              );
            });
          }}
        >
          <GetAppIcon style={{ fontSize: 20 }} />
        </IconButton>
      </div>
    </Modal>
  );
};

export default Certification;
