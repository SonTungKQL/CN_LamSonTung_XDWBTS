import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const BlogCRUD = () => {
  const api = process.env.REACT_APP_URL_SERVER;

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState("create");
  const [formData, setFormData] = useState({
    BLOG_ID_: "",
    BLOG_TITLE: "",
    BLOG_CONTENT: "",
    BLOG_IMAGE: null, // Lưu file ảnh
    BLOG_AUTHOR: "",
    CREATED_AT: "",
    BLOG_STAUS: "",
  });

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api}/bai-viet/`);
      setBlogs(response.data.DT || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenDialog = (type, blog = {}) => {
    setDialogType(type);
    setFormData(
      type === "edit"
        ? blog
        : {
            BLOG_ID_: "",
            BLOG_TITLE: "",
            BLOG_CONTENT: "",
            BLOG_IMAGE_URL: "",
            BLOG_AUTHOR: "",
            CREATED_AT: "",
            BLOG_STAUS: "",
          }
    );
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("BLOG_TITLE", formData.BLOG_TITLE);
    data.append("BLOG_CONTENT", formData.BLOG_CONTENT);
    data.append("BLOG_AUTHOR", formData.BLOG_AUTHOR);
    data.append("BLOG_STAUS", formData.BLOG_STAUS);

    if (formData.BLOG_IMAGE) {
      data.append("BLOG_IMAGE", formData.BLOG_IMAGE);
    }

    try {
      if (dialogType === "create") {
        await axios.post(`${api}/bai-viet`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.put(`${api}/bai-viet/${formData.BLOG_ID_}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchBlogs();
      setOpenDialog(false);
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật bài viết", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      try {
        await axios.delete(`${api}/bai-viet/${id}`);
        fetchBlogs();
      } catch (error) {
        console.error("Lỗi khi xóa bài viết", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, BLOG_IMAGE: file }));
    }
  };

  return (
    <Box p={4}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {" "}
        <Typography variant="h5" gutterBottom>
          Quản lý bài viết
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog("create")}
          sx={{ mb: 2 }}
        >
          Thêm bài viết
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Tác giả</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : blogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không có bài viết nào.
                </TableCell>
              </TableRow>
            ) : (
              blogs.map((blog) => (
                <TableRow key={blog.BLOG_ID}>
                  <TableCell>{blog.BLOG_TITLE}</TableCell>
                  <TableCell>{blog.BLOG_AUTHOR}</TableCell>{" "}
                  <TableCell>
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={`${api}/images/${blog.BLOG_IMAGE_URL}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{blog.CREATED_AT}</TableCell>
                  <TableCell>{blog.BLOG_STAUS}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenDialog("edit", blog)}
                      sx={{ mr: 1 }}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(blog.BLOG_ID_)}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {dialogType === "create" ? "Thêm bài viết mới" : "Chỉnh sửa bài viết"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Tiêu đề"
            name="BLOG_TITLE"
            value={formData.BLOG_TITLE}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Nội dung"
            name="BLOG_CONTENT"
            value={formData.BLOG_CONTENT}
            onChange={handleChange}
            fullWidth
            margin="dense"
            multiline
            rows={4}
          />
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ marginTop: "16px" }}
          />
          {formData.BLOG_IMAGE && (
            <Typography variant="body2" color="textSecondary">
              {formData.BLOG_IMAGE.name}
            </Typography>
          )}

          <TextField
            label="Tác giả"
            name="BLOG_AUTHOR"
            value={formData.BLOG_AUTHOR}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="blog-status-label">Trạng thái</InputLabel>
            <Select
              labelId="blog-status-label"
              name="BLOG_STAUS"
              label="BLOG_STAUS"
              value={formData.BLOG_STAUS}
              onChange={handleChange}
            >
              <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
              <MenuItem value="Ngưng hoạt động">Ngưng hoạt động</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Hủy
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {dialogType === "create" ? "Thêm" : "Cập nhật"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogCRUD;
