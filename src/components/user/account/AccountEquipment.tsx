import { Theme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { SxProps } from "@material-ui/system";

// ----------------------------------------------------------------------

type AccountEquipmentProps = {
  sx?: SxProps<Theme>;
};

export default function AccountEquipment({ sx }: AccountEquipmentProps) {
  return <Card sx={{ p: 3, ...sx }}>Equipment coming soon ...</Card>;
}
