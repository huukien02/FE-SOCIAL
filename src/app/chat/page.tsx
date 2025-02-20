"use client";
import React, { useEffect, useState } from "react";
import Layout from "../../../layout/page";
import { useGetFriends } from "@/services/userService/getFriendService";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useProfile } from "@/services/authService/profileService";
import { useCreateConversation } from "@/services/conversationService/postService";
import { toast } from "react-toastify";
import BoxChat from "../../../components/Chat/BoxChat";
import { io } from "socket.io-client";

interface Friend {
  id: number;
  email: string;
  username: string;
  avatar: string;
  role: string;
}

const Chat = () => {
  const { data: dataFriends } = useGetFriends();
  const { data: dataProfile } = useProfile();
  const { mutate: mutateConversation } = useCreateConversation();

  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [roomId, setRoomId] = useState<number | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);

  const handleJoinConversation = (friend: Friend) => {
    setSelectedFriend(friend);
    // Get or Create roomId
    const formData = new FormData();
    formData.append("userId1", dataProfile?.data.id);
    formData.append("userId2", `${friend.id}`);

    mutateConversation(formData, {
      onSuccess: (response): any => {
        setRoomId(response.id);
        toast.success(response.message);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
      query: { userId: dataProfile?.data.id },
    });

    // Lắng nghe danh sách user online
    socket.on("updateOnlineUsers", (users: number[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [dataProfile?.data.id]);

  return (
    <Layout>
      <BoxChat
        selectedFriend={selectedFriend}
        setSelectedFriend={setSelectedFriend}
        roomId={roomId}
      />

      <Grid container spacing={2}>
        {dataFriends?.data.map((friend: Friend) => {
          const isOnline = onlineUsers.includes(friend.id);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={friend.id}>
              <Card sx={{ padding: 2, textAlign: "center" }}>
                <CardContent>
                  <Stack direction="column" alignItems="center" spacing={2}>
                    <Box position="relative">
                      <Avatar
                        onClick={() => handleJoinConversation(friend)}
                        src={friend?.avatar}
                        sx={{
                          width: 40,
                          height: 40,
                          boxShadow: "0 0 10px #000000",
                          cursor: "pointer",
                        }}
                      />
                      {/* Chấm trạng thái online/offline */}
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: -5,
                          right: -5,
                          width: 17,
                          height: 17,
                          borderRadius: "50%",
                          backgroundColor: isOnline ? "#00FF00" : "gray",
                          border: "2px solid white",
                        }}
                      />
                    </Box>
                    <Typography variant="h6">{friend.username}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default Chat;
