import { useMutation } from "react-query";

import axiosInstance from "@/axiosInstance";

const API_URL = "/blogs/create";

const postsBlog = async (formData: FormData) => {
  const { data } = await axiosInstance.post(API_URL, formData);
  return data;
};

export const useCreateBlogs = () => {
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    (args: { formData: FormData }) => postsBlog(args.formData)
  );

  return { mutate, isLoading, isSuccess, isError };
};
