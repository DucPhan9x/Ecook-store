import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Slide from "@material-ui/core/Slide";
import WarningIcon from "@material-ui/icons/Warning";

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
      <DialogContent
        style={{ textAlign: "center", minWidth: 380, minHeight: 70 }}
      >
        <DialogContentText id="alert-dialog-slide-description flex items-center">
          <WarningIcon /> Bạn có chắc muốn {message} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Đồng ý
        </Button>
        <Button onClick={handleClose} color="secondary">
          Hủy bỏ
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
