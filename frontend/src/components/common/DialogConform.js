import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import WarningIcon from "assets/icons/warning-icon.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} timeout={500} />;
});

const DialogConfirm = ({ open, handleClose, message, handleSubmit }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <DialogContentText
          id="alert-dialog-slide-description flex items-center"
          style={{ marginBottom: "-6px" }}
        >
          <img
            style={{ width: 30, marginRight: 4, marginBottom: 2 }}
            src={WarningIcon}
            alt=""
          />
          <span style={{ fontSize: 20 }}>Bạn có chắc muốn {message} ?</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        className="center full-width"
        style={{ justifyContent: "center" }}
      >
        <Button onClick={handleSubmit} color="primary" style={{ fontSize: 17 }}>
          Đồng ý
        </Button>
        <Button
          onClick={handleClose}
          color="secondary"
          style={{ fontSize: 17 }}
        >
          Hủy bỏ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
