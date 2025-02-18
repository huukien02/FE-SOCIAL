import { useQuery } from "react-query";
import axiosInstance from "@/axiosInstance";

const API_URL = "/blogs";

const getBlogs = async () => {
  const { data } = await axiosInstance.get(API_URL);
  return data;
};

export const useBlogs = () => {
  const { data, isLoading, refetch } = useQuery(["blogs"], getBlogs);
  return {
    data,
    isLoading,
    refetch,
  };
};
