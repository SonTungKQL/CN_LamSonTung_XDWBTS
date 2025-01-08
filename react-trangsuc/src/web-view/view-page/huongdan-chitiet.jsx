import React from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { FaRing, FaCircle, FaGem } from "react-icons/fa";

const StyledCard = styled(Card)({
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
  },
});

const StyledCardContent = styled(CardContent)({
  backgroundColor: "#f9f9f9",
  padding: "16px",
});

const StyledButton = styled(Button)({
  backgroundColor: "#1abc9c",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#16a085",
  },
});

const StyledIconButton = styled(IconButton)({
  color: "#1abc9c",
  fontSize: "2rem",
  marginBottom: "8px",
});

const StyledTable = styled(Table)({
  marginTop: "30px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 600,
  backgroundColor: "#1abc9c",
  color: "#fff",
});

const StyledTableBodyCell = styled(TableCell)({
  backgroundColor: "#f9f9f9",
  textAlign: "center",
  padding: "12px 16px",
  fontSize: "1rem",
});

function SizeGuidePage() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "#f9fafb",
        padding: 4,
        borderRadius: 8,
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        marginTop: 4,
      }}
    >
      <Typography
        sx={{
          fontSize: "3rem",
          fontWeight: 600,
          color: "#1abc9c",
          marginBottom: 4,
          textAlign: "center",
        }}
        gutterBottom
      >
        Hướng dẫn chi tiết cách đo kích thước nhẫn, vòng tay, dây chuyền
      </Typography>

      {/* Phần 1: Cách đo nhẫn */}
      <Box sx={{ marginBottom: 5 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#333", textAlign: "center" }}
        >
          <StyledIconButton>
            <FaRing />
          </StyledIconButton>
          1. Cách đo kích thước nhẫn
        </Typography>
        <Divider sx={{ margin: "15px 0", borderColor: "#ddd" }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}
            >
              Để đo kích thước nhẫn chính xác, bạn có thể sử dụng một sợi chỉ
              nhỏ và quấn quanh ngón tay. Đảm bảo không quá chặt để cảm thấy khó
              chịu. Sau đó, dùng thước đo chiều dài của sợi chỉ và đối chiếu với
              bảng đo kích thước nhẫn. Nếu bạn không có thước đo, bạn có thể đến
              cửa hàng trang sức để được đo chính xác. Đừng quên lựa chọn nhẫn
              với độ rộng phù hợp cho ngón tay của mình để cảm thấy thoải mái
              khi đeo.
              <br />
              <br />
              Ngoài ra, bạn cũng có thể sử dụng một chiếc nhẫn mà bạn đã sở hữu.
              Đặt chiếc nhẫn lên một tờ giấy và vẽ theo hình dáng của nó. Sau
              đó, dùng thước đo đường kính bên trong chiếc nhẫn để tính ra kích
              thước.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardMedia
                component="img"
                height="250"
                image="https://wscpearl.com/wp-content/uploads/2021/06/huong-dan-do-size-nhan-1.jpg"
                alt="Cách đo nhẫn"
              />
              <StyledCardContent>
                <Typography variant="body2" color="text.secondary">
                  Hình minh họa cách đo kích thước nhẫn.
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>

      {/* Bảng kích thước nhẫn */}
      <StyledTable>
        <TableContainer component={Paper}>
          <Table aria-label="Size guide table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  Kích thước nhẫn (US)
                </StyledTableCell>
                <StyledTableCell align="center">
                  Đường kính (mm)
                </StyledTableCell>
                <StyledTableCell align="center">Chu vi (mm)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableBodyCell align="center">5</StyledTableBodyCell>
                <StyledTableBodyCell align="center">15.7</StyledTableBodyCell>
                <StyledTableBodyCell align="center">49.3</StyledTableBodyCell>
              </TableRow>
              <TableRow>
                <StyledTableBodyCell align="center">6</StyledTableBodyCell>
                <StyledTableBodyCell align="center">16.5</StyledTableBodyCell>
                <StyledTableBodyCell align="center">51.5</StyledTableBodyCell>
              </TableRow>
              <TableRow>
                <StyledTableBodyCell align="center">7</StyledTableBodyCell>
                <StyledTableBodyCell align="center">17.3</StyledTableBodyCell>
                <StyledTableBodyCell align="center">54.0</StyledTableBodyCell>
              </TableRow>
              <TableRow>
                <StyledTableBodyCell align="center">8</StyledTableBodyCell>
                <StyledTableBodyCell align="center">18.1</StyledTableBodyCell>
                <StyledTableBodyCell align="center">57.3</StyledTableBodyCell>
              </TableRow>
              <TableRow>
                <StyledTableBodyCell align="center">9</StyledTableBodyCell>
                <StyledTableBodyCell align="center">18.9</StyledTableBodyCell>
                <StyledTableBodyCell align="center">59.8</StyledTableBodyCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </StyledTable>

      {/* Phần 2: Cách đo vòng tay */}
      <Box sx={{ marginBottom: 5 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#333", textAlign: "center" }}
        >
          <StyledIconButton>
            <FaCircle />
          </StyledIconButton>
          2. Cách đo kích thước vòng tay
        </Typography>
        <Divider sx={{ margin: "15px 0", borderColor: "#ddd" }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{ fontSize: "1rem", color: "#555", lineHeight: "1.6" }}
            >
              Để đo kích thước vòng tay, bạn có thể sử dụng thước dây để quấn
              quanh cổ tay, đảm bảo thước dây không quá chặt. Đo chiều dài của
              thước dây và đối chiếu với bảng kích thước vòng tay. Nếu không có
              thước dây, bạn có thể sử dụng một sợi chỉ và sau đó đo chiều dài
              bằng thước đo. Đừng quên chọn vòng tay vừa vặn, không quá chặt và
              cũng không quá lỏng.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardMedia
                component="img"
                height="250"
                image="https://wscpearl.com/wp-content/uploads/2021/06/duong-kinh-1.jpg"
                alt="Cách đo vòng tay"
              />
              <StyledCardContent>
                <Typography variant="body2" color="text.secondary">
                  Hình minh họa cách đo vòng tay.
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>

      {/* Bảng kích thước vòng tay */}
      <StyledTable>
        <TableContainer component={Paper}>
          <Table aria-label="Size guide table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  Kích thước vòng tay (US)
                </StyledTableCell>
                <StyledTableCell align="center">
                  Chu vi cổ tay (cm)
                </StyledTableCell>
                <StyledTableCell align="center">
                  Đường kính vòng (cm)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <StyledTableBodyCell align="center">S</StyledTableBodyCell>
                <StyledTableBodyCell align="center">14.5</StyledTableBodyCell>
                <StyledTableBodyCell align="center">4.8</StyledTableBodyCell>
              </TableRow>
              <TableRow>
                <StyledTableBodyCell align="center">M</StyledTableBodyCell>
                <StyledTableBodyCell align="center">16.5</StyledTableBodyCell>
                <StyledTableBodyCell align="center">5.2</StyledTableBodyCell>
              </TableRow>
              <TableRow>
                <StyledTableBodyCell align="center">L</StyledTableBodyCell>
                <StyledTableBodyCell align="center">18.5</StyledTableBodyCell>
                <StyledTableBodyCell align="center">5.6</StyledTableBodyCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </StyledTable>

      {/* Phần 3: Cách đo dây chuyền */}
      <Box sx={{ marginBottom: 5 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, color: "#333", textAlign: "center" }}
        >
          <StyledIconButton>
            <FaGem />
          </StyledIconButton>
          3. Cách đo dây chuyền
        </Typography>
        <Divider sx={{ margin: "15px 0", borderColor: "#ddd" }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1rem",
                color: "#555",
                lineHeight: "1.6",
                textAlign: "center",
              }}
            >
              Để đo kích thước dây chuyền, bạn có thể sử dụng một sợi dây hoặc
              thước dây để đo quanh cổ và sau đó xác định chiều dài phù hợp với
              sở thích của bạn. Bạn có thể chọn dây chuyền ngắn hơn (khoảng
              40-45 cm) hoặc dài hơn (khoảng 50-60 cm) tùy thuộc vào phong cách
              mà bạn muốn. Chọn chiều dài dây chuyền sao cho bạn cảm thấy thoải
              mái và tự tin khi đeo.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardMedia
                component="img"
                height="250"
                image="https://wscpearl.com/wp-content/uploads/2021/06/duong-kinh-1.jpg"
                alt="Cách đo dây chuyền"
              />
              <StyledCardContent>
                <Typography variant="body2" color="text.secondary">
                  Hình minh họa cách đo dây chuyền.
                </Typography>
              </StyledCardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default SizeGuidePage;
