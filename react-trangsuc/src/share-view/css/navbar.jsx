import React, { Component, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const api = process.env.REACT_APP_URL_SERVER;
  const navigate = useNavigate();
  const handleClickHuongdan = (checkhuongdan) => {
    const key = new Date().getTime(); // Tạo key mới mỗi lần bấm
    if (checkhuongdan === 1) {
      navigate("/huongdan-baoquan");
    } else if (checkhuongdan === 2) {
      navigate("/huongdan-chitiet");
    } else if (checkhuongdan === 3) {
      navigate("/cauhoi");
    } else if (checkhuongdan === 4) {
      navigate("/productlist", { state: { danhmuc: "tất cả", key } });
    } else if (checkhuongdan === 5) {
      navigate("/productlist", { state: { danhmuc: "Trang sức cưới", key } });
    } else if (checkhuongdan === 6) {
      navigate("/productlist", { state: { danhmuc: "Đồng hồ", key } });
    }
  };
  const [searchTerm, setSearchTerm] = useState(""); // Lưu giá trị tìm kiếm
  const [searchResults, setSearchResults] = useState([]); // Lưu kết quả tìm kiếm
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading

  // Hàm xử lý tìm kiếm
  const fetchSearchResults = async (term) => {
    if (!term.trim()) {
      setSearchResults([]); // Nếu từ khóa rỗng, xóa kết quả
      return;
    }

    setIsLoading(true); // Bắt đầu loading
    try {
      const response = await axios.get(`${api}/san-pham/search`, {
        params: { query: term },
      });
      if (response.data.EC === 1) {
        setSearchResults(response.data.DT); // Cập nhật danh sách kết quả
      } else {
        setSearchResults([]); // Không có kết quả
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setSearchResults([]); // Lỗi thì không hiển thị kết quả
    }
    setIsLoading(false); // Kết thúc loading
  };

  // Xử lý khi người dùng nhập
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value); // Cập nhật từ khóa tìm kiếm
    fetchSearchResults(value); // Gọi API tìm kiếm
  };

  const handleMoveSelectProducts = (id) => {
    setSearchResults([]);
    setSearchTerm(null);
    navigate(`/select-product/${id}`);
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        {/* Left section: Navbar buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            sx={{ color: "black", fontSize: "16px" }}
            onClick={() => handleClickHuongdan(4)}
          >
            Trang Sức
          </Button>
          {/* <Button
            sx={{ color: "black", fontSize: "16px" }}
            onClick={() => handleClickHuongdan(5)}
          >
            Trang Sức Cưới
          </Button>
          <Button
            sx={{ color: "black", fontSize: "16px" }}
            onClick={() => handleClickHuongdan(6)}
          >
            Đồng Hồ
          </Button> */}
          <Button
            sx={{ color: "black", fontSize: "16px" }}
            component={Link}
            to="qua-tang"
          >
            Quà Tặng
          </Button>
          <Button sx={{ color: "black", fontSize: "16px" }}>Thương Hiệu</Button>
          <Button
            sx={{ color: "black", fontSize: "16px" }}
            component={Link}
            to="/blog"
          >
            Blog
          </Button>
          <Button
            sx={{ color: "black", fontSize: "16px" }}
            onClick={() => handleClickHuongdan(1)}
          >
            Hướng dẫn bảo quản
          </Button>
          <Button
            sx={{ color: "black", fontSize: "16px" }}
            onClick={() => handleClickHuongdan(2)}
          >
            Hướng dẫn đo kích thước
          </Button>
          <Button
            sx={{ color: "black", fontSize: "16px" }}
            onClick={() => handleClickHuongdan(3)}
          >
            Câu hỏi thường gặp
          </Button>
        </Box>

        {/* Right section: Search bar */}
        {/* Right section: Search bar */}
        <Box
          sx={{ display: "flex", alignItems: "center", position: "relative" }}
        >
          <TextField
            variant="outlined"
            placeholder="Tìm kiếm "
            size="small"
            value={searchTerm}
            onChange={handleChange} // Thay đổi giá trị khi nhập
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              width: "250px",
              marginRight: 2,
            }}
          />
          <IconButton sx={{ color: "black" }}>
            <SearchIcon />
          </IconButton>

          {/* Hiển thị kết quả */}
          {isLoading ? (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "250px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                zIndex: 10,
                borderRadius: "4px",
                padding: "8px",
              }}
            >
              Đang tìm kiếm...
            </Box>
          ) : (
            searchResults.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  width: "250px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  zIndex: 10,
                  borderRadius: "4px",
                  maxHeight: "200px",
                  cursor: "pointer",
                  overflowY: "auto",
                }}
              >
                <List>
                  {searchResults.map((item) => (
                    <ListItem key={item.ID} button>
                      <ListItemText
                        onClick={() =>
                          handleMoveSelectProducts(item.PRODUCT_ID)
                        }
                        sx={{ color: "#000" }}
                        primary={item.NAME}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
