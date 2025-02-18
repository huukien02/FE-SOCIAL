"use client";
import styles from "./styles.module.scss";

import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useRegisterUser } from "@/services/authService/registerService";
import Layout from "../../../layout/page";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<any>(null);
  const { mutate, isLoading } = useRegisterUser();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar ? avatar : "");

    mutate(
      { formData },
      {
        onSuccess: (response): any => {
          toast.success(response.message);
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message);
        },
      }
    );
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  return (
    <Layout>
      <Box className={styles.container}>
        <Box className={styles.box}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Register Page
          </Typography>
          <TextField
            type="file"
            fullWidth
            onChange={handleAvatarChange}
            style={{ marginBottom: "10px" }}
          />
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={isLoading}
            sx={{ marginTop: 2, height: "50px" }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default RegisterPage;
