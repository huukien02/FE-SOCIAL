import { useMutation } from "react-query";

import axiosInstance from "@/axiosInstance";

const API_URL = "/conversations";

const postConversation = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

export const useCreateConversation = () => {
  return useMutation(postConversation);
};
