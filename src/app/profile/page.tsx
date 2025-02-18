"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "../../../layout/page";
import { useProfile } from "@/services/authService/profileService";
import { useUpdateProfile } from "@/services/authService/updateProfileService";
import { toast } from "react-toastify";
import BoxBlog from "../../../components/Blogs/BoxBlog";
const ProfilePage = () => {
  const { data: dataProfile, refetch: refetchProfile } = useProfile();
  const { mutate: mutateUpdateProfile } = useUpdateProfile();

  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<any>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("avatar", avatar ? avatar : "");

    mutateUpdateProfile(
      { formData, userId: dataProfile?.data.id },
      {
        onSuccess: (response): any => {
          toast.success(response.message);
          refetchProfile();
          setOpenModalUpdate(false);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message);
        },
      }
    );
  };

  const handleOpenModalUpdate = () => {
    if (dataProfile) {
      setOpenModalUpdate(true);
      setEmail(dataProfile.data.email);
      setUsername(dataProfile.data.username);
      setAvatar(dataProfile.data.avatar);
      setAvatarPreview(dataProfile.data.avatar);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          border: "1px solid lightgray",
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
          }}
        >
          <Box>
            <Avatar
              onClick={() => handleOpenModalUpdate()}
              src={dataProfile?.data.avatar ?? ""}
              sx={{
                marginTop: 1,
                width: 100,
                height: 100,
                border: "1px solid lightgray",
              }}
            />
          </Box>
          <Box>
            <Typography variant="body1" component="div">
              Username: <strong>{dataProfile?.data.username}</strong>
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Email: <strong>{dataProfile?.data.email}</strong>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Role: <strong>{dataProfile?.data.role}</strong>
            </Typography>
          </Box>
        </Box>

        <Box>
          <Button sx={{ ml: 2 }} variant="contained">
            Tạo Blog
          </Button>
        </Box>
      </Box>

      {dataProfile && (
        <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
          {dataProfile.data?.blogs.map((blog: any) => (
            <BoxBlog key={blog.id} data={blog} />
          ))}
        </Box>
      )}

      <Modal
        open={openModalUpdate}
        onClose={() => setOpenModalUpdate(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: 400,
            margin: "auto",
            padding: 2,
            backgroundColor: "white",
            borderRadius: 2,
            marginTop: 10,
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            {/* Avatar */}
            <Avatar
              alt="User Avatar"
              src={avatarPreview}
              sx={{
                width: 100,
                height: 100,
                marginBottom: 2,
                border: "1px solid lightgray",
              }}
            />
          </div>

          {/* Input fields */}
          <TextField
            type="file"
            fullWidth
            onChange={handleAvatarChange}
            style={{ marginBottom: "10px" }}
          />

          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />

          {/* Button to submit */}
          <Button
            onClick={handleUpdateProfile}
            variant="contained"
            color="primary"
            fullWidth
          >
            Update Profile
          </Button>
        </Box>
      </Modal>
    </Layout>
  );
};

export default ProfilePage;
