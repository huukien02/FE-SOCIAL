import React from "react";
import { Box, Typography, Container } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#1877F2",
        color: "#fff",
        py: 3,
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container>
        <Typography variant="body2" align="center">
          © 2025 Your Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
