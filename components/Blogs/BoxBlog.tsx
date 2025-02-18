import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Button,
  Box,
  Divider,
  TextField,
} from "@mui/material";

import { BLOGS_REACTION, formatDateTime, getFeelingIcon } from "../../common";
import Comment from "./Comment";
import { useProfile } from "@/services/authService/profileService";
import { useCreateComment } from "@/services/commentService/postComment";
import { BlogProps } from "@/app/blogs/type";
import { toast } from "react-toastify";
import { useBlogs } from "@/services/blogsService/getService";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import ReplyIcon from "@mui/icons-material/Reply";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { useReaction } from "@/services/reactions/postReaction";
import ReactionIcons from "./Reaction";

const BoxBlog: React.FC<BlogProps> = ({ data }) => {
  const { data: dataProfile, refetch: refetchProfile } = useProfile();

  const { mutate: mutateCreateComment } = useCreateComment();
  const { refetch: refetchBlogs } = useBlogs();
  const { mutate: mutateReaction } = useReaction();

  const [message, setMessage] = useState<string>("");
  const [openComment, setOpenComment] = useState<boolean>(false);

  const handlePostComment = () => {
    const formData = new FormData();
    formData.append("content", message);
    formData.append("userId", dataProfile?.data.id);
    formData.append("blogId", `${data.id}`);

    mutateCreateComment(formData, {
      onSuccess: (response): any => {
        toast.success(response.message);
        setMessage("");
        refetchBlogs();
        refetchProfile();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message);
      },
    });
  };

  const handleReaction = (reaction: any) => {
    const formData = new FormData();
    formData.append("type", reaction);
    formData.append("userId", dataProfile?.data.id);
    formData.append("blogId", `${data.id}`);

    mutateReaction(formData, {
      onSuccess: (response) => {
        toast.success(response.message);
        refetchBlogs();
        refetchProfile();
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "An error occurred");
      },
    });
  };

  return (
    <Card key={data.id} sx={{ mb: 5, boxShadow: "gray 0px 1px 2px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ border: "1px solid grey" }} src={data.user.avatar} />
        }
        title={
          <Box display="flex" alignItems="center">
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="body1"
              component="span"
            >
              {data.user.username}
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              component="span"
              sx={{ ml: 2 }}
            >
              Đang cảm thấy {getFeelingIcon(data.feel)}
            </Typography>
          </Box>
        }
        subheader={
          <i style={{ fontSize: 12 }}>{formatDateTime(data.created_at)}</i>
        }
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <Divider />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CardMedia
          sx={{ height: 250, width: 250 }}
          component="img"
          image={data.image}
          alt={data.title}
        />
      </Box>

      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 2,
          pt: 2,
        }}
      >
        <Tippy
          content={
            <Box>
              {BLOGS_REACTION.map((reaction) => (
                <Button
                  onClick={() => handleReaction(reaction.value)}
                  key={reaction.value}
                  size="large"
                >
                  {reaction.icon}
                </Button>
              ))}
            </Box>
          }
          interactive={true}
          hideOnClick={false}
          theme="light"
        >
          <Button
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            size="small"
            color="primary"
          >
            <ThumbUpIcon />
            Thích ({data?.reactions.length})
            <ReactionIcons reactions={data?.reactions} />
          </Button>
        </Tippy>

        <Button
          onClick={() => setOpenComment(!openComment)}
          size="small"
          color="primary"
        >
          <ModeCommentIcon /> Bình luận ({data?.comments.length})
        </Button>
        <Button size="small" color="primary">
          <ReplyIcon /> Chia sẻ
        </Button>
      </Box>
      {openComment && (
        <Box sx={{ p: 2 }}>
          {data?.comments?.map((comment: any) => (
            <Comment
              key={comment.id}
              avatar={comment.user.avatar}
              name={comment.user.username}
              time={formatDateTime(comment.created_at)}
              content={comment.content}
            />
          ))}

          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              gap: 2,
              mt: 2,
            }}
          >
            <Avatar
              alt="User Avatar"
              src={dataProfile?.data.avatar}
              sx={{ width: 40, height: 40 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Viết bình luận..."
              multiline
              rows={1}
              sx={{
                borderRadius: 2,
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              onClick={handlePostComment}
              variant="contained"
              color="primary"
            >
              Gửi
            </Button>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default BoxBlog;
