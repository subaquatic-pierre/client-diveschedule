import React, { useContext, useState } from "react";
import {
  makeStyles,
  TextField,
  TableCell,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";

import { UserSearchInput } from "../UserSearchInput";
import { Booking } from "../../../@types/schedule";
import { User } from "../../../@types/user";
import { buildForm } from "../../../utils/buildFormData";
import { formatDate } from "../../../utils/formatDate";
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

interface IForm {
  diverRole: string;
  equipment: string;
  userId?: string;
  activityType?: string;
  date?: string;
  time?: string;
  instructorId?: string;
  fullName?: string;
  certLevel?: string;
  instructorName?: string;
}

const initialFormData: IForm = {
  diverRole: "",
  activityType: "",
  date: "",
  userId: "",
  fullName: "",
  equipment: "",
  instructorId: undefined,
  instructorName: undefined,
  time: "",
  certLevel: "",
};

const getBookingData = (bookingData: Booking): IForm => {
  const {
    diverRole,
    equipment,
    diver: {
      id,
      profile: { fullName, certLevel },
    },
    instructor: {
      profile: { fullName: instructorName },
    },
  } = bookingData as any;
  const data = buildForm<IForm>(initialFormData, {
    userId: id,
    instructorName,
    fullName,
    diverRole,
    equipment,
    certLevel,
  });
  return data;
};

interface IProps {
  tableType?: string;
  date?: Date;
  cancelEditingBooking?: () => void;
  bookingData?: Booking;
  refetchBookings?: () => void;
  fetchBookingDataCalled?: boolean;
}

export const EditRow: React.FC<IProps> = ({
  tableType,
  date,
  cancelEditingBooking,
  bookingData,
  refetchBookings,
  fetchBookingDataCalled,
}) => {
  const initForm = bookingData ? getBookingData(bookingData) : initialFormData;
  const [user, setUser] = React.useState<User>();
  const [instructor, setInstructor] = useState<User>();
  const classes = useStyles();
  const [formData, setFormData] = useState(initForm);
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
    setFormData((oldState: IForm) => {
      return {
        ...oldState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const isValidBookingData = (data: IForm) => {
    for (const prop in data) {
      if (prop === "bookingId") continue;
      if (prop === "time") continue;
      if (prop === "instructorName") continue;
      // if (data[prop] === "") {
      //   return false;
      // }
    }
    return true;
  };

  const handleSaveBooking = () => {
    if (isValidBookingData(formData)) {
      // Format values for correct backend values
      const createBookingData = buildForm<IForm>(initialFormData, {
        ...formData,
        instructorId: instructor ? parseInt(instructor.id) : -1,
        userId: parseInt(user.id),
        activityType: tableType,
        date: formatDate(date, "server"),
      });
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
