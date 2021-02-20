import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      dispatch(login(email, password));
    } else {
      setError("invalid username and password");
    }
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item container justify="center">
            <Typography variant="h6">Tableau</Typography>
          </Grid>
          {/* Input fields */}
          <Grid item container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item container alignItems="center">
              <Checkbox color="primary" />
              <Typography variant="body2">Keep me signed in</Typography>
            </Grid>
            {error && (
              <Grid item container justify="center">
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              </Grid>
            )}
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
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center" color="primary">
                Forgot your password?
              </Typography>
            </Grid>
          </Grid>
          {/* Footer */}
          {/* <Grid item container>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Don't have a profile yet?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center" color="primary">
                Create one now for free
              </Typography>
            </Grid>
          </Grid> */}
        </Grid>
      </form>
    </Container>
  );
};

export default SignIn;
