import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Rating,
  Autocomplete,
  TextField,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
const api = process.env.REACT_APP_URL_SERVER;

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { danhmuc } = location.state || {}; // Lấy giá trị từ state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Danh mục được chọn
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const fetchDataAll = async () => {
    try {
      const response = await axios.get(`${api}/san-pham/use`);
      if (response.data.EC === 1) {
        setProducts(response.data.DT);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchCategory = async () => {
    try {
      const response = await axios.get(`${api}/danh-muc/`);
      if (response.data.EC === 1) {
        setCategory(response.data.DT);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataAll();
    fetchCategory();
  }, []);

  const handleMoveSelectProducts = (id) => {
    navigate(`/select-product/${id}`);
  };

  const handleAddToWish = async (product) => {
    if (!isAuthenticated) {
      // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      navigate("/login");
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        idSanPham: product.PRODUCT_ID,
        idNguoiDung: userInfo.USER_ID, // ID người dùng
      };

      const response = await axios.post(`${api}/yeu-thich/`, payload);

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" }); // Thông báo lỗi
      } else {
        enqueueSnackbar(response.data.EM, { variant: "info" }); // Thông báo lỗi
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "info" }); // Thông báo lỗi
    }
  };

  // Lọc sản phẩm theo danh mục được chọn
  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.CATEGORY_ID_ === selectedCategory.CATEGORY_ID_
      )
    : products;

  return (
    <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          width: "80%",
        }}
      >
        {/* Autocomplete để lọc danh mục */}
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            justifyContent: "left",
            alignItems: "center",
            mb: 2,
            width: "100%",
          }}
        >
          {" "}
          <FormControl sx={{ width: "30%" }}>
            {" "}
            <Autocomplete
              options={category}
              getOptionLabel={(option) => option.CATEGORY_NAME} // Hiển thị tên danh mục
              value={selectedCategory}
              onChange={(event, newValue) => setSelectedCategory(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Chọn danh mục"
                  variant="outlined"
                />
              )}
              sx={{ mb: 3, width: "100%" }}
            />
          </FormControl>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Danh sách sản phẩm
          </Typography>
          {/* <Button variant="text" size="small">
            Xem thêm &gt;
          </Button> */}
        </Box>

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={3} key={product.PRODUCT_ID}>
              <Card
                sx={{
                  position: "relative",
                  maxWidth: 345,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.2s",
                  },
                }}
                onClick={() => handleMoveSelectProducts(product.PRODUCT_ID)}
              >
                {" "}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Ngừng sự kiện click để tránh chuyển hướng khi click vào icon
                    handleAddToWish(product);
                  }}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                    color: "red", // Màu đỏ cho trái tim
                  }}
                >
                  <FavoriteIcon />
                </IconButton>
                <CardMedia
                  component="img"
                  height="120"
                  image={`${api}/images/${product.IMAGE_URL_}`}
                  alt={product.NAME}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {product.NAME}
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Giá:{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.PRODUCT_PRICE)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {product.STOCK_QUANTITY_} đã bán
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductList;
