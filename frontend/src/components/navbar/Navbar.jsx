import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openAuth } from "../../actions/modal";
import { logout } from "../../actions/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {},
  toolbar: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    margin: "0 12px",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.logo}>
              Tableau
            </Typography>

            <Box display="flex" justifyContent="" alignItems="center">
              {isAuth ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              ) : (
                <React.Fragment>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => dispatch(openAuth("login"))}
                  >
                    Sign In
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => dispatch(openAuth("register"))}
                  >
                    Sign Up
                  </Button>
                </React.Fragment>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavBar;