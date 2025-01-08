import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f9f9f9", p: 4, mt: 4 }}>
      <Grid container spacing={4}>
        {/* Logo và thông tin công ty */}
        <Grid item xs={12} md={4}>
          <img
            src="https://www.pnj.com.vn/_next/image?url=https%3A%2F%2Fcdn.pnj.io%2Fimages%2Flogo%2Fpnj.com.vn.png&w=256&q=75"
            alt="PNJ Logo"
            style={{ width: 100 }}
          />
          <Typography variant="body2" sx={{ mt: 2 }}>
            © 2017 Công Ty Cổ Phần Vàng Bạc Đá Quý Phú Nhuận
          </Typography>
          <Typography variant="body2">
            170E Phan Đăng Lưu, P.3, Q.Phú Nhuận, TP.Hồ Chí Minh
          </Typography>
          <Typography variant="body2">
            ĐT: 028 3995 1703 - Fax: 028 3995 1702
          </Typography>
          <Link
            href="#"
            underline="hover"
            sx={{ color: "primary.main", fontSize: "0.875rem" }}
          >
            Giấy chứng nhận đăng ký doanh nghiệp
          </Link>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Tổng đài hỗ trợ (08:00-21:00, miễn phí gọi): <br />
            Gọi mua: <Link href="tel:1800545457">1800545457 (phím 1)</Link>{" "}
            <br />
            Khiếu nại: <Link href="tel:1800545457">1800545457 (phím 2)</Link>
          </Typography>
        </Grid>

        {/* Các mục */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
            Về PNJ
          </Typography>
          <Link href="#" underline="hover">
            Câu chuyện PNJ
          </Link>
          <Link href="#" underline="hover">
            Tuyển dụng
          </Link>
          <Link href="#" underline="hover">
            Xuất khẩu
          </Link>
          <Link href="#" underline="hover">
            Kinh doanh sỉ
          </Link>
          <Link href="#" underline="hover">
            Kiểm định kim cương
          </Link>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
            Dịch vụ khách hàng
          </Typography>
          <Link href="#" underline="hover">
            Hướng dẫn đo size trang sức
          </Link>
          <Link href="#" underline="hover">
            Mua hàng trả góp
          </Link>
          <Link href="#" underline="hover">
            Hướng dẫn mua hàng và thanh toán
          </Link>
          <Link href="#" underline="hover">
            Cẩm nang sử dụng trang sức
          </Link>
          <Link href="#" underline="hover">
            Câu hỏi thường gặp
          </Link>
        </Grid>

        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
            Tổng hợp các chính sách PNJ
          </Typography>
          <Link href="#" underline="hover">
            Chính sách hoàn tiền
          </Link>
          <Link href="#" underline="hover">
            Chính sách giao hàng
          </Link>
          <Link href="#" underline="hover">
            Chính sách bảo hành thu đổi
          </Link>
          <Link href="#" underline="hover">
            Chính sách khách hàng thân thiết
          </Link>
          <Link href="#" underline="hover">
            Chính sách bảo mật thông tin
          </Link>
        </Grid>

        {/* Kết nối */}
        <Grid item xs={6} md={2}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
            Kết nối với chúng tôi
          </Typography>
          <IconButton href="#" color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton href="#" color="error">
            <InstagramIcon />
          </IconButton>
          <IconButton href="#" color="error">
            <YouTubeIcon />
          </IconButton>
          <IconButton href="#" color="primary">
            <EmailIcon />
          </IconButton>
        </Grid>
      </Grid>

      {/* Dưới cùng */}
      {/* <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="body2">Phương thức thanh toán:</Typography>
        <img
          src="/path/to/payment-icons.png"
          alt="Payment Methods"
          style={{ maxWidth: "100%", height: 40 }}
        />
      </Box> */}
    </Box>
  );
};

export default Footer;
