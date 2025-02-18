"use client";
import styles from "./styles.module.scss";

import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useLogin } from "@/services/authService/loginService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Layout from "../../../layout/page";

function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate, isLoading } = useLogin();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    mutate(formData, {
      onSuccess: (response) => {
        Cookies.set("accessToken", JSON.stringify(response.data), {
          expires: 7,
        });
        toast.success(response.message);
        router.push("/");
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "An error occurred");
      },
    });
  };

  return (
    <Layout>
      <Box className={styles.container}>
        <Box className={styles.box}>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
            Login Page
          </Typography>
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
            disabled={isLoading}
            sx={{ marginTop: 2, height: "50px" }}
            onClick={handleSubmit}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default LoginPage;
