import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Grid } from "@material-ui/core";
import { LearnMoreLink, Image } from "../../../../components/atoms";
import { SectionHeader } from "../../../../components/molecules";
import { CardBase } from "../../../../components/organisms";

const useStyles = makeStyles(() => ({
  logo: {
    maxWidth: 50,
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
}));

const Partners = ({
  data,
  className,
  ...rest
}: ViewComponentProps): JSX.Element => {
  const classes = useStyles();

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <div className={clsx(className, classes.flex)} {...rest}>
      <Grid container spacing={isMd ? 4 : 2}>
        <Grid item xs={12} md={6} className={classes.flex} data-aos="fade-up">
          <SectionHeader
            title="We love to explore new ways to engage with new features"
            subtitle="Our mission is to help you to grow your diving skills, meet and connect with other divers and share your passions."
            align="left"
            disableGutter
          />
        </Grid>
        <Grid item xs={12} md={6} data-aos="fade-up">
          <Grid container spacing={2}>
            {data.map((item: any, index: number) => (
              <Grid item xs={4} key={index}>
                <CardBase withShadow liftUp>
                  <Image
                    src={item.logo}
                    alt={item.name}
                    className={classes.logo}
                    lazy={false}
                  />
                </CardBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Partners;
