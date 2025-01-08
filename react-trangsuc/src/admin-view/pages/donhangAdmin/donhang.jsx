import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tabs,
  Tab,
  TablePagination,
} from "@mui/material";
import axios from "axios";

const OrderManagement = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Trạng thái đơn hàng đang chọn
  const [orders, setOrders] = useState([]); // Danh sách đơn hàng
  const [openDialog, setOpenDialog] = useState(false); // Trạng thái hiển thị dialog
  const [selectedOrder, setSelectedOrder] = useState(null); // Đơn hàng đang được xem chi tiết

  // Thêm các state cho phân trang
  const [page, setPage] = useState(0); // Trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số lượng đơn hàng trên mỗi trang
  const [totalOrders, setTotalOrders] = useState(0);
  const api = process.env.REACT_APP_URL_SERVER;

  const fetchOrders = async (status) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/api/home/use/getalldonhangadmin`,
        {
          ORDER_STATUS: status,
        }
      );

      if (response.data.EC === 1) {
        setOrders(response.data.DT); // Cập nhật danh sách đơn hàng
        setTotalOrders(response.data.DT.length); // Cập nhật tổng số đơn hàng
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu đơn hàng", error);
    }
  };
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.post(
        `http://localhost:3002/api/home/use/getallchitietdonhangadmin`,
        {
          ORDER_ID: orderId,
        }
      );
      console.log(response.data);
      if (response.data.EC === 1) {
        setSelectedOrder((prevOrder) => ({
          ...prevOrder,
          PRODUCTS: response.data.DT,
        })); // Cập nhật sản phẩm của đơn hàng
      }
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm đơn hàng", error);
    }
  };

  useEffect(() => {
    if (selectedTab === 0) {
      fetchOrders("pending"); // Đang xác nhận
    } else if (selectedTab === 1) {
      fetchOrders("success"); // Đang xử lý
    } else if (selectedTab === 2) {
      fetchOrders("canceled"); // Đã hủy
    }
    setPage(0);
  }, [selectedTab]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Lưu thông tin đơn hàng cần xem chi tiết
    fetchOrderDetails(order.ORDER_ID_); // Lấy chi tiết sản phẩm của đơn hàng
    setOpenDialog(true); // Mở dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Đóng dialog
    setSelectedOrder(null); // Reset đơn hàng đã chọn
  };

  const handleUpdateStatus = async (status, id) => {
    try {
      console.log(id);
      const response = await axios.post(
        `http://localhost:3002/api/home/use/updateStatusdonhang`,
        {
          ORDER_ID: id,
          ORDER_STATUS_: status,
        }
      );
      if (response.data.EC === 1) {
        setSelectedOrder({
          ...selectedOrder,
          ORDER_STATUS_: status, // Cập nhật trạng thái đơn hàng
        });
        fetchOrders(
          selectedTab === 0
            ? "pending"
            : selectedTab === 1
            ? "success"
            : "canceled"
        );
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng", error);
    }
  };

  // Hàm xử lý thay đổi trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Hàm xử lý thay đổi số lượng dòng mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset trang về đầu khi thay đổi số lượng phần tử mỗi trang
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Quản lý đơn hàng
      </Typography>

      {/* Navbar (Tabs hoặc Buttons cho các trạng thái đơn hàng) */}
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)}
        aria-label="Order Status Tabs"
        indicatorColor="primary"
        textColor="primary"
        sx={{ marginBottom: "20px" }}
      >
        <Tab label="Đang xác nhận" />
        <Tab label="Thành công" />
        <Tab label="Đã hủy" />
      </Tabs>

      {/* Danh sách đơn hàng theo trạng thái (Sử dụng bảng) */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Tên khách hàng</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Địa chỉ giao hàng</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Không có đơn hàng nào
                </TableCell>
              </TableRow>
            ) : (
              // Chỉ hiển thị các đơn hàng trong trang hiện tại
              orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow key={order.ORDER_ID_}>
                    <TableCell>{order.ORDER_ID_}</TableCell>
                    <TableCell>{order.USERNAME}</TableCell>
                    <TableCell>{order.PHONE_ODER}</TableCell>
                    <TableCell>{order.ADDRESS_ODER}</TableCell>
                    <TableCell>{order.ORDER_STATUS_}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleViewDetails(order)}
                      >
                        Xem chi tiết
                      </Button>

                      {/* Ẩn nút Xác nhận khi đơn hàng đã thành công */}
                      {selectedTab !== 1 && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            handleUpdateStatus("success", order.ORDER_ID_)
                          }
                          sx={{ marginLeft: "10px" }}
                        >
                          Xác nhận
                        </Button>
                      )}

                      {/* Ẩn nút Hủy khi đơn hàng đã bị hủy */}
                      {selectedTab !== 2 && (
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleUpdateStatus("canceled", order.ORDER_ID_)
                          }
                          sx={{ marginLeft: "10px" }}
                        >
                          Hủy đơn hàng
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalOrders} // Sử dụng tổng số đơn hàng
        rowsPerPage={rowsPerPage} // Số lượng đơn hàng mỗi trang
        page={page} // Trang hiện tại
        onPageChange={handleChangePage} // Hàm thay đổi trang
        onRowsPerPageChange={handleChangeRowsPerPage} // Hàm thay đổi số lượng dòng mỗi trang
      />

      {/* Dialog hiển thị chi tiết đơn hàng */}
      {selectedOrder && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Chi tiết đơn hàng {selectedOrder.ORDER_ID_}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              Mã đơn hàng: {selectedOrder.ORDER_ID_}
            </Typography>
            <Typography variant="body1">
              Tên khách hàng: {selectedOrder.USERNAME}
            </Typography>
            <Typography variant="body1">
              Số điện thoại: {selectedOrder.PHONE_ODER}
            </Typography>
            <Typography variant="body1">
              Địa chỉ giao hàng: {selectedOrder.ADDRESS_ODER}
            </Typography>
            <Typography variant="body1">
              Trạng thái: {selectedOrder.ORDER_STATUS_}
            </Typography>

            {/* Hiển thị bảng các sản phẩm trong đơn hàng */}
            <Typography variant="h6" sx={{ marginTop: "20px" }}>
              Các sản phẩm trong đơn hàng:
            </Typography>
            <TableContainer component={Paper} sx={{ marginTop: "10px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Hình</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Giá</TableCell>
                    <TableCell>Tổng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder.PRODUCTS?.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>{product.NAME}</TableCell>
                      <TableCell>
                        <img
                          src={`${api}/images/${product.IMAGE_URL_}`} // Đảm bảo rằng đây là URL hợp lệ của hình ảnh
                          alt={product.PRODUCT_NAME}
                          style={{
                            width: "50px",
                            height: "50px",
                            marginRight: "10px",
                          }} // Điều chỉnh kích thước theo nhu cầu
                        />
                      </TableCell>
                      <TableCell>{product.QUANTITY}</TableCell>
                      <TableCell>{product.PRICE}</TableCell>
                      <TableCell>{product.QUANTITY * product.PRICE}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default OrderManagement;
