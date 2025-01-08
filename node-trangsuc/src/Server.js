const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
require("./config/database.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const hostname = process.env.HOST_NAME || "localhost";

//setting
const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true); // Allow all origins dynamically
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "src/public/images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//api user
const userRoute = require("./routers/nguoiDungRouter/userRouters.js");
const orderRouter = require("./routers/nguoiDungRouter/orderRouter..js");
//api products
const sanPhamRoute = require("./routers/sanPhamRouters/SanPhamRouter.js");

//api thanh toán

const donHangRoute = require("./routers/thanhToanRouter/donHangRouter.js");
const chiTietHoaDonRoute = require("./routers/thanhToanRouter/chiTietHoaDonRouter.js");

//api tương tác người dùng
const gioHangRoute = require("./routers/tuongTacUserRouter/gioHangRouter.js");
const yeuThichRoute = require("./routers/tuongTacUserRouter/yeuThichRouter.js");
const danhMucRoute = require("./routers/sanPhamRouters/categoriesRoute.js");
const homeRoute = require("./routers/home-router.js");
const baiVietRoute = require("./routers/nguoiDungRouter/baiVietRouter.js");
app.use("/", userRoute);
//
app.use("/san-pham", sanPhamRoute);
app.use("/danh-muc", danhMucRoute);
//
app.use("/gio-hang", gioHangRoute);
app.use("/chi-tiet-hoa-don/", chiTietHoaDonRoute);
// //
app.use("/yeu-thich/", yeuThichRoute);
app.use("/don-hang/", donHangRoute);
app.use("/api/home", homeRoute);
app.use("/api/order", orderRouter);
app.use("/bai-viet/", baiVietRoute);
const configViewEngine = require("./config/viewEngine");
configViewEngine(app);

app.listen(port, hostname, () => {
  console.log(`${hostname}Example app listening on port ${port}`);
});
