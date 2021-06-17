import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { SectionHeader } from "../../../../components/molecules";
import { CardBase } from "../../../../components/organisms";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  cardBase: {
    background: theme.palette.primary.main,
    [theme.breakpoints.up("md")]: {
      background: `url(https://assets.maccarianagency.com/the-front/illustrations/newsletter-bg.svg) no-repeat 150% 50% ${theme.palette.primary.dark}`,
    },
  },
  textWhite: {
    color: "white",
  },
  sectionHeader: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "60%",
    },
  },
}));

const Subscription = ({
  className,
  ...rest
}: ViewComponentProps): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={className} {...rest}>
      <CardBase
        variant="outlined"
        liftUp
        className={classes.cardBase}
        align="left"
        data-aos="fade-up"
      >
        <SectionHeader
          title={
            <span className={classes.textWhite}>
              Get the Dive Schedule and save your time.
            </span>
          }
          subtitle={
            <span className={classes.textWhite}>
              Don't miss out on the best dive scheduling application available.
            </span>
          }
          fadeUp
          align="left"
          ctaGroup={[
            <Button
              onClick={() => history.push("/dashboard")}
              variant="contained"
              size="large"
            >
              Sign up now!
            </Button>,
          ]}
          disableGutter
          className={classes.sectionHeader}
        />
      </CardBase>
    </div>
  );
};

export default Subscription;
