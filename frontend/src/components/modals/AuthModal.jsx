import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useDispatch, useSelector } from "react-redux";
import SignUp from "../auth/SignUp";
import SignIn from "../auth/SignIn";
import { closeAuth } from "../../actions/modal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    //   border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 3),
    outline: "none",
  },
}));

const AuthModal = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.modal);

  const { login, register } = auth;

  const open = login || register;

  const handleClose = () => {
    if (login) {
      dispatch(closeAuth("login"));
    }
    if (register) {
      dispatch(closeAuth("register"));
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {login && <SignIn />}
            {register && <SignUp />}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;