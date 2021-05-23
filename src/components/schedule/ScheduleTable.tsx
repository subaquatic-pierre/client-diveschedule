import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableContainer, Box, Card } from "@material-ui/core";

import { ScheduleTableLoading } from "./ScheduleTableLoading";
import { ScheduleTableHead } from "./ScheduleTableHead";
import { ScheduleTableToolbar } from "./ScheduleTableToolbar";
import { ScheduleTableRow } from "./ScheduleTableRow";
import { ScheduleTableGuideRow } from "./ScheduleTableGuideRow";
import { ScheduleTableEditRow } from "./ScheduleTableEditRow";
import { getHeadFields } from "./utils";

import { EDIT_BOOKING, CREATE_BOOKING, DELETE_BOOKING } from "./mutations";
import { IBooking, IDiveTripDetail } from "../../views/Schedule/schedule";
import { useBaseMutation } from "../../hooks/baseMutation";

const useStyles = makeStyles((theme) => ({
  boatTableContainer: {
    minHeight: 700,
  },
  shoreContainer: {
    minHeight: 400,
  },
  loading: {
    width: 300,
  },
}));

interface IScheduleTableProps {
  diveTripDetail: IDiveTripDetail;
  loading: boolean;
  date: Date;
  tableType: string;
  handleOpenEditDiverModal: () => void;
}

export const ScheduleTable: React.FC<IScheduleTableProps> = ({
  loading,
  diveTripDetail,
  date,
  tableType,
  handleOpenEditDiverModal,
}) => {
  const classes = useStyles();
  const { bookingSet: bookings } = diveTripDetail;

  // Hooks
  const { mutation: deleteBooking } = useBaseMutation(DELETE_BOOKING);
  const { mutation: editBooking } = useBaseMutation(EDIT_BOOKING);
  const { mutation: createBooking } = useBaseMutation(CREATE_BOOKING);

  const [selected, setSelected] = React.useState<number[]>([]);
  const [creatingBooking, setCreatingBooking] = React.useState<boolean>(false);
  const [editingBookingId, setEditingBookingId] = React.useState(-1);

  const handleDeleteBooking = (): void => {
    deleteBooking({
      variables: { ids: selected },
    });
  };

  const handleCreateBooking = (data: any): void => {
    createBooking({
      variables: data,
    });
  };

  const handleEditBooking = (data: any): void => {
    editBooking({
      variables: data,
    });
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
    setEditingBookingId(-1);
    setCreatingBooking(false);
  };

  const isBoatTrip = tableType === "AM_BOAT" || tableType === "PM_BOAT";

  return (
    <Box dir="ltr">
      <Card>
        <ScheduleTableToolbar
          tableType={tableType}
          diveTripDetail={diveTripDetail}
          deleteBooking={handleDeleteBooking}
          numSelected={selected.length}
          showCreateBookingRow={showCreateBookingRow}
          showAddBooking={!creatingBooking && editingBookingId === -1}
        />

        <TableContainer
          className={
            isBoatTrip ? classes.boatTableContainer : classes.shoreContainer
          }
        >
          <Table
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <ScheduleTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={bookings.length}
              headFields={getHeadFields(tableType)}
            />
            {loading ? (
              <ScheduleTableLoading
                numCol={getHeadFields(tableType).length + 2}
              />
            ) : (
              <TableBody>
                {bookings.map((bookingData: IBooking, index) => {
                  if (bookingData.id === editingBookingId) {
                    return (
                      <ScheduleTableEditRow
                        key={index}
                        bookingData={bookingData}
                        editBooking={handleEditBooking}
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
                {isBoatTrip &&
                  diveTripDetail.diveGuides?.map((guide, index) => (
                    <ScheduleTableGuideRow
                      key={index}
                      profile={guide.profile}
                    />
                  ))}
                {creatingBooking && editingBookingId === -1 && (
                  <ScheduleTableEditRow
                    handleOpenEditDiverModal={handleOpenEditDiverModal}
                    date={date}
                    tableType={tableType}
                    createBooking={handleCreateBooking}
                    cancelEditingBooking={cancelEditingBooking}
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
