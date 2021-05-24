import { Box, Card, Typography } from "@material-ui/core";
// ----------------------------------------------------------------------

export default function AppPlaceHolder() {
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">App Placeholder</Typography>
        <Box
          sx={{
            mt: 1.5,
            mb: 0.5,
            display: "flex",
            alignItems: "center",
            height: "100px",
          }}
        ></Box>
      </Box>
    </Card>
  );
}
