import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertBox = (props) => {
  const handleClose = () => {
    console.log("jo");
    props.setOpen(false);
  };
  const handleAgree = () => {
    props.setOpen(false);
    console.log(props.alertObject);
    props.callback(props.alertObject);
  };
  return (
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.question} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{props.noText}</Button>
          <Button onClick={handleAgree} autoFocus>
            {props.yesText}
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default AlertBox;