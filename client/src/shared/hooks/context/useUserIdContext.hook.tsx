import { useContext } from "react";
import { UserIDContext } from "../../context/UserID.context";

export function useUserIdContext() {
  const context = useContext(UserIDContext);

  if (!context) {
    throw new Error("useUserIdContext must be used within a UserIdContextProvider");
  }

  return context;
}
