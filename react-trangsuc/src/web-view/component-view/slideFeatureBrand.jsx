import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import daychuyenvang from "../../public/slideFeatureBrand/img1.jpg";
import daychuyenvang1 from "../../public/slideFeatureBrand/img2.jpg";
import daychuyenvang2 from "../../public/slideFeatureBrand/img3.jpg";
import daychuyenvang3 from "../../public/slideFeatureBrand/img4.jpg";

const brands = [
  { title: "Mật Mã Quý Ông", image: daychuyenvang1, logo: "MANCODE by PNJ" },
  {
    title: "Sakura Time 2 - Khoảnh Khắc Rực Rỡ",
    image: daychuyenvang3,
    logo: "PNJ x Hello Kitty",
  },
  { title: "Mật Mã Quý Ông", image: daychuyenvang1, logo: "MANCODE by PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "Mật Mã Quý Ông", image: daychuyenvang1, logo: "MANCODE by PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "Mật Mã Quý Ông", image: daychuyenvang1, logo: "MANCODE by PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  {
    title: "Sakura Time 2 - Khoảnh Khắc Rực Rỡ",
    image: daychuyenvang3,
    logo: "PNJ x Hello Kitty",
  },
  {
    title: "Sakura Time - Khoảnh Khắc Rực Rỡ",
    image: daychuyenvang2,
    logo: "PNJ x Hello Kitty",
  },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  { title: "My Princess Moment", image: daychuyenvang, logo: "Disney | PNJ" },
  {
    title: "Sakura Time 2 - Khoảnh Khắc Rực Rỡ",
    image: daychuyenvang3,
    logo: "PNJ x Hello Kitty",
  },
];

const FeaturedBrands = () => {
  const [visibleIndex, setVisibleIndex] = React.useState(0);
  const itemsPerSlide = 3; // Điều chỉnh số lượng hình ảnh mỗi lần chuyển slide

  const handlePrev = () => {
    setVisibleIndex((prev) =>
      prev > 0 ? prev - itemsPerSlide : brands.length - itemsPerSlide
    );
  };

  const handleNext = () => {
    setVisibleIndex((prev) =>
      prev < brands.length - itemsPerSlide ? prev + itemsPerSlide : 0
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <IconButton
        onClick={handlePrev}
        sx={{ position: "absolute", left: 0 }}
        disabled={visibleIndex === 0} // Vô hiệu hóa nút khi đã đến đầu danh sách
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          width: "80%",
          position: "relative",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition: "transform 1s ease-in-out",
            transform: `translateX(-${(visibleIndex / itemsPerSlide) * 10}%)`,
          }}
        >
          {brands.map((brand, index) => (
            <Card
              key={index}
              sx={{
                minWidth: "300px",
                margin: "0 8px",
                flexShrink: 0,
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                image={brand.image}
                alt={brand.title}
                sx={{ height: "300px", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6">{brand.title}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {brand.logo}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      <IconButton
        onClick={handleNext}
        sx={{ position: "absolute", right: 0 }}
        disabled={visibleIndex >= brands.length - itemsPerSlide} // Vô hiệu hóa nút khi đã đến cuối danh sách
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default FeaturedBrands;
