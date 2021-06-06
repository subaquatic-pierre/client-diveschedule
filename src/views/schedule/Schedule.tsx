import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Grid, Container } from "@material-ui/core";
import { formatDate } from "../../utils/date";

// components
import Page from "../../components/Page";
import HeaderDashboard from "../../components/HeaderDashboard";
import LoadingScreen from "../../components/LoadingScreen";
import { ScheduleTable } from "../../components/schedule/table/ScheduleTable";
import { ScheduleInfoBar } from "../../components/schedule/ScheduleInfoBar";

// paths
import { PATH_DASHBOARD } from "../../routes/paths";

// graphql
import { DAILY_ACTIVITY_META, BookingMeta } from "../../graphql/schedule";

export const ActivityMeta = React.createContext(() => {});

export default function Schedule() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [getData, { data, loading, refetch }] = useLazyQuery(
    DAILY_ACTIVITY_META,
    {
      variables: { date: formatDate(new Date(selectedDate), "server") },
    }
  );

  const getActivityId = (
    activityMeta: BookingMeta[],
    activityType: string
  ): string => {
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

  useEffect(() => {
    if (selectedDate) {
      getData();
    }
  }, [selectedDate, getData]);

  if (loading) return <LoadingScreen />;

  return (
    <ActivityMeta.Provider value={refetch}>
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

          {data && data.dailyActivityMeta && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ScheduleTable
                  activityId={getActivityId(data.dailyActivityMeta, "AM_BOAT")}
                  tableType="AM_BOAT"
                  date={selectedDate}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ScheduleTable
                  activityId={getActivityId(data.dailyActivityMeta, "PM_BOAT")}
                  tableType="PM_BOAT"
                  date={selectedDate}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ScheduleTable
                  activityId={getActivityId(data.dailyActivityMeta, "POOL")}
                  tableType="POOL"
                  date={selectedDate}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ScheduleTable
                  activityId={getActivityId(data.dailyActivityMeta, "SHORE")}
                  tableType="SHORE"
                  date={selectedDate}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ScheduleTable
                  activityId={getActivityId(data.dailyActivityMeta, "CLASS")}
                  tableType="CLASS"
                  date={selectedDate}
                />
              </Grid>
            </Grid>
          )}
        </Container>
      </Page>
    </ActivityMeta.Provider>
  );
}
