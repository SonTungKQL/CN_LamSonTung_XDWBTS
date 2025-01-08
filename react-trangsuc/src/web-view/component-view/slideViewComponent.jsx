import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dongho2 from "../../public/slide-view/dongho2.png";
import nhancuoi from "../../public/slide-view/nhan-cuoi.png";
import daychuyenvang from "../../public/slide-view/day-chuyen-vang.png";
import bongtaivang from "../../public/slide-view/bong-tai-vang.png";
import bongtaikimcuong from "../../public/slide-view/bong-tai-kim-cuong.png";
import lacvongtay from "../../public/slide-view/lac-vong-tay.png";

const products = [
  { name: "Nhẫn Kim Cương", image: dongho2 },
  { name: "Bông Tai Vàng", image: nhancuoi },
  { name: "Bông Tai Kim Cương", image: daychuyenvang },
  { name: "Lắc – Vòng Tay Vàng", image: bongtaivang },
  { name: "Nhẫn ECZ", image: bongtaikimcuong },
  { name: "Bông Tai Vàng", image: nhancuoi },
  { name: "Bông Tai Kim Cương", image: daychuyenvang },
  { name: "Lắc – Vòng Tay Vàng", image: bongtaivang },
  { name: "Nhẫn Vàng", image: lacvongtay },
  { name: "Nhẫn Vàng", image: lacvongtay },
  { name: "Nhẫn Vàng", image: lacvongtay },
  { name: "Nhẫn Kim Cương", image: dongho2 },
  { name: "Bông Tai Vàng", image: nhancuoi },
  { name: "Bông Tai Kim Cương", image: daychuyenvang },
  { name: "Lắc – Vòng Tay Vàng", image: bongtaivang },
  { name: "Nhẫn Vàng", image: lacvongtay },
  { name: "Nhẫn Kim Cương", image: dongho2 },
  { name: "Nhẫn Vàng", image: lacvongtay },

  { name: "Bông Tai Vàng", image: nhancuoi },
];

const TrendingProducts = () => {
  const [visibleIndex, setVisibleIndex] = React.useState(0);

  const handlePrev = () => {
    setVisibleIndex((prev) =>
      prev > 0 ? prev - 1 : Math.floor(products.length / 5)
    );
  };

  const handleNext = () => {
    setVisibleIndex((prev) =>
      prev < Math.floor(products.length / 5) ? prev + 1 : 0
    );
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <IconButton onClick={handlePrev}>
        <ArrowBackIosIcon />
      </IconButton>
      <Box sx={{ display: "flex", overflow: "hidden", width: "80%" }}>
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${visibleIndex * 100}%)`,
          }}
        >
          {products.map((product, index) => (
            <Box
              key={index}
              sx={{
                width: "20%", // Adjust width to show 3 products per slide
                textAlign: "center",
                flexShrink: 0,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "60%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
              <Typography>{product.name}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <IconButton onClick={handleNext}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default TrendingProducts;
