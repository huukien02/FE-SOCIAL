import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ScrollBox from "../ScrollBox";
import { useProfile } from "@/services/authService/profileService";
import SendIcon from "@mui/icons-material/Send";
import { toast } from "react-toastify";
import { useSendMessage } from "@/services/messageService/postService";
import { useGetMessages } from "@/services/messageService/getService";
import { io } from "socket.io-client";
import { formatDateTime } from "../../common";

const BoxChat = ({ selectedFriend, setSelectedFriend, roomId }: any) => {
  const { data: dataProfile } = useProfile();
  const { mutate: mutateMessage } = useSendMessage();

  const [message, setMessage] = useState("");
  const { data: dataMessages, refetch: refetchDataMessages } = useGetMessages(
    roomId as number
  );

  const handleSendMessage = () => {
    const formData = new FormData();
    formData.append("senderId", dataProfile?.data.id);
    formData.append("receiverId", `${selectedFriend?.id}`);
    formData.append("conversationId", `${roomId}`);
    formData.append("content", message);

    mutateMessage(formData, {
      onSuccess: (response): any => {
        setMessage("");
        refetchDataMessages();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  // Kết nối SOCKET
  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
    });

    socket.on("sendMessage", (id) => {
      //   if (id == roomId) {
      // refetchDataMessages();
      //   }
      refetchDataMessages();
    });

    return () => {
      socket.off("sendMessage");
    };
  }, [refetchDataMessages]);

  return (
    <Dialog
      open={!!selectedFriend}
      onClose={() => setSelectedFriend(null)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontWeight: "bold",
        }}
      >
        <Avatar
          src={selectedFriend?.avatar}
          sx={{
            width: 40,
            height: 40,
            marginLeft: 1,
            boxShadow: "0 0 10px #000000",
          }}
        />
        {selectedFriend?.username}
      </DialogTitle>
      <DialogContent>
        <ScrollBox maxHeight={500} scrollToBottom>
          {dataMessages?.data?.map((message: any) => {
            const isMe = message.sender.id === dataProfile?.data.id;
            return (
              <ListItem
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent: isMe ? "flex-end" : "flex-start",
                }}
              >
                {!isMe && (
                  <Avatar
                    src={message.sender.avatar}
                    sx={{
                      boxShadow: "0 0 10px gray",
                      width: 40,
                      height: 40,
                      marginRight: 1,
                    }}
                  />
                )}
                <ListItemText
                  sx={{
                    bgcolor: isMe ? "primary.light" : "grey.300",
                    padding: 1,
                    borderRadius: 2,
                    maxWidth: "60%",
                  }}
                  primaryTypographyProps={{ color: isMe ? "white" : "black" }}
                  secondaryTypographyProps={{
                    fontSize: "0.56rem",
                    color: isMe ? "white" : "black",
                  }}
                  primary={message.content}
                  secondary={formatDateTime(message.createdAt)}
                />
                {isMe && (
                  <Avatar
                    src={message.sender.avatar}
                    sx={{
                      boxShadow: "0 0 10px gray",
                      width: 40,
                      height: 40,
                      marginLeft: 1,
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </ScrollBox>
      </DialogContent>
      <DialogActions sx={{ padding: "8px" }}>
        <Avatar
          alt="User Avatar"
          src={dataProfile?.data.avatar}
          sx={{ width: 40, height: 40 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Nhập tin nhắn..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button
          onClick={handleSendMessage}
          endIcon={<SendIcon />}
          variant="contained"
          sx={{ ml: 1 }}
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoxChat;
