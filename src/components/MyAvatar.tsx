// hooks
import useAuth from "../hooks/useAuth";
//
import { MAvatar } from "./@material-extend";
import { MAvatarProps } from "./@material-extend/MAvatar";
import createAvatar from "../utils/createAvatar";

// ----------------------------------------------------------------------

const DefaultAvatar = (other: any) => {
  return (
    <MAvatar
      src="https://www.businessnetworks.com/sites/default/files/default_images/default-avatar.png"
      alt="User"
      color="default"
      {...other}
    >
      User
    </MAvatar>
  );
};

export default function MyAvatar({ ...other }: MAvatarProps) {
  const { user } = useAuth();

  if (!user.photoURL) return <DefaultAvatar {...other} />;

  return (
    <MAvatar
      src={user.photoURL}
      alt={user.displayName}
      color={user.photoURL ? "default" : createAvatar(user.displayName).color}
      {...other}
    >
      {createAvatar(user.displayName).name}
    </MAvatar>
  );
}
