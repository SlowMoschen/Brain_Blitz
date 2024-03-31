import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import LoadingSpinner from "../../shared/components/LodingSpinner";
import { COLORS } from "../../shared/constants/application";
import { HttpService } from "../../shared/services/httpService";
import DashboardError from "./components/DashboardError";

export default function DashboardLayout() {
  const fetchUser = async () => {
    const httpService = new HttpService();
    return httpService.get("/users");
  };

  const {
    isPending,
    data: response,
    error,
    isError,
  } = useQuery({ queryKey: ["user"], queryFn: fetchUser });

  if (isPending)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <LoadingSpinner color={COLORS.ACCENT} size={80} />
      </div>
    );

  if (isError) {
    console.error(error);
    return <DashboardError error={error} />;
  }

  const user = response?.data;
  return (
    <>
      <main>
        <Outlet context={[user]} />
      </main>
    </>
  );
}
