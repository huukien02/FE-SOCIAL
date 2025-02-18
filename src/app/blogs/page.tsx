"use client";
import "./styles.module.scss";
import styles from "./styles.module.scss";

import React, { useState } from "react";
import Layout from "../../../layout/page";
import { useProfile } from "@/services/authService/profileService";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useCreateBlogs } from "@/services/blogsService/postService";
import { toast } from "react-toastify";
import { useBlogs } from "@/services/blogsService/getService";
import { BLOGS_FEELING } from "../../../common";
import BoxBlog from "../../../components/Blogs/BoxBlog";

const Blogs = () => {
  const { data: dataProfile } = useProfile();
  const { mutate: mutateCreateBlog } = useCreateBlogs();
  const { data: dataBlogs, refetch: refetchBlogs } = useBlogs();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [feel, setFeel] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handlePostBlog = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("feel", feel);
    formData.append("userId", dataProfile?.data.id);

    mutateCreateBlog(
      { formData },
      {
        onSuccess: (response): any => {
          toast.success(response.message);
          setOpen(false);
          setTitle("");
          setContent("");
          setImage(null);
          setImagePreview("");
          setFeel("");
          refetchBlogs();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message[0]);
        },
      }
    );
  };

  return (
    <Layout>
      <Container>
        {dataProfile && (
          <Box className={styles.box}>
            <Avatar className={styles.img} src={dataProfile?.data.avatar} />
            <Button
              onClick={() => setOpen(true)}
              sx={{ borderRadius: 4 }}
              variant="contained"
            >
              Bạn đang nghĩ gì vậy ??
            </Button>
          </Box>
        )}

        {dataBlogs && (
          <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
            {dataBlogs.data?.map((blog: any) => (
              <BoxBlog key={blog.id} data={blog} />
            ))}
          </Box>
        )}
      </Container>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className={styles.modal}>
          <Typography variant="h5" color="primary">
            Tạo bài viết
          </Typography>
          {imagePreview ? (
            <Image
              onClick={() => setImagePreview("")}
              src={imagePreview ? imagePreview : ""}
              alt="Mô tả ảnh"
              width={360}
              height={300}
              className={styles.img}
            />
          ) : (
            <TextField type="file" fullWidth onChange={handleImageChange} />
          )}

          <FormControl fullWidth>
            <InputLabel id="label">Đang cảm thấy</InputLabel>
            <Select
              label="Đang cảm thấy"
              value={feel}
              onChange={(e) => setFeel(e.target.value)}
            >
              {BLOGS_FEELING.map((feeling) => (
                <MenuItem key={feeling.value} value={feeling.value}>
                  <Box display="flex" alignItems="center">
                    <Typography sx={{ mr: 1 }}>{feeling.icon}</Typography>
                    <Typography>{feeling.label}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Tiêu Đề"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Nôi Dung"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
          <Button
            sx={{ height: "40px" }}
            onClick={handlePostBlog}
            variant="contained"
            color="primary"
            fullWidth
          >
            Đăng bài
          </Button>
        </Box>
      </Modal>
    </Layout>
  );
};

export default Blogs;
