import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <Outlet />
    </main>
  );
}
