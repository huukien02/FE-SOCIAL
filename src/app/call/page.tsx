"use client";

import { useGetFriends } from "@/services/userService/getFriendService";
import { useProfile } from "@/services/authService/profileService";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Slider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Layout from "../../../layout/page";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import PhoneLockedIcon from "@mui/icons-material/PhoneLocked";
interface Friend {
  id: number;
  email: string;
  username: string;
  avatar: string;
  role: string;
}

const VideoCall = () => {
  const { data: dataFriends } = useGetFriends();
  const { data: dataProfile } = useProfile();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [call, setCall] = useState<any>(null);
  const [callAccepted, setCallAccepted] = useState(false);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);

  const [test, setTest] = useState(false);
  const [fromUser, setFromUser] = useState<any>();

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

  useEffect(() => {
    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
      query: { userId: dataProfile?.data.id },
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Lỗi khi lấy stream:", error);
      });

    socket.on("incomingCall", ({ from, signal }) => {
      const userFromFriend = dataFriends?.data.find(
        (friend: Friend) => friend.id === from
      );

      setFromUser(userFromFriend);
      setCall({ from, signal });
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      connectionRef.current.signal(signal);
    });

    socket.on("callEnded", () => {
      setCallAccepted(false);
      setCall(null);

      if (connectionRef.current) {
        connectionRef.current.destroy();
      }
    });
  }, [dataProfile?.data.id, test]);

  const callUser = async (id: number) => {
    try {
      setTest((prev) => !prev);

      // Kết nối socket
      const socket = io("http://localhost:4000", {
        transports: ["websocket"],
        query: { userId: dataProfile?.data.id },
      });

      // Khởi tạo Peer
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream: stream!,
      });

      // Lắng nghe sự kiện signal để gửi lời mời gọi
      peer.on("signal", (data) => {
        socket.emit("callUser", {
          to: id,
          signal: data,
          from: dataProfile?.data.id,
        });
      });

      // Lắng nghe stream từ đối phương
      peer.on("stream", (userStream) => {
        console.log("Nhận được stream từ đối phương:", userStream);
        if (userVideo.current) {
          userVideo.current.srcObject = userStream;
        }
      });

      connectionRef.current = peer;
    } catch (error) {
      console.error("Lỗi khi gọi callUser:", error);
    }
  };

  const answerCall = () => {
    setTest((prev) => !prev);

    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
      query: { userId: dataProfile?.data.id },
    });

    setCallAccepted(true);

    // initiator: false vì đây là người nhận cuộc gọi
    const peer = new Peer({
      initiator: false,
      trickle: true,
      stream: stream!,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { to: call.from, signal: data });
    });

    peer.on("stream", (userStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = userStream;
      }
    });

    // Nhận tín hiệu từ caller
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setTest((prev) => !prev);

    const socket = io("http://localhost:4000", {
      transports: ["websocket"],
      query: { userId: dataProfile?.data.id },
    });

    setCallAccepted(false);
    setCall(null);

    socket.emit("endCall", { from: dataProfile?.data.id, to: call?.from });

    if (connectionRef.current) {
      connectionRef.current.destroy();
    }
  };

  // Fillter
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    sepia: 0,
  });

  const handleFilterChange = (filter: string, value: number) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  return (
    <Layout>
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
                        onClick={() => callUser(friend.id)}
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

      {call && !callAccepted && (
        <Button
          onClick={answerCall}
          endIcon={<PhoneCallbackIcon />}
          variant="contained"
          sx={{ marginTop: "20px" }}
        >
          <Tooltip title={fromUser?.username}>
            <Avatar
              src={fromUser?.avatar}
              sx={{
                width: 30,
                height: 30,
                boxShadow: "0 0 10px #000000",
                cursor: "pointer",
              }}
            />
          </Tooltip>
          <Typography sx={{ ml: 1 }} variant="body1" color="initial">
            is calling !!
          </Typography>
        </Button>
      )}

      <Paper
        elevation={3}
        sx={{
          width: "400px",
          height: "300px",
          padding: 2,
          borderRadius: 3,
          position: "relative",
          color: "white",
          overflow: "hidden",
          marginTop: "20px",
        }}
      >
        {/* My Video */}

        <Box
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <video
            ref={myVideo}
            autoPlay
            playsInline
            width="100%"
            height="100%"
            style={{
              borderRadius: "10px",
              background: "black",
              objectFit: "cover",
              filter: `
              brightness(${filters.brightness}%)
              contrast(${filters.contrast}%)
              saturate(${filters.saturate}%)
              sepia(${filters.sepia}%)
            `,
            }}
          />

          {callAccepted && (
            <video
              ref={userVideo}
              autoPlay
              playsInline
              width="100px"
              height="75px"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                borderRadius: "8px",
                background: "black",
                border: "2px solid white",
                objectFit: "cover",
              }}
            />
          )}

          {callAccepted && (
            <button
              style={{
                position: "absolute",
                top: "70%",
                right: "40%",
                borderRadius: "100%",
                background: "red",
                border: "2px solid white",
                objectFit: "cover",
                width: "60px",
                height: "60px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={leaveCall}
            >
              <PhoneLockedIcon />
            </button>
          )}
        </Box>
      </Paper>

      {/* Edit Fillter */}
      <Box sx={{ mt: 2, color: "black", width: "400px" }}>
        <Typography>Độ sáng</Typography>
        <Slider
          value={filters.brightness}
          min={50}
          max={200}
          onChange={(e, value) =>
            handleFilterChange("brightness", value as number)
          }
        />

        <Typography>Độ tương phản</Typography>
        <Slider
          value={filters.contrast}
          min={50}
          max={200}
          onChange={(e, value) =>
            handleFilterChange("contrast", value as number)
          }
        />

        <Typography>Bão hòa</Typography>
        <Slider
          value={filters.saturate}
          min={50}
          max={300}
          onChange={(e, value) =>
            handleFilterChange("saturate", value as number)
          }
        />

        <Typography>Sepia</Typography>
        <Slider
          value={filters.sepia}
          min={0}
          max={100}
          onChange={(e, value) => handleFilterChange("sepia", value as number)}
        />
      </Box>
      <Button
        variant="contained"
        onClick={() =>
          setFilters({
            brightness: 100,
            contrast: 100,
            saturate: 100,
            sepia: 0,
          })
        }
      >
        Reset
      </Button>
    </Layout>
  );
};

export default VideoCall;
