import "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Popover,
  Tooltip,
} from "@material-ui/core";
import "react-calendar/dist/Calendar.css";

import IconButton from "@material-ui/core/IconButton";
import TodayIcon from "@material-ui/icons/Today";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Calendar from "react-calendar";
import { formatDate } from "../../utils/formatDate";

import { DAY_QUERY } from "../../graphql/schedule/queries";
import { PATH_DASHBOARD } from "../../routes/paths";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  appBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  dateDiv: {
    "&:hover": {
      cursor: "pointer",
    },
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  toolsDiv: {},
  calendarDiv: {
    border: "none",
    padding: theme.spacing(2),
  },
}));

interface IScheduleInfoBarProps {
  selectedDate: Date;
  setSelectedDate: (date: any) => void;
}

export const ScheduleInfoBar: React.FC<IScheduleInfoBarProps> = ({
  setSelectedDate,
  selectedDate,
}) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  useQuery(DAY_QUERY, {
    onError: (error) => {
      console.log(error);
    },
  });

  const openCalendar = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeCalendar = () => {
    setAnchorEl(null);
  };

  const handleDateClick = (date: any) => {
    setAnchorEl(null);
    setSelectedDate(date);
  };

  const open = Boolean(anchorEl);
  const id = open ? "calendar-popover" : undefined;

  return (
    <Box sx={{ mb: 3 }}>
      <AppBar color="inherit" position="static">
        <Toolbar className={classes.appBar}>
          <div onClick={openCalendar} className={classes.dateDiv}>
            <Tooltip title="Select date">
              <IconButton
                disableRipple
                edge="start"
                color="inherit"
                aria-label="calendar"
              >
                <TodayIcon aria-describedby={id} />
              </IconButton>
            </Tooltip>
            <Typography variant="h6">
              {formatDate(selectedDate, "full")}
            </Typography>
          </div>
          {/* <div>
            <Tooltip title="Create Diver">
              <IconButton
                onClick={() => history.push(PATH_DASHBOARD.user.create)}
                aria-label="create diver"
              >
                <PersonAddIcon />
              </IconButton>
            </Tooltip>
          </div> */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={closeCalendar}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Calendar
              calendarType="Arabic"
              className={classes.calendarDiv}
              onChange={handleDateClick}
              value={selectedDate}
            />
          </Popover>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
