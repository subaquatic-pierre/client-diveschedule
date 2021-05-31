import { Theme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { SxProps } from "@material-ui/system";

// ----------------------------------------------------------------------

type AccountDiveLogProps = {
  sx?: SxProps<Theme>;
};

export default function AccountDiveLog({ sx }: AccountDiveLogProps) {
  return <Card sx={{ p: 3, ...sx }}>Dive logs coming soon ...</Card>;
}
