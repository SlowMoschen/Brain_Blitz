import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../../../../shared/types/User";
import ContainerWithHeader from "../../../components/ContainerWithHeader";
import { Stack, Typography } from "@mui/material";

interface UserPageProps {
  user: IUser | undefined;
}

export default function UsersPage({ user }: UserPageProps) {
  const redirect = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not found");
      redirect(-1);
    }
  }, [user]);

  if (!user) return null;

  return (
    <ContainerWithHeader header="User" center sx={{ width: "100%" }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Typography>ID:</Typography>
          <Typography>{user.id}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Name</Typography>
          <Typography>
            {user.first_name} {user.last_name}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Email:</Typography>
          <Typography>{user.email}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Role:</Typography>
          <Typography>{user.settings.roles}</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Typography>Created at:</Typography>
          <Typography>{new Date(user.timestamps.created_at).toDateString()}</Typography>
        </Stack>
      </Stack>
    </ContainerWithHeader>
  );
}
