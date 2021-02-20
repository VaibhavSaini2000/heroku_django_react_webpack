import React, { useState } from "react";
// import {  makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch } from "react-redux";
import { register } from "../../actions/auth";

const SignUp = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && email && password && confirm === password) {
      const newUser = {
        username:name,
        password,
        email,
      };
      dispatch(register(newUser));
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item container justify="center">
            <Typography variant="h6">Create Your Profile</Typography>
          </Grid>
          {/* Input fields */}
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <Typography variant="caption" color="textSecondary">
                Real names are important to us and build a sense of community.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              <Typography variant="caption" color="textSecondary">
                Use your email to sign in to Tableau Public. Nobody sees this
                but us. We promise never to rent, sell, or barter your personal
                information to anyone.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              <Typography variant="caption" color="textSecondary">
                Must be a minimum of 8 characters and contain alphabetic,
                numeric and special characters.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item container alignItems="center">
              <Checkbox color="primary" />
              <Typography variant="body2">
                I've read and agree to the Terms of Service
              </Typography>
            </Grid>
          </Grid>
          {/* Buttons/Actions */}
          <Grid item container>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                type="submit"
              >
                Create My Profile
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUp;
