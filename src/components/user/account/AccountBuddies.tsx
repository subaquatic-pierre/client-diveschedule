import { Theme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { SxProps } from "@material-ui/system";

// ----------------------------------------------------------------------

type AccountBuddiesProps = {
  sx?: SxProps<Theme>;
};

export default function AccountBuddies({ sx }: AccountBuddiesProps) {
  return <Card sx={{ p: 3, ...sx }}>Dive buddies coming soon ...</Card>;
}
