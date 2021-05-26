// material
import { Container, Grid } from "@material-ui/core";
// hooks
import useAuth from "../hooks/useAuth";
// components
import Page from "../components/Page";
import {
  AppWelcome,
  AppFeatured,
  AppPlaceHolder,
} from "../components/general/app";
import AppTest from "../components/general/app/AppTest";

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();

  return (
    <Page title="Dashboard: App | DiveSchedule">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <AppWelcome displayName={user.profile.fullName} />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppFeatured />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppTest />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppPlaceHolder />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppPlaceHolder />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppPlaceHolder />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppPlaceHolder />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppPlaceHolder />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppPlaceHolder />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppPlaceHolder />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
