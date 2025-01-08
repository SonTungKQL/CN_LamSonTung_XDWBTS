import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const api = process.env.REACT_APP_URL_SERVER;
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${api}/bai-viet`);
        setBlogs(response.data.DT || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết", error);
      }
    };
    fetchBlogs();
  }, []);
  const navigate = useNavigate();
  const handleMoveBlogDetails = (id) => {
    navigate(`/blog-details/${id}`);
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold" }}
      >
        Các Bài Viết Mới Nhất
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.BLOG_ID_}>
            <Card
              sx={{ maxWidth: 345, boxShadow: 3 }}
              onClick={() => handleMoveBlogDetails(blog.BLOG_ID_)}
            >
              <CardMedia
                component="img"
                height="200"
                image={`${api}/images/${blog.BLOG_IMAGE_URL}`} // Đảm bảo đường dẫn đúng với server của bạn
                alt={blog.BLOG_TITLE}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {blog.BLOG_TITLE}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.BLOG_CONTENT.substring(0, 100)}...{" "}
                  {/* Hiển thị nội dung ngắn gọn */}
                </Typography>
                {/* Hiển thị tên tác giả và thời gian tạo */}
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tác giả: {blog.BLOG_AUTHOR}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(blog.CREATED_AT).toLocaleDateString()}{" "}
                    {/* Hiển thị thời gian tạo */}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogList;
