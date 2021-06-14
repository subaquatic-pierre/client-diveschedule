import { Icon } from "@iconify/react";
import searchFill from "@iconify/icons-eva/search-fill";
import trash2Fill from "@iconify/icons-eva/trash-2-fill";
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
  deleteDialogOpen: boolean;
  setSelectedUsers: (users: string[]) => void;
  onFilterName: (value: string) => void;
  setDeleteDialogOpen: (value: boolean) => void;
  handleConfirmDelete: () => void;
};

export default function UserListToolbar({
  numSelected,
  filterName,
  selectedUsers,
  deleteDialogOpen,
  onFilterName,
  setDeleteDialogOpen,
  handleConfirmDelete,
  setSelectedUsers,
}: UserListToolbarProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const handleCancelClick = () => {
    setDeleteDialogOpen(false);
    setSelectedUsers([]);
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
          autoFocus
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
          <IconButton onClick={() => setDeleteDialogOpen(true)}>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      )}

      {/* Confirm delete dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {selectedUsers.length > 1
            ? "Are you sure you want to delete these users?"
            : "Are you sure you want to delete this user?"}
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
            onClick={handleCancelClick}
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
