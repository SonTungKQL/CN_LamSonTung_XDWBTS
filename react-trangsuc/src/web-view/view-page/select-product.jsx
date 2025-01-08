import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Link,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

const ProductDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const api = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      fetchProductsByID();
    }
  }, [id]);

  // Fetch product by ID
  const fetchProductsByID = async () => {
    try {
      const response = await axios.get(`${api}/san-pham/use/${id}`);
      setProducts(response.data.DT); // Save product data to state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleClickBuy = (productId) => {
    if (productId) {
      navigate("/xacnhanthanhtoan", { state: { id: productId, quantity } });
    } else {
      console.error("Product ID is not available.");
    }
  };

  // Handle change in quantity input
  const handleQuantityChange = (event) => {
    const value = Math.max(1, event.target.value); // Ensure quantity is at least 1
    setQuantity(value);
  };

  // THÊM VÀO GIỎ HÀNG
  const handleAddToCart = async (isToCart) => {
    if (!isAuthenticated) {
      enqueueSnackbar("Vui lòng đăng nhập để tiếp tục!");
      navigate("/login"); // Đảm bảo '/login' là đường dẫn đúng tới trang đăng nhập của bạn
      return; // Dừng hàm nếu chưa đăng nhập
    }

    try {
      const payload = {
        ID_SAN_PHAM: id,
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
      if (isToCart) {
        navigate("/cart");
      }
    }
  };
  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 3 }}>
      {/* Header with back button */}
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <IconButton sx={{ color: "#000" }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" sx={{ color: "#000", fontWeight: "bold" }}>
          {products.PRODUCT_NAME || "Sản phẩm không tìm thấy"}
        </Typography>
        <Box />
      </Grid>

      {/* Main content: Image on left and Product info on right */}
      <Grid container spacing={3}>
        {/* Product Image on the left */}
        <Grid item xs={12} md={6}>
          <Card sx={{ maxWidth: 400 }}>
            <CardMedia
              component="img"
              image={
                `${api}/images/${products.IMAGE_URL_}` ||
                "https://via.placeholder.com/400x400"
              }
              alt={products.PRODUCT_NAME || "Sản phẩm không có tên"}
            />
          </Card>
        </Grid>

        {/* Product Info on the right */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" sx={{ color: "#d32f2f", marginBottom: 2 }}>
            {products.PRODUCT_PRICE
              ? `${products.PRODUCT_PRICE} ₫`
              : "Giá sản phẩm"}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#757575", marginBottom: 2 }}
          >
            Giá sản phẩm (Giá sản phẩm thay đổi theo các ưu đãi)
          </Typography>

          {/* Product Size Selection */}
          <TextField
            label="Chọn size"
            select
            fullWidth
            sx={{ marginBottom: 2, borderColor: "#d32f2f" }}
            defaultValue={16}
            SelectProps={{
              native: true,
            }}
          >
            {[16, 17, 18].map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </TextField>

          {/* Quantity Input */}
          <TextField
            label="Số lượng"
            type="number"
            fullWidth
            value={quantity}
            onChange={handleQuantityChange}
            sx={{ marginBottom: 2, borderColor: "#d32f2f" }}
            InputProps={{
              inputProps: {
                min: 1, // Ensure the minimum quantity is 1
              },
            }}
          />

          {/* Product Description */}
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {products.CATEGORY_DECRIPTION || "Mô tả sản phẩm chưa có"}
          </Typography>

          {/* Special Offers */}
          <Divider sx={{ marginBottom: 2 }} />
          <Typography variant="h6" sx={{ color: "#d32f2f", marginBottom: 2 }}>
            Ưu đãi đặc biệt:
          </Typography>
          {products.PROMOTION_TITLE_ ? (
            <>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                {products.PROMOTION_TITLE_}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1 }}>
                {products.PROMOTION_DESCRIPTION}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              Không có ưu đãi đặc biệt
            </Typography>
          )}

          {/* Add to Cart and Buy Now Buttons */}
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#d32f2f",
                  "&:hover": {
                    backgroundColor: "#9a0007",
                  },
                }}
                onClick={() => handleAddToCart(false)}
              >
                Thêm vào giỏ hàng
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#0d47a1",
                  },
                }}
                onClick={() => handleClickBuy(id)}
              >
                Mua ngay
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Footer with Store Info */}
      <Divider sx={{ marginBottom: 2 }} />
      <Typography variant="body2" align="center">
        Xem cửa hàng trên{" "}
        <Link href="#" color="primary">
          PNJ
        </Link>
      </Typography>
    </Box>
  );
};

export default ProductDetail;
