import React, { useContext } from "react";
import { makeStyles, TextField } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import DoneIcon from "@material-ui/icons/Done";
import TableRow from "@material-ui/core/TableRow";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";

import { UserSearchInput } from "../UserSearchInput";
import { Booking, IUser } from "../../../@types/schedule";
import { useFormData, IFormData } from "../hooks";
import { buildCreateBookingData } from "../utils";
import useBaseMutation from "../../../hooks/useBaseMutation";

import { ActivityMeta } from "../../../views/schedule/Schedule";
import { CREATE_BOOKING } from "../../../graphql/schedule";

const useStyles = makeStyles((theme) => ({
  saveButton: {
    color: "#6CA468",
    "&:hover": {
      cursor: "pointer",
    },
  },
  cancelButton: {
    color: "#d11a2a",
    "&:hover": {
      cursor: "pointer",
    },
  },
  row: {
    "& .MuiTableCell-root": {
      minWidth: "100px",
    },
  },
}));

interface IScheduleTableEditRowProps {
  tableType?: string;
  date?: Date;
  cancelEditingBooking?: () => void;
  bookingData?: Booking;
  refetchBookings?: () => void;
  fetchBookingDataCalled?: boolean;
}

export const ScheduleTableEditRow: React.FC<IScheduleTableEditRowProps> = ({
  tableType,
  date,
  cancelEditingBooking,
  bookingData,
  refetchBookings,
  fetchBookingDataCalled,
}) => {
  const [user, setUser] = React.useState<IUser>();
  const [instructor, setInstructor] = React.useState<IUser>();
  const classes = useStyles();
  const [formData, setFormData] = useFormData(bookingData);
  const isBoatBooking = tableType === "AM_BOAT" || tableType === "PM_BOAT";
  const refetchMeta = useContext(ActivityMeta);

  const { mutation: createBooking } = useBaseMutation(CREATE_BOOKING, {
    onCompleted: (data: any) => {
      if (fetchBookingDataCalled) {
        refetchBookings();
      } else {
        refetchMeta();
      }
      cancelEditingBooking();
    },
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((oldState: IFormData) => {
      console.log(oldState);
      return {
        ...oldState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const isValidBookingData = (data: IFormData) => {
    for (const prop in data) {
      if (prop === "bookingId") continue;
      if (prop === "time") continue;
      if (prop === "instructorName") continue;
      if (data[prop] === "") {
        return false;
      }
    }
    return true;
  };

  const handleSaveBooking = () => {
    if (isValidBookingData(formData)) {
      const createBookingData = buildCreateBookingData(
        formData,
        tableType as string,
        date as Date
      );
      createBooking({ variables: createBookingData });
    }
  };

  const handleEnterKeyUp = (event: any) => {
    const data = formData;
    if (
      isValidBookingData(data) &&
      event.target.id !== "user" &&
      event.key === "Enter"
    ) {
      handleSaveBooking();
    }
  };

  React.useEffect(() => {
    setFormData((oldData) => {
      if (user) {
        return {
          ...oldData,
          userId: user?.id,
          certLevel: user.profile.certLevel,
          equipment: user.profile.equipment,
          fullName: user?.profile?.fullName,
          instructorId: instructor?.id,
        };
      }
      return { ...oldData };
    });
  }, [user, instructor]);

  return (
    <TableRow className={classes.row}>
      <TableCell padding="checkbox">
        <Tooltip title="Cancel">
          <CancelIcon
            className={classes.cancelButton}
            onClick={cancelEditingBooking}
          />
        </Tooltip>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        style={{ minWidth: "200px" }}
        padding="none"
      >
        <UserSearchInput autoFocus size="small" setObject={setUser as any} />
      </TableCell>
      <TableCell style={{ maxWidth: "100px" }} align="right">
        <TextField
          size="small"
          variant="outlined"
          value={formData.diverRole}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleFormChange(event)
          }
          onKeyUp={(event: React.KeyboardEvent) => handleEnterKeyUp(event)}
          name="diverRole"
        >
          {formData.diverRole}
        </TextField>
      </TableCell>
      {isBoatBooking ? (
        <TableCell style={{ maxWidth: "100px" }} align="right">
          <TextField
            size="small"
            variant="outlined"
            value={formData.certLevel}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(event)
            }
            onKeyUp={(event: React.KeyboardEvent) => handleEnterKeyUp(event)}
            name="certLevel"
          >
            {formData.certLevel}
          </TextField>
        </TableCell>
      ) : (
        <TableCell style={{ minWidth: "200px" }} align="right">
          <UserSearchInput
            elementName="instructorName"
            autoFocus={false}
            label="Instructor Name"
            setObject={setInstructor as any}
          />
        </TableCell>
      )}
      <TableCell style={{ maxWidth: "100px" }} align="right">
        <TextField
          size="small"
          variant="outlined"
          value={formData.equipment}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleFormChange(event)
          }
          onKeyUp={(event: React.KeyboardEvent) => handleEnterKeyUp(event)}
          name="equipment"
        >
          {formData.equipment}
        </TextField>
      </TableCell>
      {!isBoatBooking && (
        <TableCell style={{ maxWidth: "100px" }} align="right">
          <TextField
            size="small"
            variant="outlined"
            value={formData.time}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(event)
            }
            onKeyUp={(event: React.KeyboardEvent) => handleEnterKeyUp(event)}
            name="time"
          >
            {formData.time}
          </TextField>
        </TableCell>
      )}
      <TableCell style={{ maxWidth: "100px" }} align="right">
        <Tooltip title="Save">
          <DoneIcon
            className={classes.saveButton}
            onClick={handleSaveBooking}
          />
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
