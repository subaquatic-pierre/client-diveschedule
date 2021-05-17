import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%"
  }
}));

interface IAdminUserTableToolbarProps {
  numSelected: number;
  handleOpenDiverFormModal: () => void;
  deleteUsers: () => void;
}

export const AdminUserTableToolbar: React.FC<IAdminUserTableToolbarProps> = ({
  numSelected,
  handleOpenDiverFormModal,
  deleteUsers
}) => {
  const classes = useStyles();

  const handleDeleteButtonClick = () => {
    deleteUsers();
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete users">
          <IconButton
            data-testid="delete-button"
            aria-label="delete"
            onClick={handleDeleteButtonClick}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Create Diver">
            <IconButton
              data-testid="create-diver-button"
              onClick={handleOpenDiverFormModal}
              aria-label="create diver"
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip> */}
        </>
      )}
    </Toolbar>
  );
};
