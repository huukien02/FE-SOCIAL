"use client";
import { ReactNode, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#f4f6f8", minHeight: "100vh" }}
    >
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>{children}</Box>
    </Box>
  );
}
