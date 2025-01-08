import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  Typography,
  Box,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const ProductManager = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    CATEGORY_ID_: "",
    NAME: "",
    PRODUCT_PRICE: "",
    MATERIAL_: "",
    WEIGHT: "",
    SIZE_: "",
    IMAGE_URL_: null, // Dùng null để lưu file
    STOCK_QUANTITY_: "",
    PRODUCT_STATUS: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${api}/san-pham`);
      setProducts(response.data.DT);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${api}/danh-muc/`);
      setCategories(response.data.DT);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setFormData({ ...formData, IMAGE_URL_: e.target.files[0] });
  };

  // Open dialog
  const handleOpen = (product = null) => {
    setIsEdit(!!product);
    setEditingId(product?.PRODUCT_ID || null);
    setFormData(
      product || {
        CATEGORY_ID_: "",
        NAME: "",
        PRODUCT_PRICE: "",
        MATERIAL_: "",
        WEIGHT: "",
        SIZE_: "",
        IMAGE_URL_: "",
        STOCK_QUANTITY_: "",
        PRODUCT_STATUS: "Đang hoạt động",
      }
    );
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };

  // Create or update product
  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (isEdit) {
        await axios.put(`${api}/san-pham/${editingId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${api}/san-pham`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchProducts();
      handleClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/san-pham/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
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
        <Button variant="text">Quản lý sản phẩm</Button>{" "}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add Product
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Chất liệu</TableCell>
              <TableCell>Chều rộng</TableCell>
              <TableCell>Kích cỡ</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Stock</TableCell>

              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.PRODUCT_ID}>
                <TableCell>{product.NAME}</TableCell>
                <TableCell>{product.PRODUCT_PRICE}</TableCell>
                <TableCell>{product.MATERIAL_}</TableCell>
                <TableCell>{product.WEIGHT}</TableCell>
                <TableCell>{product.SIZE_}</TableCell>
                <TableCell>
                  <img
                    src={`${api}/images/${product.IMAGE_URL_}`}
                    alt={product.NAME || "Product Image"}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </TableCell>

                <TableCell>{product.STOCK_QUANTITY_}</TableCell>
                <TableCell>{product.PRODUCT_STATUS}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpen(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product.PRODUCT_ID)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Create/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit Product" : "Add Product"}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Danh mục sản phẩm</InputLabel>
            <Select
              name="CATEGORY_ID_"
              value={formData.CATEGORY_ID_}
              label="Danh mục sản phẩm"
              onChange={handleChange}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.CATEGORY_ID_}
                  value={category.CATEGORY_ID_}
                >
                  {category.CATEGORY_NAME}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Name"
            name="NAME"
            fullWidth
            value={formData.NAME}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Price"
            name="PRODUCT_PRICE"
            type="number"
            fullWidth
            value={formData.PRODUCT_PRICE}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="MATERIAL_"
            name="MATERIAL_"
            type="text"
            fullWidth
            value={formData.MATERIAL_}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="WEIGHT"
            name="WEIGHT"
            type="number"
            fullWidth
            value={formData.WEIGHT}
            onChange={handleChange}
          />{" "}
          <TextField
            margin="dense"
            label="SIZE_"
            name="SIZE_"
            type="number"
            fullWidth
            value={formData.SIZE_}
            onChange={handleChange}
          />{" "}
          <input
            type="file"
            accept="image/*"
            name="IMAGE_URL_"
            onChange={handleFileChange}
          />
          <TextField
            margin="dense"
            label="Stock Quantity"
            name="STOCK_QUANTITY_"
            type="number"
            fullWidth
            value={formData.STOCK_QUANTITY_}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="product-status-label">Trạng thái</InputLabel>
            <Select
              labelId="product-status-label"
              name="PRODUCT_STATUS"
              label="Trạng thái"
              value={formData.PRODUCT_STATUS}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
              <MenuItem value="Ngưng hoạt động">Ngưng hoạt động</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManager;
