import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import {
  ShoppingCart,
  AccountCircle,
  Phone,
  Storefront,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo/favicon.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice"; // Action từ Redux slice
import Cookies from "js-cookie";
import axios from "axios";
const HeaderUser = () => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const api = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setAnchorEl(null); // Đặt lại anchorEl
    setIsOpen(false); // Đặt lại trạng thái menu
  }, [isAuthenticated]);

  // Mở menu
  const handleMenuOpen = (event) => {
    if (!isAuthenticated) return;
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  // Đóng menu
  const handleMenuClose = () => {
    console.log("handleMenuClose");
    setAnchorEl(null);
    setIsOpen(false);
  };
  console.log("isOpen", isOpen);
  // Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      // Gọi API để clear session trên backend
      await axios.post(`${api}/logout`);

      // Clear cookies và Redux state
      Cookies.remove("accessToken");
      dispatch(logout());

      // Điều hướng về trang đăng nhập
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left section: Logo and other items */}
        <Box
          sx={{
            display: "flex",
            width: "20%",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              marginRight: 2,
              color: "white",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="PNJ"
              style={{ width: "80px", marginTop: "10px" }}
            />
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", width: "55%" }}>
          <Button sx={{ color: "white", ml: 4 }} component={Link} to="/">
            Cửa Hàng
          </Button>
        </Box>
        {/* Right section: User and Cart */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <Button
                variant="text"
                sx={{ padding: 2, color: "#fff" }}
                onClick={handleMenuOpen}
              >
                {userInfo.AVATAR_USER ? (
                  <Avatar
                    src={`${api}/images/${userInfo.AVATAR_USER}`}
                    alt={userInfo.AVATAR_USER}
                  />
                ) : (
                  <AccountCircle />
                )}
                <Typography variant="body2" sx={{ ml: 2, color: "white" }}>
                  {userInfo.USERNAME || "Người dùng"}
                </Typography>
              </Button>
              {/* Menu các tùy chọn */}
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleMenuClose}
                sx={{ mt: 1 }}
              >
                <MenuItem component={Link} to="/profile">
                  Thông tin cá nhân
                </MenuItem>

                {/* Option: Đăng xuất */}
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {" "}
              <IconButton
                component={Link} // Sử dụng Link làm component
                to="/login" // Đường dẫn đến trang tài khoản
                sx={{
                  color: "white",
                  textDecoration: "none", // Xóa underline mặc định của Link
                }}
              >
                <AccountCircle />
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  Đăng nhập
                </Typography>
              </IconButton>
            </>
          )}
          <IconButton
            component={Link} // Sử dụng Link làm component
            to="/cart" // Đường dẫn đến trang tài khoản
            sx={{
              color: "white",
              textDecoration: "none", // Xóa underline mặc định của Link
            }}
          >
            <Storefront />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              Giỏ Hàng
            </Typography>
            <Badge badgeContent={0} color="error" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderUser;
