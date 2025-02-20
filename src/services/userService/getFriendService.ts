import { useQuery } from "react-query";
import axiosInstance from "@/axiosInstance";

const API_URL = "/users/friends";

const getFriends = async () => {
  const { data } = await axiosInstance.get(API_URL);
  return data;
};

export const useGetFriends = () => {
  const { data, isLoading, refetch } = useQuery(["friends"], getFriends);
  return {
    data,
    isLoading,
    refetch,
  };
};
