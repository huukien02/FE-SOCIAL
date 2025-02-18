import axiosInstance from "@/axiosInstance";
import { useMutation } from "react-query";

const API_URL = "/auth/logout";

const logout = async (token: string) => {
  try {
    const response = await axiosInstance.post(API_URL, { token });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Invalid credentials");
  }
};

export const useLogout = () => {
  return useMutation((token: string) => logout(token));
};
