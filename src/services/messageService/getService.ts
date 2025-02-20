import { useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/axiosInstance";

const API_URL = "/messages/conversation";

const getMessages = async (conversationId: number) => {
  const { data } = await axiosInstance.get(`${API_URL}/${conversationId}`);
  return data;
};

export const useGetMessages = (conversationId: number) => {
  const queryClient = useQueryClient();

  const query = useQuery(
    ["messages", conversationId],
    () => getMessages(conversationId),
    {
      enabled: !!conversationId,
    }
  );

  const refresh = () => {
    queryClient.invalidateQueries(["messages", conversationId]);
  };

  return { ...query, refresh };
};
