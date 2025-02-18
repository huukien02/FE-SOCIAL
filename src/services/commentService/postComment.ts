import { useMutation } from "react-query";

import axiosInstance from "@/axiosInstance";

const API_URL = "/comments";

const postsComment = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

export const useCreateComment = () => {
  return useMutation(postsComment);
};
