import { Theme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import { SxProps } from "@material-ui/system";

// ----------------------------------------------------------------------

type AccountCertificationProps = {
  sx?: SxProps<Theme>;
};

export default function AccountCertification({
  sx,
}: AccountCertificationProps) {
  return <Card sx={{ p: 3, ...sx }}>Certifications coming soon ...</Card>;
}
