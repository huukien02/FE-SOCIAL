import { useQuery } from "react-query";
import axiosInstance from "@/axiosInstance";

const API_URL = "/auth/profile";

const getProfile = async () => {
  const { data } = await axiosInstance.get(API_URL);
  return data;
};

export const useProfile = () => {
  const { data, isLoading, refetch } = useQuery(["profile"], getProfile);
  return {
    data,
    isLoading,
    refetch,
  };
};
