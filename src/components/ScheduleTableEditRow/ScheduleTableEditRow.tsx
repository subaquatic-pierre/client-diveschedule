import React from "react";
import { makeStyles } from "@material-ui/core";

import TableCell from "@material-ui/core/TableCell";
import DoneIcon from "@material-ui/icons/Done";
import TableRow from "@material-ui/core/TableRow";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
import { TextField } from "@material-ui/core";

import { SEARCH_USERS } from "./queries";
import { AutoCompleteSearch } from "../AutoCompleteSearch";
import { IBooking, IUser } from "../../pages/Schedule/schedule";
import { useFormData, IFormData } from "./hooks";
import {
  ICreateBooking,
  IEditBooking,
  buildEditBookingData,
  buildCreateBookingData,
  getUser,
  getUserOptions,
} from "./utils";

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
  editBooking?: (data: IEditBooking) => void;
  createBooking?: (data: ICreateBooking) => void;
  cancelEditingBooking?: () => void;
  bookingData?: IBooking;
  handleOpenEditDiverModal?: () => void;
}

export const ScheduleTableEditRow: React.FC<IScheduleTableEditRowProps> = ({
  tableType,
  date,
  editBooking,
  createBooking,
  cancelEditingBooking,
  handleOpenEditDiverModal,
  bookingData,
}) => {
  const [user, setUser] = React.useState<IUser>();
  const [instructor, setInstructor] = React.useState<IUser>();
  const classes = useStyles();
  const [formData, setFormData] = useFormData(bookingData);
  const isBoatBooking = tableType === "AM_BOAT" || tableType === "PM_BOAT";

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((oldState: IFormData) => {
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
      if (editBooking && bookingData) {
        const editBookingData = buildEditBookingData(formData, bookingData);
        editBooking(editBookingData);
      } else if (createBooking) {
        const createBookingData = buildCreateBookingData(
          formData,
          tableType as string,
          date as Date
        );
        createBooking(createBookingData);
      }
    } else {
      console.warn("Booking data is invalid: ", formData);
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
          certificationLevel: user.profile.certificationLevel,
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
        <AutoCompleteSearch
          name="user"
          label="Full Name"
          handleOpenEditDiverModal={handleOpenEditDiverModal}
          setObject={setUser}
          getObject={getUser}
          getOptions={getUserOptions}
          createObjectPlaceholder="Create User"
          queryFieldName="fullName"
          gqlQuery={SEARCH_USERS}
          autoFocus
        />
      </TableCell>
      <TableCell style={{ maxWidth: "100px" }} align="right">
        <TextField
          size="small"
          variant="outlined"
          value={formData.activity}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleFormChange(event)
          }
          onKeyUp={(event: React.KeyboardEvent) => handleEnterKeyUp(event)}
          name="activity"
        >
          {formData.activity}
        </TextField>
      </TableCell>
      {isBoatBooking ? (
        <TableCell style={{ maxWidth: "100px" }} align="right">
          <TextField
            size="small"
            variant="outlined"
            value={formData.certificationLevel}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(event)
            }
            onKeyUp={(event: React.KeyboardEvent) => handleEnterKeyUp(event)}
            name="certificationLevel"
          >
            {formData.certificationLevel}
          </TextField>
        </TableCell>
      ) : (
        <TableCell style={{ minWidth: "200px" }} align="right">
          <AutoCompleteSearch
            name="instructorName"
            label="Full Name"
            handleOpenEditDiverModal={handleOpenEditDiverModal}
            setObject={setInstructor}
            getObject={getUser}
            createObjectPlaceholder="Create User"
            getOptions={getUserOptions}
            queryFieldName="fullName"
            gqlQuery={SEARCH_USERS}
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
