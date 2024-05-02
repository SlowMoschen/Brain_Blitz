import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import { IUser } from "../../../../../shared/types/User";
import AvatarIcon from "../../profile/components/AvatarIcon";
import { AdminOutletContext } from "../AdminDasbordLayout";
import UsersPage from "./UsersPage";

export default function UsersTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const { allUsers } = useOutletContext<AdminOutletContext>();
  const { param } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    if (allUsers) {
      if (param === "recent") {
        const last14Days = allUsers.filter((user) => {
          const createdAt = new Date(user.timestamps.created_at);
          const today = new Date();
          const diff = today.getTime() - createdAt.getTime();
          const days = diff / (1000 * 3600 * 24);
          return days <= 14;
        });

        setUsers(last14Days);
      } else {
        setUsers(allUsers);
      }
    }
  }, [allUsers, param]);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "firstName", headerName: "First name" },
    { field: "lastName", headerName: "Last name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
    { field: "createdAt", headerName: "Created at" },
  ];

  const handleSelectAllClick = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users.map((user) => user.id));
    }
  };

  const handleRowClick = (id: string) => {
    redirect(URLS.ADMIN_ROUTES.USERS + `/${id}`);
  };

  const handleSelectClick = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  if (param !== "recent" && param !== "all") {
    const user = users.find((u) => u.id === param);
    return <UsersPage user={user} />;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ flexGrow: 1, maxWidth: "100vw" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < users.length}
                  checked={selected.length === users.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell align="center">Avatar</TableCell>
              {columns.map((column) => (
                <TableCell key={column.field} align="center">
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users ? (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{
                    bgcolor: selected.includes(user.id) ? "accent.light" : "inherit",
                    "&:hover": { bgcolor: "background.default", cursor: "pointer" },
                  }}
                  onClick={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                      return;
                    }
                    handleRowClick(user.id);
                  }}
                >
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(user.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectClick(user.id);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <AvatarIcon
                      first_name={user.first_name}
                      last_name={user.last_name}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.first_name}</TableCell>
                  <TableCell align="center">{user.last_name}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.settings.roles}</TableCell>
                  <TableCell align="center">{user.timestamps.created_at}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>Keine User gefunden</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
