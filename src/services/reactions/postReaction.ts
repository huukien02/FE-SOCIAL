import { useMutation } from "react-query";

import axiosInstance from "@/axiosInstance";

const API_URL = "/reactions";

const postReaction = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

export const useReaction = () => {
  return useMutation(postReaction);
};
