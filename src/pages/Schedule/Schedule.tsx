import React from "react";
import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { formatDate } from "../../utils/date";

import { IBooking, IDay, IDiveTripDetail } from "./schedule";
import { ScheduleTable } from "../../components/ScheduleTable";
import { ScheduleInfoBar } from "../../components/SchduleInfoBar/ScheduleInfoBar";
import { EditDiverModal } from "../../components/EditDiverModal";

import { GET_DAY } from "./queries";

export const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [editDiverModalOpen, setEditDiverModalOpen] = React.useState(false);
  const { data: dayData, loading: loadingDay, refetch: refetchDay } = useQuery(
    GET_DAY,
    {
      variables: { date: formatDate(selectedDate, "server") },
      onError: (error) => {
        console.log(error.message);
      }
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
      tripType: tableType
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
    <>
      <Grid container spacing={2} xl>
        <Grid item xs={12}>
          <ScheduleInfoBar
            handleOpenEditDiverModal={handleOpenEditDiverModal}
            editDiverModalOpen={editDiverModalOpen}
            selectedDate={selectedDate}
            setSelectedDate={handleSetSelectedDate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <ScheduleTable
            diveTripDetail={getTripDetail("AM_BOAT")}
            tableType="AM_BOAT"
            date={selectedDate}
            loading={loadingDay}
            handleOpenEditDiverModal={handleOpenEditDiverModal}
          />
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
          <ScheduleTable
            diveTripDetail={getTripDetail("SHORE")}
            tableType="SHORE"
            date={selectedDate}
            loading={loadingDay}
            handleOpenEditDiverModal={handleOpenEditDiverModal}
          />
          <ScheduleTable
            diveTripDetail={getTripDetail("CLASS")}
            tableType="CLASS"
            date={selectedDate}
            loading={loadingDay}
            handleOpenEditDiverModal={handleOpenEditDiverModal}
          />
        </Grid>
      </Grid>
      <EditDiverModal
        open={editDiverModalOpen}
        handleClose={handleCloseEditDiverModal}
      />
    </>
  );
};
