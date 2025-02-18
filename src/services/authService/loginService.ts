import { useMutation } from "react-query";

import axiosInstance from "@/axiosInstance";

const API_URL = "/auth/login";

const login = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

export const useLogin = () => {
  return useMutation(login);
};
