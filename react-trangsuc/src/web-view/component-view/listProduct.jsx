import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Rating,
  Stack,
} from "@mui/material";

import img1 from "../../public/list-product/product-1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const ProductGrid = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const api = process.env.REACT_APP_URL_SERVER;
  useEffect(() => {
    fetchProducts();
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

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <Typography variant="body1" color="textSecondary">
        Không có sản phẩm nào để hiển thị.
      </Typography>
    );
  }

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
  return (
    <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Thêm chiều dọc để căn giữa nội dung
          justifyContent: "center",
          alignItems: "center", // Căn giữa theo chiều ngang
          mb: 2,
          width: "80%", // Đảm bảo phần tử con có đủ không gian để căn giữa
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            width: "100%", // Đảm bảo có chiều rộng cho phần tử con
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}></Typography>
          <Button variant="text" size="small">
            Xem thêm &gt;
          </Button>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {" "}
          {/* Căn giữa các items trong Grid */}
          {products.slice(0, 8).map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.PRODUCT_ID}>
              <Card
                sx={{ width: "90%", position: "relative" }}
                onClick={() => handleMoveSelectProducts(product.PRODUCT_ID)}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={`${api}/images/${product.IMAGE_URL_}`} // Sử dụng IMAGE_URL_ từ backend
                  alt={product.NAME} // Sử dụng NAME từ backend
                />
                {/* Thêm icon trái tim vào góc phải */}
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
                <CardContent>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {product.NAME}
                  </Typography>
                  <Typography variant="h6" color="error">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.PRODUCT_PRICE)}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                    <Rating
                      value={product.PRODUCT_STATUS}
                      readOnly
                      size="small"
                    />
                  </Stack>
                  <Typography variant="body2" color="textSecondary">
                    {product.WEIGHT}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {product.SIZE_}
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

export default ProductGrid;
