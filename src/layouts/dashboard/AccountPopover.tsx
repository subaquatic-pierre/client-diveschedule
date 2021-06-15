import { useRef, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

// icons
import homeFill from "@iconify/icons-eva/home-fill";
import settings2Fill from "@iconify/icons-eva/settings-2-fill";
import { Icon } from "@iconify/react";

// material
import { alpha } from "@material-ui/core/styles";
import { Button, Box, Divider, MenuItem, Typography } from "@material-ui/core";

// routes
import { PATH_DASHBOARD } from "../../routes/paths";

// utils
import { deleteAuthToken } from "../../utils/auth";
import { messageController } from "../../controllers/messages";

// hooks
import useAuth from "../../hooks/useAuth";
import useIsMountedRef from "../../hooks/useIsMountedRef";
import useBaseMutation from "../../hooks/useBaseMutation";

// graphql
import { LOGOUT_MUTATION } from "../../graphql/auth";

// components
import { MIconButton } from "../../components/@material-extend";
import MyAvatar from "../../components/MyAvatar";
import MenuPopover from "../../components/MenuPopover";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: homeFill,
    linkTo: PATH_DASHBOARD.root,
  },
  {
    label: "Settings",
    icon: settings2Fill,
    linkTo: PATH_DASHBOARD.user.account,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const history = useHistory();
  const client = useApolloClient();
  const anchorRef = useRef(null);
  const { user } = useAuth();
  const { setSuccess } = messageController(client);
  const { mutation: logout } = useBaseMutation(LOGOUT_MUTATION, {
    onCompleted: (data: any) => {
      deleteAuthToken();
      // setSuccess("Logout successful");
      history.push("/");
    },
  });
  const { setError } = messageController(client);
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    try {
      logout();
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      setError("Unable to logout");
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}
      >
        <MyAvatar />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user.profile.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: "body2", py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24,
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
