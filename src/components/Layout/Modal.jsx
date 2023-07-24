import { forwardRef } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Typography } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = ({ title, open, onDeleteHandler, onCloseHandler }) => {
  return ReactDOM.createPortal(
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onCloseHandler}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>
        Are you sure you want to delete
        <Typography component={"span"} color="error">
          {title || "Yasser"}?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler}>Close</Button>
        <Button color="error" onClick={onDeleteHandler}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>,
    document.getElementById("modal")
  );
};

export default Modal;
