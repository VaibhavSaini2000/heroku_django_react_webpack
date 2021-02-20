import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.dark,
    color: "#FFF",
    padding: "30px 0",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
}));

const Footer = () => {
  const classes = useStyles();

  const products = [
    "Products",
    "Tablaeu Desktop",
    "Tablaeu Server",
    "Tablaeu Online",
    "Tablaeu Prep",
    "Tablaeu Public",
  ];

  const legals = [
    "Legal",
    "Privacy Policy",
    "Data policy",
    "Terms of Service",
    "Patents & IP",
    "Do not sell my Personal Information",
  ];

  const about = [
    "About",
    "What is Tablaeu Public",
    "Current stats",
    "FAQ",
    "Careers",
    "Contact Us",
  ];

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Tableau</Typography>
            <Typography variant="caption">
              © 2021 Tableau Software, LLC, a Salesforce Company. All rights
              reserved
            </Typography>
          </Grid>
          <Grid item xs={12} md={7}>
            <Grid item container>
              <Grid item xs={4}>
                {products.map((product) => (
                  <Typography variant="body1" key={product}>
                    {product}
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={4}>
                {legals.map((legal) => (
                  <Typography variant="body1" key={legal}>
                    {legal}
                  </Typography>
                ))}
              </Grid>

              <Grid item xs={4}>
                {about.map((about) => (
                  <Typography variant="body1" key={about}>
                    {about}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid item container justify="center">
              <Grid item xs={2}>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  <TwitterIcon />
                </a>
              </Grid>
              <Grid item xs={2}>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  <FacebookIcon />
                </a>
              </Grid>
              <Grid item xs={2}>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.link}
                >
                  <LinkedInIcon />
                </a>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;