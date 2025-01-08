import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    avatarUrl: "https://via.placeholder.com/150",
    address: "",
  });
  const navigate = useNavigate();
  const api = process.env.REACT_APP_URL_SERVER;
  const [newAvatar, setNewAvatar] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPasswordOld, setNewPasswordOld] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [decoded, setDecoded] = useState(null);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Token không hợp lệ", error);
      }
    } else {
      navigate("/login");
    }
  }, [token]);
  useEffect(() => {
    if (decoded) {
      fetchtDataUser();
    }
  }, [decoded]);
  const fetchtDataUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/user/${decoded.USER_ID}`
      );
      setUser({
        name: response.data.DT[0].USERNAME,
        email: response.data.DT[0].EMAIL,
        phone: response.data.DT[0].PHONE,
        avatarUrl:
          response.data.DT[0].AVATAR_USER || "https://via.placeholder.com/150",
        address: response.data.DT[0].ADDRESS_,
      });
      setNewUsername(response.data.DT[0].USERNAME);
      setNewPhone(response.data.DT[0].PHONE);
      setNewAddress(response.data.DT[0].ADDRESS_);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng", error);
    }
  };

  useEffect(() => {
    fetchtDataUser();
  }, []);
  const [avatarFile, setAvatarFile] = useState(null);
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordOldChange = (event) => {
    setNewPasswordOld(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setNewPasswordConfirm(event.target.value);
  };

  const handleAddressChange = (event) => {
    setNewAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmitInfo = (event) => {
    event.preventDefault();
    console.log("Thông tin đã được thay đổi:", {
      newAvatar,
      newUsername,
      newAddress,
      newPhone,
    });
  };

  const handleChangProfile = async () => {
    try {
      // Kiểm tra và cập nhật avatar nếu có
      if (avatarFile) {
        const formData = new FormData();
        formData.append("AVATAR", avatarFile);

        const avatarResponse = await axios.put(
          `${api}/user/${decoded.USER_ID}`,
          formData
        );

        // Kiểm tra phản hồi từ server
        if (avatarResponse.data.EC === 1) {
          enqueueSnackbar("Avatar đã được cập nhật thành công!", {
            variant: "success",
          });
        } else {
          enqueueSnackbar("Có lỗi xảy ra khi cập nhật avatar.", {
            variant: "error",
          });
        }
      }

      // Cập nhật thông tin người dùng
      const response = await axios.put(`${api}/user/${decoded.USER_ID}`, {
        USERNAME: newUsername,
        PHONE: newPhone,
        ADDRESS: newAddress,
      });

      // Kiểm tra phản hồi từ server
      if (response.data.EC === 1) {
        enqueueSnackbar("Thông tin người dùng đã được cập nhật thành công!", {
          variant: "success",
        });
        fetchtDataUser();
      } else {
        enqueueSnackbar("Có lỗi xảy ra khi cập nhật thông tin người dùng.", {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        error.response?.data?.EM || "Đã xảy ra lỗi khi cập nhật thông tin.",
        { variant: "error" }
      );
      console.error("Lỗi khi cập nhật thông tin người dùng:", error);
    }
  };

  const handleSubmitPassword = async (event) => {
    event.preventDefault();
    if (newPassword !== newPasswordConfirm) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp.");
    } else {
      const response = await axios.post(
        `http://localhost:3002/update-password`,
        { USER_ID: decoded.USER_ID, newPassword: newPasswordConfirm }
      );
      if (response.data.EC === 1) {
        alert("Đổi mật khẩu thành công.");
      }
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      {" "}
      <Box sx={{ padding: "20px", width: "500px" }}>
        <Typography variant="h4" gutterBottom>
          Thông tin người dùng
        </Typography>

        {/* Card thông tin người dùng */}
        <Card
          sx={{
            display: "flex",
            marginBottom: "20px",
            textAlign: "left",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
            <Avatar
              src={`${api}/images/${user?.avatarUrl}`}
              alt={user?.avatarUrl}
              sx={{ width: 80, height: 80, mr: 2 }}
            />
          </label>
          <input
            id="avatar-upload"
            type="file"
            hidden
            accept="image/*"
            onChange={handleAvatarChange}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Email: {user.email}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Số điện thoại: {user.phone}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Địa chỉ: {user.address}
            </Typography>
          </CardContent>
        </Card>

        {/* Form chỉnh sửa thông tin người dùng */}
        <Typography variant="h5" gutterBottom>
          Cập nhật thông tin
        </Typography>
        <form onSubmit={handleSubmitInfo}>
          {/* Thay đổi Tên người dùng */}
          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12}>
              <TextField
                label="Tên người dùng"
                variant="outlined"
                fullWidth
                value={newUsername}
                onChange={handleUsernameChange}
              />
            </Grid>
          </Grid>

          {/* Thay đổi Số điện thoại */}
          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12}>
              <TextField
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                value={newPhone}
                onChange={handlePhoneChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+84</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          {/* Thay đổi Địa chỉ */}
          <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
            <Grid item xs={12}>
              <TextField
                label="Địa chỉ"
                variant="outlined"
                fullWidth
                value={newAddress}
                onChange={handleAddressChange}
              />
            </Grid>
          </Grid>

          {/* Button cập nhật thông tin */}
          <Button
            variant="contained"
            type="button"
            onClick={handleChangProfile}
            sx={{ width: "100%" }}
          >
            Cập nhật thông tin
          </Button>
        </form>

        {/* Nút để hiển thị form thay đổi mật khẩu */}
        <Button
          variant="outlined"
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          sx={{ marginTop: "30px", width: "100%" }}
        >
          {showPasswordForm ? "Hủy thay đổi mật khẩu" : "Thay đổi mật khẩu"}
        </Button>

        {/* Form thay đổi mật khẩu */}
        {showPasswordForm && (
          <form onSubmit={handleSubmitPassword} style={{ marginTop: "20px" }}>
            {/* Mật khẩu cũ */}

            {/* Mật khẩu mới */}
            <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
              <Grid item xs={12}>
                <TextField
                  label="Mật khẩu mới"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>

            {/* Xác nhận mật khẩu */}
            <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
              <Grid item xs={12}>
                <TextField
                  label="Xác nhận mật khẩu mới"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={newPasswordConfirm}
                  onChange={handlePasswordConfirmChange}
                />
              </Grid>
            </Grid>

            {/* Button cập nhật mật khẩu */}
            <Button variant="contained" type="submit" sx={{ width: "100%" }}>
              Cập nhật mật khẩu
            </Button>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;
