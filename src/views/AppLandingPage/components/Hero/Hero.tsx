import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid, Button, Typography } from "@material-ui/core";
import { Image } from "../../../../components/atoms";
import { SectionHeader } from "../../../../components/molecules";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  image: {
    boxShadow:
      "25px 60px 125px -25px rgba(80,102,144,.1), 16px 40px 75px -40px rgba(0,0,0,.2)",
    borderRadius: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
  },
}));

const Hero = ({ className, ...rest }: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <div className={className} {...rest}>
      <Grid container spacing={4} direction={isMd ? "row" : "column-reverse"}>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
        >
          <SectionHeader
            title={
              <span>
                Beautiful diving schedule
                <br />
                <Typography component="span" variant="inherit" color="primary">
                  built for SCUBA divers.
                </Typography>
              </span>
            }
            subtitle="Divers from around the world use our application to book and keep track of their diving schedules, to save time and money."
            ctaGroup={[
              <Button
                onClick={() => {
                  history.push("/dashboard");
                }}
                variant="contained"
                color="primary"
                size="large"
              >
                Start now
              </Button>,
              <Button
                onClick={() => {
                  history.push("/dashboard");
                }}
                variant="outlined"
                color="primary"
                size="large"
              >
                Learn more
              </Button>,
            ]}
            align="left"
            disableGutter
            titleVariant="h3"
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={6}
          data-aos={"fade-up"}
        >
          <Image
            src="https://assets.maccarianagency.com/the-front/illustrations/dashboard-screenshot.jpg"
            alt="TheFront Company"
            className={classes.image}
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Hero;
