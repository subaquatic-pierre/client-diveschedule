import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useApolloClient, useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router";
import { PATH_DASHBOARD } from "../../routes/paths";
import { Table, TableBody, TableContainer, Box, Card } from "@material-ui/core";

import { TableLoading } from "./TableLoading";
import { ScheduleTableHead } from "./ScheduleTableHead";
import { ScheduleTableToolbar } from "./ScheduleTableToolbar";
import { ScheduleTableRow } from "./ScheduleTableRow";
import { CreateBookingRow } from "./CreateBookingRow";
import { BlankRow } from "./BlankRow";
import { TableColFormat } from "./TableColFormat";
import {
  getHeadFields,
  isBoatTrip,
  getTripTime,
} from "../../utils/scheduleUtils";
import { TableInfo } from "./TableInfo";

import { Booking, ActivityDetail } from "../../@types/schedule";

import { ACTIVITY_DATA, DELETE_BOOKINGS } from "../../graphql/schedule";
import useBaseMutation from "../../hooks/useBaseMutation";
import { messageController } from "../../controllers/messages";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minHeight: 820,
    display: "flex",
    flexDirection: "column",
    "& .schedule-table": {
      "&__head-row": {
        "& .MuiTableCell-head": {
          "&:first-of-type": {
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
            boxShadow: "inset 0 0 0 #fff;",
          },
          "&:last-of-type": {
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            boxShadow: "inset 0 0 0 #fff;",
          },
        },
      },
      "&__row": {
        borderBottom: `0.5px solid ${theme.palette.grey[400]}`,
        height: "42px",
        "& :hover": {
          cursor: "pointer",
        },
      },
      "&__guide-row": {
        "&:not(:last-of-type)": {
          borderBottom: `0.5px solid ${theme.palette.grey[700]}`,
        },
        backgroundColor: "#FAFF88",
      },
      "&__first-cell": {
        borderRight: `0.5px solid ${theme.palette.grey[400]}`,
      },
    },
  },
}));

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
  const history = useHistory();
  const maxDivers = 13;

  const classes = useStyles();
  const [selected, setSelected] = useState<number[]>([]);
  const [creatingBooking, setCreatingBooking] = useState<boolean>(false);

  const client = useApolloClient();
  const { setError } = messageController(client);

  const blankActivityData: ActivityDetail = {
    id: -1,
    time: getTripTime(tableType),
    day: { date },
    bookingSet: [] as Booking[],
    activityType: tableType,
  };

  // Data state
  const [totalDivers, setTotalDivers] = useState(0);
  const [blankBookings, setBlankBookings] = useState([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activity, setActivity] = useState<ActivityDetail>(blankActivityData);

  // Data query
  const [getData, { data, loading, called }] = useLazyQuery(ACTIVITY_DATA, {
    onError: (error: any) => {
      setError(error.message);
    },
  });

  const { mutation: deleteBookings } = useBaseMutation(DELETE_BOOKINGS, {
    onCompleted: (data: any) => {
      setSelected([]);
    },
    refetchQueries: ["ActivityData", "DailyBookingMeta"],
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

  const editDiverClick = () => {
    const booking = bookings.filter((booking) => booking.id === selected[0])[0];
    const userId = booking.diver.id;
    history.push(PATH_DASHBOARD.user.root + "/edit/" + userId);
  };

  const cancelEditingBooking = () => {
    setCreatingBooking(false);
  };

  useEffect(() => {
    if (creatingBooking) {
      setSelected([]);
    }
  }, [creatingBooking]);

  useEffect(() => {
    // Set number of blank bookings
    let numBookings = bookings.length;
    const availableSpaces = maxDivers - numBookings;
    const tempBlankBookings = [];
    for (let i = 0; i < availableSpaces; i++) {
      numBookings += 1;
      tempBlankBookings.push(numBookings);
    }
    setBlankBookings(tempBlankBookings);

    // Set total number of divers
    if (data) {
      const { activityData } = data;
      const { diveGuides, bookingSet } = activityData;
      setTotalDivers(diveGuides.length + bookings.length);
      setBookings(bookingSet);
      setActivity(activityData);
    }
  }, [data, bookings.length]);

  // Update activity data on create new activity data
  useEffect(() => {
    if (activityId !== "-1") {
      getData({ variables: { activityId } });
    }
    if (data) {
      setActivity(data.activityData);
    }
  }, [activityId]);

  return (
    <Box dir="ltr">
      <Card>
        <ScheduleTableToolbar
          handleEditDiverClick={editDiverClick}
          tableType={tableType}
          activityDetail={activity}
          numSelected={selected.length}
          showCreateBookingRow={showCreateBookingRow}
          creatingBooking={creatingBooking}
          deleteBookings={handleDeleteBookings}
          cancelEditingBooking={cancelEditingBooking}
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
              <TableLoading
                numCol={getHeadFields(activity.activityType).length + 2}
              />
            ) : (
              <TableBody sx={{ minHeight: "400px" }}>
                <TableColFormat
                  isBoatTrip={isBoatTrip(activity.activityType)}
                />
                {bookings.map((bookingData: Booking, index) => {
                  return (
                    <ScheduleTableRow
                      key={index}
                      index={index}
                      bookingData={bookingData}
                      handleSelectClick={handleSelectClick}
                      selected={selected}
                    />
                  );
                })}
                {creatingBooking && (
                  <CreateBookingRow
                    date={date}
                    tableType={activity.activityType}
                    cancelEditingBooking={cancelEditingBooking}
                    fetchBookingDataCalled={called}
                  />
                )}
                {!creatingBooking &&
                  isBoatTrip(activity.activityType) &&
                  blankBookings.map((booking, index) => (
                    <BlankRow
                      key={index}
                      showCreateBookingRow={showCreateBookingRow}
                      bookingNumber={booking}
                    />
                  ))}
              </TableBody>
            )}
          </Table>
          {isBoatTrip(activity.activityType) && (
            <TableInfo activity={activity} totalDivers={totalDivers} />
          )}
        </TableContainer>
      </Card>
    </Box>
  );
};
