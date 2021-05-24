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

  if (!user.profile.photoURL) return <DefaultAvatar {...other} />;

  return (
    <MAvatar
      src={user.profile.photoURL}
      alt={user.profile.fullName}
      color={
        user.profile.photoURL
          ? "default"
          : createAvatar(user.profile.fullName).color
      }
      {...other}
    >
      {createAvatar(user.profile.fullName).name}
    </MAvatar>
  );
}
