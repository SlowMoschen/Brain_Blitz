import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { URLS } from "../../../../../configs/Links";
import { IUser } from "../../../../../shared/types/User";
import { AdminOutletContext } from "../AdminDasbordLayout";
import DataTable from "./DataTable";
import UsersPage from "./UsersPage";

export default function UsersTable() {
  const { allUsers } = useOutletContext<AdminOutletContext>();
  const [users, setUsers] = useState<IUser[]>([]);
  const { param } = useParams();
  const redirect = useNavigate();

  useEffect(() => {
    if (allUsers) {
      if (param === 'recent') {
        const last14Days = allUsers.filter((user) => {
          const createdAt = new Date(user.timestamps.created_at);
          const now = new Date();
          const diff = now.getTime() - createdAt.getTime();
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
    { key: "Avatar", title: "Avatar" },
    { key: "id", title: "ID" },
    { key: "first_name", title: "Vorname" },
    { key: "last_name", title: "Nachname" },
    { key: "email", title: "E-Mail" },
    { key: "settings.roles", title: "Rolle" },
    { key: "timestamps.created_at", title: "Erstellt am" },
  ];

  if (param !== 'recent' && param !== 'all') {
    const user = allUsers.find((user) => user.id === param);
    if (user) {
      return <UsersPage user={user} />;
    }
  }

  return (
    <>
      <DataTable<IUser>
        columns={columns}
        rows={users}
        onRowClick={(e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, id: string) => {
          if (e.target instanceof HTMLInputElement) return;
          redirect(URLS.ADMIN_ROUTES.USERS + `/${id}`);
        }}
      />
    </>
  );
}
