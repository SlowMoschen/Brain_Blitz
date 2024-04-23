import { Avatar } from "@mui/material";

interface IAvatarIconProps {
  first_name: string;
  last_name: string;
}
export default function AvatarIcon({first_name, last_name}: IAvatarIconProps) {
  /**
   * @description This function is used to convert a string to a color.
   * @see https://github.com/mui/material-ui/blob/v5.15.15/docs/data/material/components/avatars/BackgroundLetterAvatars.tsx
   */
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 80,
        height: 80,
        fontSize: 40,
      },
      children: `${name.split(" ")[0][0].toUpperCase()}${name.split(" ")[1][0].toUpperCase()}`,
    };
  }

  return <Avatar {...stringAvatar(`${first_name} ${last_name}`)} />;
}
