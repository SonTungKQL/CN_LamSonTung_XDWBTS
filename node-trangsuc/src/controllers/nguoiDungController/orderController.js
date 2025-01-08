const connection = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn

const getDonhang = async (req, res) => {
  try {
    const USER_ID = req.body.USER_ID;
    const [results] = await connection.execute(
      `SELECT * FROM ORDERS
      where ORDERS.USER_ID = ?`,
      [USER_ID]
    );
    res.status(200).json({
      EM: "Lấy danh sách bài viết thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

const getDonhangchitiet = async (req, res) => {
  try {
    const ORDER_ID = req.body.ORDER_ID;
    const [results] = await connection.execute(
      `SELECT * FROM ORDERS,ORDERDETAILS, PRODUCTS, USERS 
      where ORDERS.USER_ID = USERS.USER_ID 
      and ORDERS.ORDER_ID_ = ORDERDETAILS.ORDER_ID_
      and ORDERDETAILS.PRODUCT_ID = PRODUCTS.PRODUCT_ID
      and ORDERS.ORDER_ID_ = ?`,
      [ORDER_ID]
    );
    res.status(200).json({
      EM: "Lấy danh sách bài viết thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

module.exports = {
  getDonhang,
  getDonhangchitiet,
};
