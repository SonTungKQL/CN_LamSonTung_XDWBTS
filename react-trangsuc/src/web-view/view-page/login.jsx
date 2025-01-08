import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Grid,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { ArrowBack } from "@mui/icons-material";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo/favicon.png";
import { login, setUserInfo } from "../../redux/authSlice";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
const LoginForm = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [tokenGoogle, setTokenGoogle] = useState(null);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleCheckboxChange = (e) => setIsChecked(e.target.checked);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setTokenGoogle(tokenResponse.access_token);

      // Lấy thông tin người dùng từ Google API
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        setUser(userInfo.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed:", error);
    },
  });

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_URL_SERVER}/login/google`,
            { email: user.email, HO_TEN: user.name }
          );

          if (response.data.EC === 200) {
            localStorage.setItem("THEMES", response.data.DT.userInfo.THEMES);
            Cookies.remove("accessToken");
            const accessToken = response.data.DT.accessToken;
            Cookies.set("accessToken", accessToken, { expires: 7 });
            sessionStorage.setItem("userPicture", user.picture);
            dispatch(
              login({
                accessToken,
                userInfo: response.data.DT.userInfo, // Thông tin người dùng
              })
            );
            enqueueSnackbar(response.data.EM, { variant: "success" });
            // loginIs();
            navigate("/");
          } else {
            enqueueSnackbar(response.data.EM, { variant: "info" });
          }
        } catch (error) {
          console.error("Đã xảy ra lỗi:", error);

          enqueueSnackbar(error.response.data.EM, { variant: "info" });
        }
      };

      fetchData();
    }
  }, [user, navigate, dispatch]);

  const handleLogin = async () => {
    try {
      // Kiểm tra xem email và mật khẩu có bị trống không
      if (!email || !password) {
        setErrorMessage("Email và mật khẩu không được để trống");
        return;
      }

      // Reset thông báo
      setErrorMessage("");
      setSuccessMessage("");

      // Gọi API đăng nhập
      const response = await axios.post(`${api}/login`, {
        email,
        password,
      });

      const { EC, EM, DT } = response.data;

      if (EC === 1) {
        // Đăng nhập thành công
        setSuccessMessage(EM);

        // Lưu token và thông tin người dùng vào Cookies
        Cookies.set("accessToken", DT.accessToken, {
          expires: 1, // Thời gian hết hạn (1 ngày)
          secure: true, // Chỉ dùng trên kết nối HTTPS
          sameSite: "strict", // Bảo vệ chống CSRF
        });

        Cookies.set("userInfo", JSON.stringify(DT.userInfo), {
          expires: 1, // Thời gian hết hạn
          secure: true,
          sameSite: "strict",
        });
        const accessToken = response.data.DT.accessToken;
        dispatch(
          login({
            accessToken,
            userInfo: response.data.DT.userInfo, // Thông tin người dùng
          })
        );
        navigate("/"); // Điều hướng về trang chủ
      } else {
        // Hiển thị lỗi từ API
        setErrorMessage(EM);
      }
    } catch (error) {
      // Xử lý lỗi khi gọi API
      console.error("Login error:", error);
      setErrorMessage("Đã xảy ra lỗi khi đăng nhập, vui lòng thử lại.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 2,
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          sx={{ color: "black" }}
        >
          Quay lại
        </Button>
        <img src={logo} alt="PNJ" style={{ width: "80px" }} />
      </Grid>

      <Typography variant="h6" align="center" gutterBottom>
        Chào mừng trở lại
      </Typography>
      <Typography variant="body2" align="center" color="textSecondary" mb={3}>
        Vui lòng đăng nhập để tiếp tục
      </Typography>

      {/* Trường Email */}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={handleEmailChange}
        type="email"
        sx={{ marginBottom: 2 }}
      />

      {/* Trường Mật khẩu */}
      <TextField
        label="Mật khẩu"
        variant="outlined"
        fullWidth
        value={password}
        onChange={handlePasswordChange}
        type="password"
        sx={{ marginBottom: 2 }}
      />

      {/* Ghi nhớ tài khoản */}
      <FormControlLabel
        control={
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        }
        label="Lợi ích khi đăng nhập/đăng ký MyPNJ"
      />

      {/* Nút Đăng nhập */}
      <Box mt={2}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Đăng Nhập
        </Button>{" "}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => loginGoogle()}
          sx={{
            mt: 2,
            backgroundColor: "#1976d2", // Màu hồng phù hợp với mỹ phẩm
            "&:hover": {
              backgroundColor: "#12599f", // Màu tối hơn khi hover
            },
          }}
        >
          Đăng Nhập Bằng Google
        </Button>
      </Box>

      {/* Lợi ích */}
      <Box mt={3} sx={{ fontSize: "14px", color: "textSecondary" }}>
        <ul>
          <li>Dễ dàng tra cứu hàng thế thành viên</li>
          <li>Xem lịch sử giao dịch và hóa đơn điện tử</li>
          <li>Xem được ưu đãi dành riêng cho quý khách</li>
        </ul>
      </Box>
      <Box mt={3} textAlign="center">
        <Typography variant="body2" color="textSecondary">
          Bạn chưa có tài khoản?
        </Typography>
        <Button
          variant="text"
          color="primary"
          component={Link} // Sử dụng Link component
          to="/register" // Đường dẫn đến trang đăng ký
          sx={{ fontWeight: "bold", textTransform: "none" }}
        >
          Đăng ký ngay
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
