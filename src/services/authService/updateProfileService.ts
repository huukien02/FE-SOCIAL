import { useMutation } from "react-query";
import axiosInstance from "@/axiosInstance";

const API_URL = "/users/update";

const updateProfile = async (formData: FormData, userId: any) => {
  const { data } = await axiosInstance.patch(`${API_URL}/${userId}`, formData);
  return data;
};

export const useUpdateProfile = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    (args: { formData: FormData; userId: number }) =>
      updateProfile(args.formData, args.userId)
  );

  return { mutate, isLoading, isSuccess, isError };
};
