import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface CommentProps {
  avatar: string;
  name: string;
  time: string;
  content: string;
}
const Comment: React.FC<CommentProps> = ({ avatar, name, time, content }) => (
  <Box sx={{ display: "flex", mb: 2 }}>
    <Avatar src={avatar} alt={name} sx={{ mr: 2 }} />
    <Box sx={{ flex: 1 }}>
      <Typography variant="body1" fontWeight="bold">
        {name}
      </Typography>
      <i style={{ fontSize: 10, fontWeight: "normal", color: "lighrgray" }}>
        ({time})
      </i>

      <p style={{ fontSize: 14, marginTop: 10 }}>{content}</p>
    </Box>
  </Box>
);

export default Comment;
