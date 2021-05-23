import React from "react";
import { Icon } from "@iconify/react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { PATH_DASHBOARD } from "../../routes/paths";
import { useQuery } from "@apollo/client";
import { Grid, Card, Button, Container } from "@material-ui/core";
import { formatDate } from "../../utils/date";

// components
import Page from "../../components/Page";
import HeaderDashboard from "../../components/HeaderDashboard";
import { IBooking, IDay, IDiveTripDetail } from "./schedule";
import { ScheduleTable } from "../../components/schedule/ScheduleTable";
import { ScheduleInfoBar } from "../../components/schedule/ScheduleInfoBar";
import { EditDiverModal } from "../../components/schedule/EditDiverModal";

import { GET_DAY } from "./queries";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [editDiverModalOpen, setEditDiverModalOpen] = React.useState(false);
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

  const handleCloseEditDiverModal = () => {
    setEditDiverModalOpen(false);
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

  const getTripDetail = (tableType: string): IDiveTripDetail => {
    const blankTripDetail: IDiveTripDetail = {
      id: -1,
      time: getTripTime(tableType),
      day: { date: selectedDate },
      bookingSet: [] as IBooking[],
      tripType: tableType,
    };
    if (!isDayReady()) return blankTripDetail;
    const day = getDay();
    const tripDetail = day.tripdetailSet?.filter(
      (trip: IDiveTripDetail) => trip.tripType === tableType
    );
    if (tripDetail && tripDetail.length === 0) return blankTripDetail;
    if (tripDetail) return tripDetail[0];
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

  return (
    <Page title="Schedule | DiveSchedule">
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
            />
          </Grid>

          <EditDiverModal
            open={editDiverModalOpen}
            handleClose={handleCloseEditDiverModal}
          />
        </Grid>
      </Container>
    </Page>
  );
}
