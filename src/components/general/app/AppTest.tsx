import { useApolloClient } from "@apollo/client";
import { Box, Card, Typography, Button } from "@material-ui/core";
import { messagesController } from "../../../graphql/messages";
// ----------------------------------------------------------------------

export default function AppTest() {
  const client = useApolloClient();
  const { setError, setSuccess } = messagesController(client);
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
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => setError("Set error test")}
          >
            Test Error
          </Button>
          <Button
            variant="contained"
            onClick={() => setSuccess("Set success test")}
          >
            Test Success
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
