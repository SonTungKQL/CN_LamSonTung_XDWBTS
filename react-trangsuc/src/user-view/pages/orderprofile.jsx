import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const token = Cookies.get("accessToken");
  const [toggledOrder, setToggledOrder] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setDecoded(decodedToken);
      } catch (error) {
        console.error("Token không hợp lệ", error);
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (decoded && decoded.USER_ID) {
        try {
          const response = await axios.post(
            `http://localhost:3002/api/order/ordercanhan`,
            { USER_ID: decoded.USER_ID }
          );
          setOrders(response.data.DT);
        } catch (err) {
          setError(err.message || "Đã xảy ra lỗi khi lấy dữ liệu.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [decoded]);

  const fetchOrderDetail = async (orderId) => {
    setDetailLoading(true);
    setDetailError(null);
    try {
      const response = await axios.post(
        `http://localhost:3002/api/order/getDonhangchitiet`,
        { USER_ID: decoded.USER_ID, ORDER_ID: orderId }
      );
      setSelectedOrder(response.data.DT);
    } catch (err) {
      setDetailError(err.message || "Đã xảy ra lỗi khi lấy chi tiết đơn hàng.");
    } finally {
      setDetailLoading(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Lỗi: {error}</Typography>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Thông tin đơn hàng
      </Typography>
      {orders.length === 0 ? (
        <Typography>Bạn chưa có đơn hàng nào.</Typography>
      ) : (
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Ngày đặt hàng</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.ORDER_ID_}>
                  <TableCell>{order.ORDER_ID_}</TableCell>
                  <TableCell>
                    {new Date(order.CREATED_AT_).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.TOTAL_PRICE_
                      ? parseFloat(order.TOTAL_PRICE_).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "Không xác định"}
                  </TableCell>
                  <TableCell>{order.ORDER_STATUS_}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (toggledOrder === order.ORDER_ID_) {
                          setToggledOrder(null); // Nếu đã mở, đóng lại
                        } else {
                          setToggledOrder(order.ORDER_ID_);
                          fetchOrderDetail(order.ORDER_ID_); // Lấy chi tiết đơn hàng khi mở
                        }
                      }}
                    >
                      {toggledOrder === order.ORDER_ID_
                        ? "Đóng"
                        : "Xem chi tiết"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {detailLoading && <CircularProgress style={{ marginTop: "20px" }} />}

      {selectedOrder && toggledOrder && selectedOrder.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #ddd",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Chi tiết đơn hàng #{selectedOrder[0]?.ORDER_ID_ || "N/A"}
          </Typography>
          <Typography>
            Ngày đặt hàng: {selectedOrder[0]?.CREATED_AT || "Chưa có thông tin"}
          </Typography>
          <Typography>
            Tổng tiền:{" "}
            {selectedOrder[0]?.TOTAL_PRICE_
              ? selectedOrder[0].TOTAL_PRICE_.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : "Chưa có thông tin"}
          </Typography>
          <Typography>
            Trạng thái: {selectedOrder[0]?.ORDER_STATUS_ || "Chưa có thông tin"}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Sản phẩm:
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Số lượng</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Thành tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedOrder.map((product) => (
                  <TableRow key={product.PRODUCT_ID}>
                    <TableCell>{product.NAME || "Không xác định"}</TableCell>
                    <TableCell>{product.QUANTITY || 0}</TableCell>
                    <TableCell>
                      {product.PRICE
                        ? product.PRICE.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                        : "0 VND"}
                    </TableCell>
                    <TableCell>
                      {product.PRICE && product.QUANTITY
                        ? (product.PRICE * product.QUANTITY).toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )
                        : "0 VND"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
