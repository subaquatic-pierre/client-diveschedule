import React, { useEffect, useState } from "react";
import { PATH_DASHBOARD } from "../../routes/paths";
import { useApolloClient, useQuery } from "@apollo/client";
import { Grid, Container } from "@material-ui/core";
import { formatDate } from "../../utils/date";

// components
import Page from "../../components/Page";
import HeaderDashboard from "../../components/HeaderDashboard";
import { Booking, IDay, ActivityDetail } from "../../@types/schedule";

// schedule components
import { ScheduleTable } from "../../components/schedule/table/ScheduleTable";
import { ScheduleInfoBar } from "../../components/schedule/ScheduleInfoBar";

import { GET_DAY } from "../../controllers/schedule/queries";
import { BookingMeta } from "../../controllers/schedule/types";
import useFetchStatus from "../../hooks/useFetchStatus";
import { ScheduleController } from "../../controllers/schedule";
import LoadingScreen from "../../components/LoadingScreen";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const client = useApolloClient();

  const [{ data: activityMeta, loading }, setActivityMeta] = useFetchStatus<
    BookingMeta[]
  >([]);
  const { getDailyActivityMeta } = ScheduleController.getControls(client);

  const getActivityId = (activityType: string): string => {
    const activity = activityMeta.find(
      (activity) => activity.activityType === activityType
    );
    if (activity !== undefined) {
      return activity.id.toString();
    } else {
      return "-1";
    }
  };

  const handleSetSelectedDate = (event: any) => {
    localStorage.setItem("currentDay", event);
    setSelectedDate(event);
  };

  React.useEffect(() => {
    const currentDay = localStorage.getItem("currentDay");
    if (currentDay) {
      const date = new Date(currentDay);
      setSelectedDate(date);
    }
  }, []);

  // Use schedule controller to get all activities for the day
  useEffect(() => {
    getDailyActivityMeta(
      formatDate(new Date(selectedDate), "server"),
      setActivityMeta
    );
  }, [selectedDate]);

  if (loading) return <LoadingScreen />;

  return (
    <Page title="Schedule | DiveSchedule">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Schedule"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Schedule" },
          ]}
        />

        <Grid item xs={12}>
          <ScheduleInfoBar
            selectedDate={selectedDate}
            setSelectedDate={handleSetSelectedDate}
          />
        </Grid>

        {!loading && activityMeta && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <ScheduleTable
                activityId={getActivityId("AM_BOAT")}
                tableType="AM_BOAT"
                date={selectedDate}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ScheduleTable
                activityId={getActivityId("PM_BOAT")}
                tableType="PM_BOAT"
                date={selectedDate}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ScheduleTable
                activityId={getActivityId("POOL")}
                tableType="POOL"
                date={selectedDate}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ScheduleTable
                activityId={getActivityId("SHORE")}
                tableType="SHORE"
                date={selectedDate}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ScheduleTable
                activityId={getActivityId("CLASS")}
                tableType="CLASS"
                date={selectedDate}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
