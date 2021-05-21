import { useEffect } from "react";
// material
import { Container, Grid, Skeleton } from "@material-ui/core";
// redux
import { getUsers, initialState } from "../cache/controllers/user";
// routes
import { PATH_DASHBOARD } from "../routes/paths";
// components
import Page from "../components/Page";
import { UserCard } from "../components/user/cards";
import HeaderDashboard from "../components/HeaderDashboard";

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(8)].map((item, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: "115%", borderRadius: 2 }}
        />
      </Grid>
    ))}
  </>
);

export default function UserCards() {
  const { users } = initialState;

  useEffect(() => {
    getUsers();
  });

  return (
    <Page title="User: Cards | DiveSchedule">
      <Container>
        <HeaderDashboard
          heading="User Cards"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "User", href: PATH_DASHBOARD.user.root },
            { name: "Cards" },
          ]}
        />
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid key={user.id} item xs={12} sm={6} md={4}>
              <UserCard user={user} />
            </Grid>
          ))}

          {!users.length && SkeletonLoad}
        </Grid>
      </Container>
    </Page>
  );
}
