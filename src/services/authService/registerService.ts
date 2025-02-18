import { useMutation } from "react-query";
import axiosInstance from "@/axiosInstance";

const API_URL = "/users";

const registerUser = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

export const useRegisterUser = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    (args: { formData: FormData }) => registerUser(args.formData)
  );

  return { mutate, isLoading, isSuccess, isError };
};
