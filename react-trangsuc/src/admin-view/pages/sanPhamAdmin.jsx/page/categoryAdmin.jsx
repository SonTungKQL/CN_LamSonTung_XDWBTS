import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const CategoryCRUD = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    CATEGORY_NAME: "",
    CATEGORY_DESCRIPTION: "",
    CATEGORY_STATUS: "Đang hoạt động",
  });

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${api}/danh-muc/`);
      setCategories(response.data.DT);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for add/update
  const handleSubmit = async () => {
    if (editingCategory) {
      // Update category
      try {
        const response = await axios.put(
          `${api}/danh-muc/${editingCategory.CATEGORY_ID_}`,
          formData
        );
        setCategories((prev) =>
          prev.map((cat) =>
            cat.CATEGORY_ID_ === editingCategory.CATEGORY_ID_
              ? response.data.DT
              : cat
          )
        );
        fetchCategories();
        setEditingCategory(null);
      } catch (error) {
        console.error("Error updating category:", error);
      }
    } else {
      // Add category
      try {
        const response = await axios.post(`${api}/danh-muc/`, formData);
        setCategories((prev) => [...prev, response.data.DT]);
        fetchCategories();
      } catch (error) {
        console.error("Error creating category:", error);
      }
    }
    setFormData({
      CATEGORY_NAME: "",
      CATEGORY_DESCRIPTION: "",
      CATEGORY_STATUS: "Đang hoạt động",
    });
    setOpenDialog(false);
  };

  // Handle edit button
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      CATEGORY_NAME: category.CATEGORY_NAME,
      CATEGORY_DESCRIPTION: category.CATEGORY_DESCRIPTION,
      CATEGORY_STATUS: category.CATEGORY_STATUS,
    });
    setOpenDialog(true);
  };

  // Handle delete button
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await axios.delete(`${api}/danh-muc/${id}`);
        setCategories((prev) => prev.filter((cat) => cat.CATEGORY_ID_ !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="text">Quản lý danh mục</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEditingCategory(null);
            setFormData({
              CATEGORY_NAME: "",
              CATEGORY_DESCRIPTION: "",
              CATEGORY_STATUS: "Đang hoạt động",
            });
            setOpenDialog(true);
          }}
        >
          Add Category
        </Button>
      </Box>

      {/* Dialog for Adding/Editing Category */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {editingCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Category Name"
            name="CATEGORY_NAME"
            value={formData.CATEGORY_NAME}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Category Description"
            name="CATEGORY_DESCRIPTION"
            value={formData.CATEGORY_DESCRIPTION}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-status-label">
              Danh mục sản phẩm
            </InputLabel>
            <Select
              labelId="category-status-label"
              name="CATEGORY_STATUS"
              label=" Danh mục sản phẩm"
              value={formData.CATEGORY_STATUS}
              onChange={handleChange}
            >
              <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
              <MenuItem value="Ngưng hoạt động">Ngưng hoạt động</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display Categories */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.CATEGORY_ID_}>
                <TableCell>{category.CATEGORY_ID_}</TableCell>
                <TableCell>{category.CATEGORY_NAME}</TableCell>
                <TableCell>{category.CATEGORY_DECRIPTION}</TableCell>
                <TableCell>{category.CATEGORY_STATUS}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(category)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(category.CATEGORY_ID_)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CategoryCRUD;
