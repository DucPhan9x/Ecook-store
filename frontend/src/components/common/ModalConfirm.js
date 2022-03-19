import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 1),
    maxWidth: 350,
    textAlign: "center",
    borderRadius: 8,
  },
  footer: {
    borderTop: "2px solid #f4f4f4",
    display: "flex",
    height: 40,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  deliver: {
    position: "absolute",
    top: "20%",
    left: "50%",
    height: 22,
    width: 2,
    background: "#f4f4f4",
  },
  btnAction: {
    fontSize: 18,
    color: "red",
    width: "50%",
    cursor: "pointer",
  },
}));

export default function ModalConfirm({
  title,
  handleOk,
  isOpenModal,
  close,
  message,
}) {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpenModal}
      onClose={close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpenModal}>
        <div className={classes.paper}>
          <h4 style={{ fontWeight: "bold", color: "orangered" }}>{title}</h4>
          <span style={{ lineHeight: 1.5, fontSize: 18 }}>{message}</span>
          <div className={classes.footer}>
            <div className={classes.btnAction} onClick={() => close()}>
              Đóng
            </div>
            <div className={classes.deliver} />
            <div className={classes.btnAction} onClick={() => handleOk()}>
              Xác nhận
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
