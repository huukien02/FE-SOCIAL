import { useMutation } from "react-query";

import axiosInstance from "@/axiosInstance";

const API_URL = "/messages";

const postMessage = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

export const useSendMessage = () => {
  return useMutation(postMessage);
};
