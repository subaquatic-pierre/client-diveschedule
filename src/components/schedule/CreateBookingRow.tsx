import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";

import { UserSearchInput } from "./UserSearchInput";
import { User } from "../../@types/user";
import { buildForm } from "../../utils/buildFormData";
import { formatDate } from "../../utils/formatDate";
import useBaseMutation from "../../hooks/useBaseMutation";

import { CREATE_BOOKING } from "../../graphql/schedule";
import { messageController } from "../../controllers/messages";
import { useApolloClient } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  createBookingRow: {
    "& :hover": {
      cursor: "unset",
    },
  },
  confirmButton: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    "& :hover": {
      cursor: "pointer",
    },
  },
  checkMark: {},
}));

interface IForm {
  diverRole: string;
  userId: string | number;
  activityType: string;
  date: string;
  time?: string;
  instructorId?: string | number;
  fullName?: string;
  equipment?: string;
  certLevel?: string;
  instructorName?: string;
}

const initialFormData: IForm = {
  diverRole: "PD",
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

interface IProps {
  tableType?: string;
  date?: Date;
  cancelEditingBooking?: () => void;
  fetchBookingDataCalled?: boolean;
}

export const CreateBookingRow: React.FC<IProps> = ({
  tableType,
  date,
  cancelEditingBooking,
}) => {
  const client = useApolloClient();
  const { setError } = messageController(client);
  const [user, setUser] = React.useState<User>();
  const [instructor, setInstructor] = useState<User>();
  const classes = useStyles();
  const [formData, setFormData] = useState(initialFormData);
  const isBoatBooking = tableType === "AM_BOAT" || tableType === "PM_BOAT";

  const { mutation: createBooking } = useBaseMutation(CREATE_BOOKING, {
    refetchQueries: ["ActivityData", "DailyBookingMeta"],
    onCompleted: (data: any) => {
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
    if (data.fullName !== "") {
      return true;
    } else return false;
  };

  const handleSaveBooking = () => {
    if (isValidBookingData(formData)) {
      // Format values for correct backend values
      try {
        const createBookingData = buildForm<IForm>(initialFormData, {
          ...formData,
          instructorId: instructor ? parseInt(instructor.id) : -1,
          userId: parseInt(user.id),
          activityType: tableType,
          date: formatDate(date, "server"),
        });
        createBooking({ variables: createBookingData });
      } catch (error) {
        console.log(error);
        setError(
          "There was an error creating the booking. Please contact your admin"
        );
      }
    } else {
      setError("Please enter valid booking details");
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

  // Update form if user change
  React.useEffect(() => {
    if (user) {
      setFormData((oldData) => {
        return {
          ...oldData,
          userId: user?.id,
          certLevel: user.profile.certLevel,
          equipment: user.profile.equipment,
          fullName: user?.profile?.fullName,
        };
      });
    }
  }, [user]);

  // Update form if instructor change
  React.useEffect(() => {
    if (instructor) {
      setFormData((oldData) => {
        return {
          ...oldData,
          instructorId: instructor?.id,
        };
      });
    }
  }, [instructor]);

  return (
    <TableRow className={classes.createBookingRow}>
      <TableCell onClick={handleSaveBooking}>
        <div className={classes.confirmButton}>
          <Typography className={classes.checkMark} color="green" variant="h5">
            &#x2714;
          </Typography>
        </div>
      </TableCell>

      {/* UserName Cell */}
      <TableCell>
        <UserSearchInput
          variant="standard"
          autoFocus
          size="small"
          setObject={setUser as any}
        />
      </TableCell>

      {/* Diver Role Cell */}
      <TableCell align="right">
        <TextField
          variant="standard"
          size="small"
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

      {/* Cert Level Cell */}
      {isBoatBooking ? (
        <TableCell align="right">
          <TextField
            variant="standard"
            size="small"
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
        <TableCell align="right">
          <UserSearchInput
            elementName="instructorName"
            variant="standard"
            autoFocus={false}
            setObject={setInstructor as any}
          />
        </TableCell>
      )}
      <TableCell align="right">
        <TextField
          size="small"
          variant="standard"
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
        <TableCell align="right">
          <TextField
            variant="standard"
            size="small"
            value={formData.time}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleFormChange(event)
            }
            onKeyUp={(event: React.KeyboardEvent) => handleEnterKeyUp(event)}
            name="time"
          >
            {formData.time.toUpperCase()}
          </TextField>
        </TableCell>
      )}
    </TableRow>
  );
};
