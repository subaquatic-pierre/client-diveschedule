import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { colors, Divider, Container } from "@material-ui/core";

import { experimentalStyled as styled } from "@material-ui/core/styles";
import Page from "../../components/Page";
import { Section, SectionAlternate } from "../../components/organisms";
import {
  Customization,
  Download,
  Hero,
  Hub,
  Partners,
  Pricings,
  Reviews,
  Support,
} from "./components";

import { reviews, support, integrations } from "./data";

const RootStyle = styled(Page)(({ theme }) => ({
  height: "100%",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  overflow: "hidden",
  position: "relative",
}));

const useStyles = makeStyles((theme) => ({
  pagePaddingTop: {
    paddingTop: theme.spacing(10),
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(12),
    },
  },
  sectionNoPaddingTop: {
    paddingTop: 0,
  },
  shape: {
    background: colors.grey[50],
    borderBottomRightRadius: "50%",
    borderBottom: `1px solid ${colors.grey[200]}`,
  },
}));

const AppLandingPage = (): JSX.Element => {
  const classes = useStyles();

  return (
    <RootStyle
      title="The starting point for your next project | DiveSchedule"
      id="move_top"
    >
      <Container maxWidth="xl">
        <div className={classes.shape}>
          <Section className={classes.pagePaddingTop}>
            <Hero />
          </Section>
          <Section className={classes.sectionNoPaddingTop}>
            <Reviews data={reviews} />
          </Section>
          <Section className={classes.sectionNoPaddingTop}>
            <Hub />
          </Section>
        </div>
        <ContentStyle>
          <Section narrow>
            <Support data={support} />
          </Section>
          <Section>
            <Partners data={integrations} />
          </Section>
          <SectionAlternate innerNarrowed>
            <Pricings />
          </SectionAlternate>
          <Section>
            <Download data={[]} />
          </Section>
          <Divider />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default AppLandingPage;
