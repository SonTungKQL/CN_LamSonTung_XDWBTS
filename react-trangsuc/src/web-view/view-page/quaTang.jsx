import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container,
  Stack,
} from "@mui/material";

const jewelryGifts = [
  {
    id: 1,
    name: "Vòng cổ bạc sang trọng",
    price: 1500000,
    description:
      "Vòng cổ bạc 925 cao cấp, được thiết kế tinh xảo với mặt đá nhỏ lấp lánh, giúp tôn lên vẻ đẹp thanh lịch và quyến rũ cho người đeo.",
    image:
      "https://www.pnj.com.vn/_next/image?url=https%3A%2F%2Fcdn.pnj.io%2Fimages%2Fpromo%2F234%2Ftrang-suc-sac-xuan256x256.png&w=256&q=100",
  },
  {
    id: 2,
    name: "Nhẫn vàng tinh tế",
    price: 2500000,
    description:
      "Chiếc nhẫn vàng 18K mang thiết kế tối giản, hiện đại, phù hợp làm quà tặng trong các dịp đặc biệt như sinh nhật, lễ kỷ niệm hay cầu hôn.",
    image:
      "https://www.pnj.com.vn/_next/image?url=https%3A%2F%2Fcdn.pnj.io%2Fimages%2Fpromo%2F223%2Fkim_cuong.png&w=256&q=100",
  },
  {
    id: 3,
    name: "Lắc tay kim cương",
    price: 3500000,
    description:
      "Lắc tay đính kim cương nhân tạo lấp lánh, tượng trưng cho sự bền bỉ và tình yêu vĩnh cửu. Đây là món quà hoàn hảo cho người phụ nữ bạn yêu thương.",
    image:
      "https://www.pnj.com.vn/_next/image?url=https%3A%2F%2Fcdn.pnj.io%2Fimages%2Fpromo%2F223%2Fnhan_cuoi.png&w=256&q=100",
  },
  {
    id: 4,
    name: "Bông tai ngọc trai",
    price: 1800000,
    description:
      "Bông tai ngọc trai tự nhiên, với thiết kế cổ điển nhưng không kém phần hiện đại, phù hợp với mọi trang phục và phong cách.",
    image:
      "https://www.pnj.com.vn/_next/image?url=https%3A%2F%2Fcdn.pnj.io%2Fimages%2Fpromo%2F223%2Ftrang_suc_may_man.jpg&w=256&q=100",
  },
];

const JewelryGifts = () => {
  const handleWatch = (id) => {
    alert(`Đã thêm sản phẩm ID: ${id} vào giỏ hàng!`);
  };

  return (
    <Box sx={{ backgroundColor: "#f9f9f9", paddingY: 6 }}>
      <Container>
        {/* Phần giới thiệu chung */}
        <Box sx={{ marginBottom: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", marginBottom: 2 }}
            color="primary"
          >
            Bộ Sưu Tập Quà Tặng Trang Sức
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", lineHeight: 1.8 }}>
            Hãy để những món trang sức tinh tế thay lời bạn muốn nói. Với thiết
            kế sang trọng, ý nghĩa sâu sắc, và vẻ đẹp vĩnh cửu, các sản phẩm
            trong bộ sưu tập này là món quà lý tưởng để bày tỏ tình cảm với
            những người bạn yêu thương. Dù là sinh nhật, lễ kỷ niệm, hay các dịp
            đặc biệt khác, trang sức luôn là sự lựa chọn hoàn hảo.
          </Typography>
        </Box>

        {/* Phần sản phẩm */}
        <Grid container spacing={4}>
          {jewelryGifts.map((jewelry) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={jewelry.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  margin: "auto",
                  "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image={jewelry.image}
                  alt={jewelry.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {jewelry.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#555" }}>
                    {jewelry.description}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#FF5722",
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(jewelry.price)}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 2 }}
                    fullWidth
                    onClick={() => handleWatch()}
                  >
                    Xem thêm
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Phần lý do chọn trang sức */}
        <Box
          sx={{
            marginTop: 8,
            padding: 4,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: 4, textAlign: "center" }}
          >
            Vì Sao Nên Chọn Trang Sức Làm Quà Tặng?
          </Typography>
          <Stack spacing={3}>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555" }}>
              🌟 **Ý nghĩa sâu sắc**: Trang sức không chỉ là món phụ kiện mà còn
              mang thông điệp tình yêu, sự trân trọng và gắn kết. Mỗi món trang
              sức đều chứa đựng câu chuyện và cảm xúc riêng.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555" }}>
              🌟 **Thiết kế sang trọng**: Với sự tỉ mỉ trong từng chi tiết, các
              món trang sức trong bộ sưu tập của chúng tôi mang đến vẻ đẹp hoàn
              mỹ, giúp người nhận tự tin hơn trong mọi dịp.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#555" }}>
              🌟 **Phù hợp mọi dịp**: Dù là sinh nhật, kỷ niệm ngày cưới, hay lễ
              tình nhân, trang sức luôn là lựa chọn an toàn và ý nghĩa nhất.
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default JewelryGifts;
