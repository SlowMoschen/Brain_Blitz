import { HttpService } from "../services/httpService";

export const useAuth = () => {
  const httpService = new HttpService();

  const login = async (body: { email: string; password: string }): Promise<Error | void> => {
    try {
      const response = await httpService.post("/auth/login", body);
      if (response.data) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        return error;
      }
    }
  };

  const logout = async () => {
    try {
      const response = await httpService.get("/auth/logout");
      if (response.data) {
        return response.data;
      }

      throw new Error(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  const isAuthenticated = async () => {
    try {
      const response = await httpService.get("/auth/session");
      if (response.data) {
        return response.data;
      }

      throw new Error(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  return { login, logout, isAuthenticated };
};
