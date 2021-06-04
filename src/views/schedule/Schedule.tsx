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

export default function Schedule() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [activityMeta, setActivityMeta] = useState<BookingMeta[]>([]);
  const [getData, { loading }] = useLazyQuery(DAILY_ACTIVITY_META, {
    variables: { date: formatDate(new Date(selectedDate), "server") },
    onCompleted: (data: any) => {
      setActivityMeta(data.dailyActivityMeta);
    },
  });

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

  useEffect(() => {
    if (selectedDate) {
      getData();
    }
  }, [selectedDate, getData]);

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

        {activityMeta && (
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
