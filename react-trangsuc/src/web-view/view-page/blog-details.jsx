import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom"; // Để lấy tham số từ URL

const BlogDetails = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const { id } = useParams(); // Lấy id từ URL params
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${api}/bai-viet/${id}`); // Thay đổi URL API tùy theo cấu trúc của bạn
        setBlog(response.data.DT);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
        setError("Không thể tải bài viết.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  console.log("blogs", blog);
  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" color="error">
          Bài viết không tồn tại.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", textAlign: "left" }}
          >
            {blog.BLOG_TITLE}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2, textAlign: "left" }}>
            {blog.BLOG_CONTENT}
          </Typography>

          <CardMedia
            component="img"
            image={`${api}/images/${blog.BLOG_IMAGE_URL}`} // Cập nhật URL hình ảnh đúng
            alt={blog.BLOG_TITLE}
            sx={{
              objectFit: "cover",
              height: "400px",
              width: "400px",
              marginTop: 2,
            }}
          />

          <Box sx={{ marginTop: 2, textAlign: "left" }}>
            <Typography variant="body2" color="text.secondary">
              Tác giả: {blog.BLOG_AUTHOR}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ngày tạo: {new Date(blog.CREATED_AT).toLocaleDateString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BlogDetails;
