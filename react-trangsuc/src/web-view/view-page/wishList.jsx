import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const api = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    getWishlist();
  }, []);
  // Lấy sản phẩm yêu thích của người dùng
  const getWishlist = async () => {
    try {
      const response = await axios.get(`${api}/yeu-thich/${userInfo.USER_ID}`);
      if (response.data.EC === 1) {
        setWishlistItems(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateQuantity = async (productId, action) => {
    try {
      // Cập nhật số lượng sản phẩm trong giỏ hàng của người dùng
      const response = await axios.post(`${api}/cart/update`, {
        userId: userInfo.USER_ID,
        productId,
        action,
      });
      if (response.data.EC === 1) {
        // Cập nhật lại giỏ hàng sau khi thay đổi
        setWishlistItems(response.data.DT);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Xử lý xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await axios.post(`${api}/yeu-thich/delete/`, {
        idNguoiDung: userInfo.USER_ID,
        idSanPham: productId,
      });
      if (response.data.EC === 1) {
        getWishlist();
      }
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };
  // THÊM VÀO GIỎ HÀNG
  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      enqueueSnackbar("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login"); // Đảm bảo '/login' là đường dẫn đúng tới trang đăng nhập của bạn
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        ID_SAN_PHAM: productId,
        ID_NGUOI_DUNG: userInfo.USER_ID, // ID người dùng
        NGAY_CAP_NHAT_GIOHANG: new Date().toISOString(),
      };

      const response = await axios.post(`${api}/gio-hang/`, payload);

      if (response.data.EC === 1) {
        enqueueSnackbar(response.data.EM, { variant: "success" });
      } else {
        enqueueSnackbar(response.data.EM, { variant: "error" });
      }
    } catch (error) {
      console.error("Lỗi hệ thống:", error);
      enqueueSnackbar(error.response.data.EM, { variant: "error" });
    } finally {
    }
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Danh sách yêu thích
      </Typography>

      {wishlistItems.map((item) => (
        <Card key={item.WISHLIST_ID} sx={{ display: "flex", mb: 2, p: 2 }}>
          <CardMedia
            component="img"
            sx={{ width: 150, objectFit: "contain" }}
            image={`${api}/images/${item.IMAGE_URL}`}
            alt={item.PRODUCT_NAME}
          />

          <Box
            sx={{ display: "flex", flexDirection: "column", flex: 1, ml: 2 }}
          >
            <CardContent>
              <Typography variant="h6">{item.PRODUCT_NAME}</Typography>
              <Typography variant="body2" color="text.secondary">
                Mã SP: {item.PRODUCT_ID}
              </Typography>
              <Typography variant="body1">
                Giá: {parseInt(item.PRODUCT_PRICE).toLocaleString()}đ
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}></Box>
            </CardContent>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#0f4b85",
                },
              }}
              onClick={() => handleAddToCart(item.PRODUCT_ID)}
            >
              Thêm vào giỏ hàng
            </Button>
            <IconButton
              onClick={() => handleRemoveProduct(item.PRODUCT_ID)}
              color="error"
              sx={{ ml: 2 }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Card>
      ))}

      <Divider sx={{ my: 3 }} />
    </Container>
  );
};

export default Wishlist;
