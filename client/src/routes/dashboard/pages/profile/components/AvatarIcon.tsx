import { Avatar } from "@mui/material";

interface IAvatarIconProps {
  first_name: string;
  last_name: string;
  size?: 'small' | 'medium' | 'large';
}
export default function AvatarIcon({first_name, last_name, size = 'medium'}: IAvatarIconProps) {
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

  const sizeToWidth = {
    width: size === 'small' ? 40 : size === 'medium' ? 80 : 120,
    height: size === 'small' ? 40 : size === 'medium' ? 80 : 120,
    fontSize: size === 'small' ? 20 : size === 'medium' ? 40 : 60,
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        ...sizeToWidth,
      },
      children: `${name.split(" ")[0][0].toUpperCase()}${name.split(" ")[1][0].toUpperCase()}`,
    };
  }

  return <Avatar {...stringAvatar(`${first_name} ${last_name}`)} />;
}
