"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { Header } from "./header";
import Footer from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Box component="main" flexGrow={1} p={2}>
          <Container>{children}</Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
