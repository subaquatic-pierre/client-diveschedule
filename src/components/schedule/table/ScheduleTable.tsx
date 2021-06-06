import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import { Table, TableBody, TableContainer, Box, Card } from "@material-ui/core";

import { ScheduleTableLoading } from "./ScheduleTableLoading";
import { ScheduleTableHead } from "./ScheduleTableHead";
import { ScheduleTableToolbar } from "./ScheduleTableToolbar";
import { ScheduleTableRow } from "./ScheduleTableRow";
import { ScheduleTableGuideRow } from "./ScheduleTableGuideRow";
import { ScheduleTableEditRow } from "./ScheduleTableEditRow";
import { getHeadFields } from "../utils";

import { Booking, ActivityDetail } from "../../../@types/schedule";

import { ACTIVITY_DATA, DELETE_BOOKINGS } from "../../../graphql/schedule";
import useBaseMutation from "../../../hooks/useBaseMutation";
import { messageController } from "../../../controllers/messages";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minHeight: 700,
  },
  loading: {
    width: 300,
  },
}));

const isBoatTrip = (activityType: string): boolean => {
  if (activityType === "AM_BOAT" || activityType === "PM_BOAT") {
    return true;
  }
  return false;
};

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

interface IScheduleTableProps {
  tableType: string;
  date: Date;
  activityId?: string;
}

export const ScheduleTable: React.FC<IScheduleTableProps> = ({
  tableType,
  date,
  activityId,
}) => {
  const blankActivityData: ActivityDetail = {
    id: -1,
    time: getTripTime(tableType),
    day: { date },
    bookingSet: [] as Booking[],
    activityType: tableType,
  };
  const classes = useStyles();
  const [selected, setSelected] = React.useState<number[]>([]);
  const [creatingBooking, setCreatingBooking] = React.useState<boolean>(false);
  const [editingBookingId, setEditingBookingId] = React.useState(-1);

  const client = useApolloClient();
  const { setError } = messageController(client);

  // Data state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activity, setActivity] = useState<ActivityDetail>(blankActivityData);
  const [getData, { data, loading, refetch, called }] = useLazyQuery(
    ACTIVITY_DATA,
    {
      onError: (error: any) => {
        setError(error.message);
      },
    }
  );

  const { mutation: deleteBookings } = useBaseMutation(DELETE_BOOKINGS, {
    onCompleted: (data: any) => {
      refetch();
      setSelected([]);
    },
  });

  const handleDeleteBookings = () => {
    deleteBookings({ variables: { ids: selected } });
  };

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      const newSelected: number[] = bookings.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (id: number): void => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const showCreateBookingRow = () => {
    setCreatingBooking(true);
  };

  const cancelEditingBooking = () => {
    setCreatingBooking(false);
  };

  // Get table data, populate booking array or set blank
  useEffect(() => {
    if (activityId === "-1") {
      setActivity(blankActivityData);
      setBookings([]);
    } else {
      getData({ variables: { activityId } });
      if (data) {
        setActivity(data.activityData);
        setBookings(data.activityData.bookingSet);
      }
    }
  }, [activityId, data]);

  return (
    <Box dir="ltr">
      <Card>
        <ScheduleTableToolbar
          tableType={activity.activityType}
          diveTripDetail={activity}
          numSelected={selected.length}
          showCreateBookingRow={showCreateBookingRow}
          showAddBooking={!creatingBooking && editingBookingId === -1}
          deleteBookings={handleDeleteBookings}
        />

        <TableContainer className={classes.tableContainer}>
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <ScheduleTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={bookings.length}
              headFields={getHeadFields(activity.activityType)}
            />
            {loading ? (
              <ScheduleTableLoading
                numCol={getHeadFields(activity.activityType).length + 2}
              />
            ) : (
              <TableBody sx={{ minHeight: "400px" }}>
                {bookings.map((bookingData: Booking, index) => {
                  if (bookingData.id === editingBookingId) {
                    return (
                      <ScheduleTableEditRow
                        key={index}
                        bookingData={bookingData}
                        cancelEditingBooking={cancelEditingBooking}
                      />
                    );
                  }
                  return (
                    <ScheduleTableRow
                      key={index}
                      bookingData={bookingData}
                      setEditingBookingId={setEditingBookingId}
                      handleSelectClick={handleSelectClick}
                      selected={selected}
                    />
                  );
                })}
                {isBoatTrip(activity.activityType) &&
                  activity.diveGuides?.map((guide, index) => (
                    <ScheduleTableGuideRow
                      key={index}
                      profile={guide.profile}
                    />
                  ))}
                {creatingBooking && editingBookingId === -1 && (
                  <ScheduleTableEditRow
                    date={date}
                    tableType={activity.activityType}
                    cancelEditingBooking={cancelEditingBooking}
                    refetchBookings={refetch}
                    fetchBookingDataCalled={called}
                  />
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};
