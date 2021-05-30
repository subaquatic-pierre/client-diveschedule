import { useState } from "react";
import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import trash2Fill from "@iconify/icons-eva/trash-2-fill";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// material
import {
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { User } from "../../../@types/user";
import { useApolloClient } from "@apollo/client";
import { userController } from "../../../controllers/user";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

type UserListToolbarProps = {
  numSelected: number;
  filterName: string;
  selectedUsers?: User[];
  onFilterName: (value: string) => void;
  deleteUsers: () => void;
};

export default function UserListToolbar({
  numSelected,
  filterName,
  selectedUsers,
  onFilterName,
  deleteUsers,
}: UserListToolbarProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteDialogClickOpen = () => {
    console.log(filterName);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteUsers();
    setDeleteDialogOpen(false);
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? "primary.main" : "text.primary",
          bgcolor: isLight ? "primary.lighter" : "primary.dark",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={(e) => onFilterName(e.target.value)}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Box
                component={Icon}
                icon={searchFill}
                sx={{ color: "text.disabled" }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteDialogClickOpen}>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      )}

      {/* Confirm delete dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete these users?"}
        </DialogTitle>
        <DialogContent>
          <List aria-label="user list">
            {selectedUsers.map((user, index) => (
              <ListItem key={index}>
                <ListItemText primary={user.profile.fullName} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteDialogClose}
            variant="contained"
            color="error"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </RootStyle>
  );
}
