import React from "react";
import { Container, Typography, Paper, Grid, Box, Button } from "@mui/material";
import {
  Pets,
  LocalLaundryService,
  Home,
  BeachAccess,
  FilterVintage,
} from "@mui/icons-material"; // Thêm các icon từ Material-UI

function JewelryCareGuide() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "#f9f9f9",
        padding: 4,
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        sx={{
          fontSize: "2.5rem",
          fontWeight: 600,
          color: "#1abc9c",
          marginBottom: 3,
        }}
        align="center"
        gutterBottom
      >
        Cách bảo quản trang sức để luôn sáng đẹp và bền lâu
      </Typography>

      <Grid container spacing={4} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Pets sx={{ marginRight: 1, color: "#1abc9c" }} /> 1. Tránh tiếp
              xúc với hóa chất
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#34495e",
                fontSize: "16px",
                lineHeight: "1.7",
                marginBottom: 2,
              }}
            >
              Hóa chất có thể gây hại cho trang sức của bạn, làm giảm độ sáng và
              có thể gây ăn mòn. Các chất như nước hoa, kem dưỡng da, mỹ phẩm
              hoặc chất tẩy rửa có thể làm hỏng bề mặt của trang sức.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#34495e",
                fontSize: "16px",
                lineHeight: "1.7",
                marginBottom: 2,
              }}
            >
              Đặc biệt là đối với những trang sức có lớp phủ vàng hoặc bạc, việc
              tiếp xúc với các hóa chất này sẽ làm mờ đi vẻ đẹp tự nhiên của kim
              loại. Hãy nhớ tháo trang sức khi sử dụng các sản phẩm như nước
              hoa, xà phòng, hoặc kem dưỡng da. Việc này sẽ giúp bảo vệ độ bóng
              sáng và giữ cho trang sức luôn bền đẹp.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LocalLaundryService sx={{ marginRight: 1, color: "#1abc9c" }} />{" "}
              2. Làm sạch đúng cách
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#34495e",
                fontSize: "16px",
                lineHeight: "1.7",
                marginBottom: 2,
              }}
            >
              Việc làm sạch trang sức định kỳ là rất quan trọng để giữ cho chúng
              luôn sáng bóng. Tuy nhiên, bạn cần phải làm sạch đúng cách để
              tránh làm hỏng các chi tiết của trang sức. Để vệ sinh trang sức,
              bạn nên sử dụng các chất tẩy rửa nhẹ nhàng hoặc dung dịch nước ấm
              pha với xà phòng.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#34495e",
                fontSize: "16px",
                lineHeight: "1.7",
                marginBottom: 2,
              }}
            >
              Đối với trang sức vàng và bạc, bạn có thể sử dụng bàn chải mềm để
              làm sạch các vết bẩn mà không làm trầy xước bề mặt. Lưu ý rằng bạn
              không nên sử dụng các chất tẩy mạnh hoặc bàn chải cứng, vì điều
              này có thể gây hư hỏng hoặc làm mất đi độ sáng của trang sức.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Home sx={{ marginRight: 1, color: "#1abc9c" }} /> 3. Cất giữ cẩn
              thận
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#34495e",
                fontSize: "16px",
                lineHeight: "1.7",
                marginBottom: 2,
              }}
            >
              Khi không sử dụng trang sức, việc bảo quản đúng cách là yếu tố
              quan trọng để giữ cho chúng luôn bền đẹp. Hãy sử dụng hộp đựng
              trang sức có lớp lót mềm để tránh va đập hoặc xước các bề mặt.
              Ngoài ra, bạn cũng có thể sử dụng các túi đựng trang sức mềm để
              tránh chúng tiếp xúc trực tiếp với không khí, giữ cho kim loại
              không bị oxy hóa.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": { boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)" },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#2c3e50",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BeachAccess sx={{ marginRight: 1, color: "#1abc9c" }} /> 4. Tránh
              để trang sức tiếp xúc với nước
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#34495e",
                fontSize: "16px",
                lineHeight: "1.7",
                marginBottom: 2,
              }}
            >
              Nước có thể làm giảm tuổi thọ của nhiều loại trang sức, đặc biệt
              là những món trang sức có kim loại dễ bị oxi hóa như đồng, bạc.
              Khi trang sức bị ướt, các chất tẩy rửa có thể dễ dàng bám vào và
              làm hỏng lớp hoàn thiện của chúng.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#1abc9c",
            color: "#ffffff",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "30px",
            "&:hover": { backgroundColor: "#16a085" },
          }}
        >
          Khám Phá Các Mẫu Trang Sức Mới
        </Button>
      </Box>
    </Container>
  );
}

export default JewelryCareGuide;
