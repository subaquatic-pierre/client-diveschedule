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
  const [editDiverModalOpen, setEditDiverModalOpen] = React.useState(false);

  const [{ data: activityMeta, loading }, setActivityMeta] = useFetchStatus<
    BookingMeta[]
  >();
  const { getDailyActivityMeta } = ScheduleController.getControls(client);

  const { data: dayData, loading: loadingDay, refetch: refetchDay } = useQuery(
    GET_DAY,
    {
      variables: { date: formatDate(selectedDate, "server") },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  const handleOpenEditDiverModal = () => {
    setEditDiverModalOpen(true);
  };

  const isDayReady = (): boolean => {
    if (loadingDay) return false;
    try {
      if (dayData.day.__typename === "AnonDayType") {
        return false;
      }
      return true;
    } catch {
      console.log("There was an error with the day");
      return false;
    }
  };

  const getDay = (): IDay => dayData.day;

  const getTripTime = (tableType: string): string | undefined => {
    switch (tableType) {
      case "AM_BOAT":
        return "9am";
      case "PM_BOAT":
        return "1:30pm";
      default:
        return undefined;
    }
  };

  const getTripDetail = (tableType: string): ActivityDetail => {
    const blankTripDetail: ActivityDetail = {
      id: -1,
      time: getTripTime(tableType),
      day: { date: selectedDate },
      bookingSet: [] as Booking[],
      activityType: tableType,
    };
    if (!isDayReady()) return blankTripDetail;
    const day = getDay();
    const activityDetail = day.activitydetailSet?.filter(
      (trip: ActivityDetail) => trip.activityType === tableType
    );
    if (activityDetail && activityDetail.length === 0) return blankTripDetail;
    if (activityDetail) return activityDetail[0];
  };

  React.useEffect(() => {
    refetchDay({ date: formatDate(selectedDate, "server") });
  }, [selectedDate, refetchDay]);

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
            handleOpenEditDiverModal={handleOpenEditDiverModal}
            editDiverModalOpen={editDiverModalOpen}
            selectedDate={selectedDate}
            setSelectedDate={handleSetSelectedDate}
          />
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <ScheduleTable
              diveTripDetail={getTripDetail("AM_BOAT")}
              tableType="AM_BOAT"
              date={selectedDate}
              loading={loadingDay}
              handleOpenEditDiverModal={handleOpenEditDiverModal}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ScheduleTable
              diveTripDetail={getTripDetail("PM_BOAT")}
              tableType="PM_BOAT"
              date={selectedDate}
              loading={loadingDay}
              handleOpenEditDiverModal={handleOpenEditDiverModal}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ScheduleTable
              diveTripDetail={getTripDetail("POOL")}
              tableType="POOL"
              date={selectedDate}
              loading={loadingDay}
              handleOpenEditDiverModal={handleOpenEditDiverModal}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ScheduleTable
              diveTripDetail={getTripDetail("SHORE")}
              tableType="SHORE"
              date={selectedDate}
              loading={loadingDay}
              handleOpenEditDiverModal={handleOpenEditDiverModal}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <ScheduleTable
              diveTripDetail={getTripDetail("CLASS")}
              tableType="CLASS"
              date={selectedDate}
              loading={loadingDay}
              handleOpenEditDiverModal={handleOpenEditDiverModal}
              activityID={
                activityMeta && activityMeta.length > 0 && activityMeta[0].id
              }
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
