import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Stack,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  Menu,
  MenuItem,
  Button as MuiButton,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const PaymentConfirmation = () => {
  const [cartItems, setCartItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Chuyển Khoản");
  const location = useLocation();
  const { id, quantity } = location.state || {}; // Lấy biến từ state
  const { cartItemsdata } = location.state || {}; // Lấy biến từ state
  const api = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    email: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [decoded, setDecoded] = useState(null);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken.USER_ID);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Token không hợp lệ", error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (id) {
      fetchProductsByID(id);
    } else if (cartItemsdata) {
      console.log("check quantity", cartItemsdata);
      setCartItems(cartItemsdata);
    }
  }, [id, cartItemsdata]);

  const fetchProductsByID = async (id) => {
    try {
      const response = await axios.get(`${api}/san-pham/use/${id}`);
      console.log(response.data);
      setCartItems([
        {
          ...response.data.DT,
          QUANTITY: quantity,
          IMAGE_URL: response.data.DT.IMAGE_URL_,
        },
      ]); // Gán quantity vào sản phẩm
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + (item.QUANTITY || 0) * item.PRODUCT_PRICE,
    0
  );

  const generateUniqueOrderId = (length, userId) => {
    const now = new Date();
    const dateTimeString =
      String(now.getFullYear()).slice(-2) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

    const uniqueOrderId = `${dateTimeString}${userId}`;
    return uniqueOrderId.length > length
      ? uniqueOrderId.slice(0, length)
      : uniqueOrderId;
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    handleMenuClose();
  };

  const handleThanhtoan = async () => {
    try {
      const { fullName, phone, address } = formData;
      if (paymentMethod === "Thanh Toán Trực Tiếp") {
        const orderData = {
          orders: {
            USER_ID: decoded.USER_ID, // ID của người dùng, có thể lấy từ context hoặc state
            TOTAL_PRICE: totalAmount, // Tổng giá tiền
            ADDRESS_ODER: address, // Lấy từ input
            PHONE_ODER: phone, // Lấy từ input
            PAYMENT_METHOD_: paymentMethod, // Phương thức thanh toán
            ORDER_STATUS_: "Pending", // Trạng thái đơn hàng
          },
          orderdetails: cartItems.map((item) => ({
            PRODUCT_ID: item.PRODUCT_ID,
            QUANTITY: item.QUANTITY || 0,
            PRICE: item.PRODUCT_PRICE,
          })),
        };

        const response = await axios.post(
          `${api}/gio-hang/add-donhang`,
          orderData
        );
        if (response.data.EC === 1) {
          navigate("/");
          enqueueSnackbar("Đặt hàng thành công", { variant: "success" });
        } else {
          console.error("Lỗi đặt hàng:", response.data.message);
        }
      }
      if (paymentMethod === "Chuyển Khoản") {
        const orderData = {
          orders: {
            USER_ID: decoded.USER_ID, // ID của người dùng, có thể lấy từ context hoặc state
            TOTAL_PRICE: totalAmount, // Tổng giá tiền
            ADDRESS_ODER: address, // Lấy từ input
            PHONE_ODER: phone, // Lấy từ input
            PAYMENT_METHOD_: paymentMethod, // Phương thức thanh toán
            ORDER_STATUS_: "success", // Trạng thái đơn hàng
          },
          orderdetails: cartItems.map((item) => ({
            PRODUCT_ID: item.PRODUCT_ID,
            QUANTITY: item.QUANTITY || 0,
            PRICE: item.PRODUCT_PRICE,
          })),
        };
        const orderId = generateUniqueOrderId(15, decoded.USER_ID);
        localStorage.setItem("orderData", JSON.stringify(orderData));

        console.log("chadja;dsjas;đa", orderData);
        const response = await axios.post(
          "http://emailserivce.somee.com/api/Momo/CreatePaymentUrl",
          {
            fullName: fullName,
            options: "mutil",
            orderId: orderId,
            orderInfo: ` tổng tiền ${totalAmount.toLocaleString()}`,
            returnUrl: "http://localhost:3000/checkout",
            amount: totalAmount,
          }
        );

        const paymentUrl = response.data.url;
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu thanh toán:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", minHeight: "100vh", py: 4 }}>
      <Paper
        elevation={3}
        sx={{ maxWidth: 800, margin: "auto", p: 4, borderRadius: 2 }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Xác Nhận Thanh Toán
        </Typography>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Sản Phẩm Của Bạn
        </Typography>
        <List>
          {cartItems.map((item) => (
            <div key={item.PRODUCT_ID}>
              <ListItem>
                <img
                  src={
                    `${api}/images/${item.IMAGE_URL}` ||
                    "https://via.placeholder.com/400x400"
                  }
                  alt={item.PRODUCT_NAME}
                  style={{ width: 50, height: 50, marginRight: 16 }}
                />
                <ListItemText
                  primary={item.PRODUCT_NAME}
                  secondary={`Số lượng: ${item.QUANTITY || 0} | Giá: ${
                    item.PRODUCT_PRICE.toLocaleString() || 0
                  } VND`}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <Typography
          variant="h6"
          align="right"
          sx={{ mt: 2, fontWeight: "bold" }}
        >
          Tổng Tiền: {totalAmount.toLocaleString() || 0} VND
        </Typography>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Họ và Tên"
            variant="outlined"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={2}>
          <TextField
            fullWidth
            label="Số Điện Thoại"
            variant="outlined"
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={2}>
          <TextField
            fullWidth
            label="Địa Chỉ Giao Hàng"
            variant="outlined"
            required
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} mt={2}>
          <TextField
            fullWidth
            label="Ghi Chú (Tùy chọn)"
            variant="outlined"
            multiline
            rows={2}
            name="note"
            value={formData.note}
            onChange={handleChange}
          />
        </Grid>

        <Box sx={{ mt: 3 }}>
          <FormControlLabel
            control={<Checkbox />}
            label="Tôi đồng ý với các điều khoản và chính sách giao hàng."
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Phương Thức Thanh Toán
          </Typography>
          <MuiButton
            variant="outlined"
            onClick={handleMenuOpen}
            sx={{ width: "100%", textAlign: "left", padding: "10px 15px" }}
          >
            {paymentMethod}
          </MuiButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handlePaymentMethodSelect("Chuyển Khoản")}>
              Chuyển Khoản
            </MenuItem>
            <MenuItem
              onClick={() => handlePaymentMethodSelect("Thanh Toán Trực Tiếp")}
            >
              Thanh Toán Trực Tiếp
            </MenuItem>
          </Menu>
        </Box>

        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 4, py: 1.5, fontWeight: "bold" }}
            onClick={() => handleThanhtoan()}
          >
            Xác Nhận
          </Button>
          <Button variant="outlined" color="secondary" sx={{ px: 4, py: 1.5 }}>
            Quay Lại
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default PaymentConfirmation;
