import SortIcon from '@mui/icons-material/Sort';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import { useAdminQuery } from "../../../../../shared/hooks/api/useAdminAPI.hook";
import { IUser } from "../../../../../shared/types/User";
import DataTable from "./DataTable";

export default function UsersTable() {
  const { allUsers } = useAdminQuery();
  const [users, setUsers] = useState<IUser[]>([]);
  const redirect = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
  const anchorEl = useRef<HTMLButtonElement>(null);

  const handleFilterChange = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const filter = e.currentTarget.dataset.filter;
    if (filter) setFilter(filter);
    setIsMenuOpen(false);
  }

  const filterUsers = (filter: string | null) => {
    if (!filter) return allUsers;

    switch (filter) {
      case "last14":
        return allUsers.filter((user: IUser) => {
          const date = new Date(user.timestamps.created_at);
          const now = new Date();
          return now.getTime() - date.getTime() < 14 * 24 * 60 * 60 * 1000;
        });
      case "admin":
        return allUsers.filter((user: IUser) => user.settings.roles.includes("admin"));
      case "user":
        return allUsers.filter((user: IUser) => user.settings.roles.includes("user"));
        case "first_name":
          return allUsers.sort((a: IUser, b: IUser) => a.first_name.localeCompare(b.first_name));
        case "last_name":
          return allUsers.sort((a: IUser, b: IUser) => a.last_name.localeCompare(b.last_name));
      default:
        return allUsers;
    }
  }

  useEffect(() => {
    if (allUsers) {
      setUsers(allUsers);
    }

    if (filter) {
      setUsers(filterUsers(filter));
    }
  }, [allUsers, filter]);

  const columns = [
    { key: "Avatar", title: "Avatar" },
    { key: "id", title: "ID" },
    { key: "first_name", title: "Vorname" },
    { key: "last_name", title: "Nachname" },
    { key: "email", title: "E-Mail" },
    { key: "settings.roles", title: "Rolle" },
    { key: "timestamps.created_at", title: "Erstellt am" },
  ];

  const filterOptions = [
    {
      title: "Alle",
      filter: "all",
    },
    {
      title: "Letzten 14 Tage",
      filter: "last14",
    },
    {
      title: "Vorname",
      filter: "first_name",
    },
    {
      title: "Nachname",
      filter: "last_name",
    },
    {
      title: "Admins",
      filter: "admin",
    },
    {
      title: "Benutzer",
      filter: "user",
    }
  ]

  return (
    <>
      <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)} ref={anchorEl}>
        <SortIcon sx={{ color: 'text.main' }} />
      </IconButton>
      <Menu open={isMenuOpen} onClose={() => setIsMenuOpen(!isMenuOpen)} anchorEl={anchorEl.current}>
        {filterOptions.map((option) => (
          <MenuItem key={option.filter} onClick={handleFilterChange} data-filter={option.filter}>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
      <DataTable<IUser>
        columns={columns}
        rows={users}
        onRowClick={(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
          if (e.target instanceof HTMLInputElement) return;
          redirect(URLS.ADMIN_ROUTES.USERS + `/edit` + `/${id}`);
        }}
      />
    </>
  );
}
