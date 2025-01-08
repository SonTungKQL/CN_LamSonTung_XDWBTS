import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
} from "@mui/material";
import moment from "moment";
import axios from "axios";

const api = process.env.REACT_APP_URL_SERVER;

const UserAdmin = () => {
  const [customers, setCustomers] = useState([]);

  const [page, setPage] = useState(0); // Trạng thái phân trang
  const [rowsPerPage, setRowsPerPage] = useState(7); // Số hàng trên mỗi trang
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${api}/user`);
      if (response.data.EC === 1) {
        setCustomers(response.data.DT);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedcustomer = customers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container>
      <Box sx={{ width: "100%", textAlign: "left", mt: 4 }}>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ textAlign: "left", color: "#000" }} // Đổi màu chữ sang đen
        >
          DANH SÁCH KHÁCH HÀNG
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#000" }}>ID</TableCell>{" "}
              {/* Đổi màu chữ thành đen */}
              <TableCell sx={{ color: "#000" }}>Tên đăng nhập</TableCell>
              <TableCell sx={{ color: "#000" }}>Email</TableCell>
              <TableCell sx={{ color: "#000" }}>Địa chỉ</TableCell>
              <TableCell sx={{ color: "#000" }}>SĐT</TableCell>
              <TableCell sx={{ color: "#000" }}>Ghi chú</TableCell>
              <TableCell sx={{ color: "#000" }}>Ngày tạo</TableCell>
              <TableCell sx={{ color: "#000" }}>Ngày cập nhật</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedcustomer.map((customer) => (
              <TableRow key={customer.USER_ID}>
                <TableCell sx={{ color: "#000" }}>{customer.USER_ID}</TableCell>
                <TableCell sx={{ color: "#000" }}>
                  {customer.USERNAME}
                </TableCell>
                <TableCell sx={{ color: "#000" }}>{customer.EMAIL}</TableCell>
                <TableCell sx={{ color: "#000" }}>
                  {customer.ADDRESS_}
                </TableCell>
                <TableCell sx={{ color: "#000" }}>{customer.PHONE}</TableCell>
                <TableCell sx={{ color: "#000" }}>
                  {customer.USER_STATUS}
                </TableCell>
                <TableCell sx={{ color: "#000" }}>
                  {moment(customer.CREATED_AT).format("HH:mm:ss - DD/MM/YYYY")}
                </TableCell>
                <TableCell sx={{ color: "#000" }}>
                  {moment(customer.UPDATED_AT).format("HH:mm:ss - DD/MM/YYYY")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: "#000" }} // Đổi màu chữ thành đen
      />
    </Container>
  );
};

export default UserAdmin;
