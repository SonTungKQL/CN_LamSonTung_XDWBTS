import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto"; // Để tránh lỗi khi dùng Chart.js 3+
import Plot from "react-plotly.js";
import { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Bar } from "react-chartjs-2";
import { Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement
);

const api = process.env.REACT_APP_URL_SERVER;
const DashboardAdmin = () => {
  const [chartData2, setChartData2] = useState(null);
  const [userData, setUserData] = useState([]);
  const [donutData, setDonutData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [totalData, settotalData] = useState([]);

  const cards = [
    {
      icon: "bi-graph-up",
      title: "Today Sale",
      amount: totalData?.results3?.[0]?.tong_tien_hom_nay || 0, // Truy cập trực tiếp object
    },
    {
      icon: "bi-bar-chart",
      title: "Monthly Sale",
      amount: totalData?.results4?.[0]?.tong_tien_thang_nay || 0, // Truy cập trực tiếp object
    },
    {
      icon: "bi-graph-down",
      title: "Total Revenue",
      amount: totalData?.results?.[0]?.tong_tien || 0, // Truy cập trực tiếp object
    },
    {
      icon: "bi-pie-chart-fill",
      title: "Top User",
      amount: totalData?.results2?.[0]?.ten_khach_hang || "không có", // Truy cập trực tiếp object
    },
  ];

  const chartData = {
    labels:
      barData && barData.length > 0 && barData.map((barData) => barData.thang), // Các nhãn trên trục X
    datasets: [
      {
        label: "Sales", // Tiêu đề cho dữ liệu
        data:
          barData &&
          barData.length > 0 &&
          barData.map((barData) => barData.so_luong_hoa_don), // Dữ liệu biểu đồ
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Màu nền cột
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền cột
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#333" }, // Màu chữ tối cho legend
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.dataset.label + ": " + context.raw;
          },
        },
      },
      title: {
        display: true,
        text: "Sales Over Months",
        font: {
          size: 18,
          weight: "bold",
          family: "Arial",
        },
        color: "black", // Màu chữ tiêu đề đen
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#ccc", // Màu của lưới trục Y sáng hơn
        },
      },
      x: {
        grid: {
          color: "#ccc", // Màu của lưới trục X sáng hơn
        },
      },
    },
    layout: {
      padding: 10,
    },
    backgroundColor: "#ffffff", // Màu nền trắng cho canvas
    borderColor: "#ffffff", // Màu viền trắng cho biểu đồ
    plot_bgcolor: "#ffffff", // Màu nền vùng biểu đồ trắng
    paper_bgcolor: "#ffffff", // Màu nền giấy trắng
    font: {
      color: "black", // Màu chữ đen
    },
  };

  const cardStyle = {
    backgroundColor: "#ffffff", // Màu nền trắng
    color: "black", // Màu chữ đen
    padding: "1rem",
    display: "flex",
    alignItems: "center",
    height: "100%",
    border: "none",
  };

  const iconStyle = {
    fontSize: "2rem",
    color: "blue", // Màu của biểu tượng xanh
    marginRight: "1rem",
  };

  useEffect(() => {
    // Gọi API từ server Python để lấy dữ liệu biểu đồ
    fetch("http://localhost:5000/api/chart")
      .then((response) => response.json())
      .then((data) => {
        if (data.EM === "Success") {
          // Kiểm tra xem dữ liệu biểu đồ có đúng không
          console.log(data.DT);
          try {
            setChartData2(data.DT);
          } catch (e) {
            console.error("Error parsing chart data:", e);
          }
        } else {
          console.error("Error fetching chart:", data.EM);
        }
      })
      .catch((error) => console.error("Error fetching chart data:", error));
  }, []);

  const fetchDatatable = async () => {
    const [responsedatauser, responsedatadonut, Responsebar, responseTotal] =
      await Promise.all([
        axios.get(`${api}/api/home/use/danhsachkhachhang`),
        axios.get(`${api}/api/home/use/tongsoluongcuatop3`),
        axios.get(`${api}/api/home/use/danhsachordertheotime`),
        axios.get(`${api}/api/home/use/laytongsoluongnhieunhat`),
      ]);

    if (responsedatauser.data.EC === 1) {
      setUserData(responsedatauser.data.DT);
    }

    if (responsedatadonut.data.EC === 1) {
      setDonutData(responsedatadonut.data.DT);
    }
    if (Responsebar.data.EC === 1) {
      setBarData(Responsebar.data.DT);
    }
    if (responseTotal.data.EC === 1) {
      console.log("checkasojdhaodhaksdhahdk", responseTotal.data.DT);
      settotalData(responseTotal.data.DT);
    }
  };

  useEffect(() => {
    fetchDatatable();
    console.log("ádadadadadada", totalData);
  }, []);

  //////////////donut chart

  const doughnutData = {
    labels:
      donutData &&
      donutData.length > 0 &&
      donutData.map((donutData) => donutData.nhom_san_pham),
    datasets: [
      {
        label: "Votes",
        data:
          donutData &&
          donutData.length > 0 &&
          donutData.map((donutData) => donutData.so_luong),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF8A80",
          "#81C784",
          "#FFD54F",
        ], // Màu nền cho các phần
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF8A80",
          "#81C784",
          "#FFD54F",
        ], // Tương tự với hover
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#333" }, // Màu chữ tối cho legend
      },
    },
  };
  ///////////////////////////////////
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (user) => {
    // Logic for editing user
    console.log("Editing", user);
  };

  const handleDelete = (user) => {
    // Logic for deleting user
    console.log("Deleting", user);
  };

  return (
    <>
      {" "}
      <div>
        <h1 style={{ color: "black" }}>DashBoard</h1>

        {/* Cards Section */}
        <Grid container spacing={2}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                style={{
                  ...cardStyle,
                  padding: "1rem",
                  backgroundColor: "#ffffff", // Đổi thành nền trắng
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <i className={`card-icon ${card.icon}`} style={iconStyle}></i>
                  <div style={{ marginLeft: "1rem" }}>
                    <h5 style={{ margin: 0, color: "#000000" }}>
                      {" "}
                      {/* Đổi màu chữ sang đen */}
                      {card.title}
                    </h5>
                    <p style={{ margin: 0, color: "#000000" }}>
                      {" "}
                      {/* Đổi màu chữ sang đen */}
                      {card.amount}
                    </p>
                  </div>
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} marginTop={3}>
          <Grid item xs={12} md={6}>
            <Paper
              style={{
                height: "100%",
                backgroundColor: "#ffffff", // Đổi thành nền trắng
              }}
            >
              <Bar
                data={chartData}
                options={chartOptions}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#ffffff", // Đổi thành nền trắng
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              style={{
                backgroundColor: "#ffffff", // Đổi thành nền trắng
                textAlign: "center",
                padding: "20px",
              }}
            >
              <h3 style={{ color: "#000000" }}>
                {" "}
                {/* Đổi màu chữ sang đen */}
                Amount Chart
              </h3>
              <Doughnut
                data={doughnutData}
                options={options}
                style={{
                  maxWidth: "550px",
                  maxHeight: "550px",
                  margin: "auto",
                }}
              />
            </Paper>
          </Grid>
        </Grid>

        {/* Table and Doughnut Chart Section */}
        <Grid container spacing={3} marginTop={3}>
          <Grid item xs={12} md={12}>
            <Paper
              style={{
                backgroundColor: "#ffffff", // Đổi thành nền trắng
                padding: "20px",
              }}
            >
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: "#000000" }}>User ID</TableCell>{" "}
                      {/* Đổi màu chữ sang đen */}
                      <TableCell sx={{ color: "#000000" }}>
                        Full Name
                      </TableCell>{" "}
                      {/* Đổi màu chữ sang đen */}
                      <TableCell sx={{ color: "#000000" }}>
                        Email
                      </TableCell>{" "}
                      {/* Đổi màu chữ sang đen */}
                      <TableCell sx={{ color: "#000000" }}>
                        Phone
                      </TableCell>{" "}
                      {/* Đổi màu chữ sang đen */}
                      <TableCell sx={{ color: "#000000" }}>
                        TotalOrders
                      </TableCell>{" "}
                      {/* Đổi màu chữ sang đen */}
                      <TableCell sx={{ color: "#000000" }}>
                        TotalPrice
                      </TableCell>{" "}
                      {/* Đổi màu chữ sang đen */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((user) => (
                        <TableRow key={user.ma_khach_hang}>
                          <TableCell sx={{ color: "#000000" }}>
                            {" "}
                            {/* Đổi màu chữ sang đen */}
                            {user.ma_khach_hang}
                          </TableCell>
                          <TableCell sx={{ color: "#000000" }}>
                            {" "}
                            {/* Đổi màu chữ sang đen */}
                            {user.ten_khach_hang}
                          </TableCell>
                          <TableCell sx={{ color: "#000000" }}>
                            {" "}
                            {/* Đổi màu chữ sang đen */}
                            {user.TEN_DANG_NHAP}
                          </TableCell>
                          <TableCell sx={{ color: "#000000" }}>
                            {" "}
                            {/* Đổi màu chữ sang đen */}
                            {user.SDT_KH}
                          </TableCell>
                          <TableCell sx={{ color: "#000000" }}>
                            {" "}
                            {/* Đổi màu chữ sang đen */}
                            {user.so_luong_dat_hang} orders
                          </TableCell>
                          <TableCell sx={{ color: "#000000" }}>
                            {" "}
                            {/* Đổi màu chữ sang đen */}
                            {user.tong_tien}$
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ color: "#000000" }}
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default DashboardAdmin;
