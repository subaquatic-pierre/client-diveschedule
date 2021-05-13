import { Theme } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

export default function IconButton(theme: Theme) {
  return {
    MuiIconButton: {
      variants: [
        {
          props: { color: "default" },
          style: {
            "&:hover": { backgroundColor: theme.palette.action.hover }
          }
        },
        {
          props: { color: "inherit" },
          style: {
            "&:hover": { backgroundColor: theme.palette.action.hover }
          }
        }
      ],

      styleOverrides: {
        root: {}
      }
    }
  };
}
