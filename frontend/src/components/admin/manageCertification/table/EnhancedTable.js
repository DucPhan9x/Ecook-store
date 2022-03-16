import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import HeaderContainer from "./HeaderContainer";
import ToolbarContainer from "./ToolbarContainer";
import BodyContainer from "./BodyContainer";
import FormControl from "@material-ui/core/FormControl";
import { Modal } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import GetAppIcon from "@material-ui/icons/GetApp";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ queries, setQueries }) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);
  const { totalRows, certificationList } = useSelector(
    (store) => store.certification
  );

  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(certificationList);
  }, [certificationList]);

  const handleRequestSort = (event, property) => {
    const isAsc = queries.orderBy === property && queries.orderType === "asc";
    setQueries({
      ...queries,
      orderBy: property,
      orderType: isAsc ? "desc" : "asc",
      page: 1,
    });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setQueries({ ...queries, page: newPage + 1 });
  };

  const handleChangeRowsPerPage = (event) => {
    setQueries({ ...queries, numOfPerPage: event.target.value, page: 1 });
  };

  const [openModalCertification, setOpenModalCertification] = useState(false);
  const [certificationSelected, setCertificationSelected] = useState({});

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <ToolbarContainer
          selected={selected}
          setRows={setRows}
          rows={rows}
          setSelected={setSelected}
        />
        <TableContainer className="table-container">
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <HeaderContainer
              classes={classes}
              numSelected={selected.length}
              order={queries?.orderType}
              orderBy={queries?.orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <BodyContainer
              rows={rows}
              order={queries?.orderType}
              orderBy={queries?.orderBy}
              selected={selected}
              setSelected={setSelected}
              rowsPerPage={queries.numOfPerPage}
              page={queries.page - 1}
              setCertificationSelected={setCertificationSelected}
              setOpenModalCertification={setOpenModalCertification}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={queries.numOfPerPage}
          page={queries.page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        className="certification-form-container"
        title="Chứng nhận nấu ăn"
        footer={false}
        visible={openModalCertification}
        onOk={() => setOpenModalCertification(false)}
        onCancel={() => {
          setOpenModalCertification(false);
        }}
      >
        <div className="certification-form" id={certificationSelected?._id}>
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
              <img
                src={certificationSelected?.student?.imageUrl}
                alt="avatar"
              />
            </div>
            <div className="certification-form--body-main">
              <div className="block-input-info-student-course">
                <label>Học viên:</label>
                <FormControl>
                  <span>{certificationSelected?.student?.fullName}</span>
                </FormControl>
              </div>
              <div className="block-input-info-student-course">
                <label>Sinh ngày:</label>
                <FormControl>
                  <span>
                    {moment(certificationSelected?.student?.dateOfBirth).format(
                      "DD/MM/YYYY"
                    )}
                  </span>
                </FormControl>
              </div>
              <div className="block-input-info-student-course">
                <label>Đã hoàn thành khóa học:</label>
                <FormControl>
                  <span>{certificationSelected?.course?.courseName}</span>
                </FormControl>
              </div>
              <div className="block-input-info-student-course">
                <label>Xếp loại:</label>
                <FormControl>
                  <span>{certificationSelected.graded}</span>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div
          className="block--signature-certification"
          style={{ marginTop: 48 }}
        >
          <div className="block--signature-certification--title">
            <FormControl>
              <span>{certificationSelected.positionCreate}</span>
            </FormControl>
            <span>,</span>
            <span>ngày</span>
            <FormControl>
              <span>{moment(certificationSelected?.createAt).get("date")}</span>
            </FormControl>
            <span>tháng</span>
            <FormControl>
              <span>
                {moment(certificationSelected?.createAt).get("month") + 1}
              </span>
            </FormControl>
            <span>năm</span>
            <FormControl>
              <span>{moment(certificationSelected?.createAt).get("year")}</span>
            </FormControl>
          </div>
          <IconButton
            style={{
              position: "absolute",
              top: "-478px",
              right: "250px",
            }}
            onClick={() => {
              const input = document.getElementById(certificationSelected?._id);
              html2canvas(input).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                document.body.appendChild(canvas);
                const pdf = new jsPDF();
                pdf.addImage(imgData, "JPEG", 10, 30);
                pdf.save(
                  `Chứng nhận_${certificationSelected?.student?.fullName}_${certificationSelected?._id}.pdf`
                );
              });
            }}
          >
            <GetAppIcon style={{ fontSize: 20 }} />
          </IconButton>
        </div>
      </Modal>
    </div>
  );
}
