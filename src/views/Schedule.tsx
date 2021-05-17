import React from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Card, Button, Container } from "@material-ui/core";
// redux
// routes
import { PATH_DASHBOARD } from "../routes/paths";
// components
import Page from "../components/Page";
import HeaderDashboard from "../components/HeaderDashboard";

// ----------------------------------------------------------------------

export default function Schedule() {
  return (
    <Page title="Schedule | Minimal-UI">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Schedule"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Schedule" },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
            >
              New Event
            </Button>
          }
        />

        <Card>
          <div>Cool Schedule</div>
        </Card>
      </Container>
    </Page>
  );
}
