const connection = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn
const moment = require("moment");

// 1. Lấy danh sách giỏ hàng của người dùng
const getGioHang = async (req, res) => {
  const { USER_ID } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `CART` WHERE USER_ID  = ?",
      [USER_ID]
    );
    res.status(200).json({ EM: "Lấy giỏ hàng thành công", EC: 1, DT: results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

// 2. Thêm sản phẩm vào giỏ hàng
const createGioHang = async (req, res) => {
  debugger;
  const { ID_NGUOI_DUNG, ID_SAN_PHAM } = req.body;

  try {
    // Bước 1: Thêm sản phẩm vào giỏ hàng
    const [results] = await connection.execute(
      "INSERT INTO `CART` (USER_ID,PRODUCT_ID ) VALUES (?, ?)",
      [ID_NGUOI_DUNG, ID_SAN_PHAM]
    );

    // Bước 2: Tính tổng số lượng sản phẩm trong giỏ hàng của người dùng
    const [totalResults] = await connection.execute(
      `SELECT COUNT(PRODUCT_ID) AS totalQuantity
       FROM CART
       WHERE USER_ID = ?`,
      [ID_NGUOI_DUNG]
    );

    // Bước 3: Trả về phản hồi với tổng số sản phẩm trong giỏ hàng
    const totalQuantity = totalResults[0].totalQuantity;

    res.status(201).json({
      EM: "Thêm vào giỏ hàng thành công",
      EC: 1,
      DT: results,
      totalQuantity: totalQuantity, // Trả về tổng số sản phẩm trong giỏ hàng
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

// 3. Cập nhật số lượng sản phẩm trong giỏ hàng
const removeSingleProductFromCart = async (req, res) => {
  const { USER_ID, PRODUCT_ID } = req.body;
  console.log(req.body);
  try {
    const [results] = await connection.execute(
      "DELETE FROM `CART` WHERE USER_ID = ? AND PRODUCT_ID = ? LIMIT 1",
      [USER_ID, PRODUCT_ID]
    );

    if (results.affectedRows > 0) {
      return res.status(200).json({
        EM: "Xóa 1 sản phẩm khỏi giỏ hàng thành công",
        EC: 1,
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy sản phẩm trong giỏ hàng để xóa",
        EC: 0,
      });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi xóa sản phẩm",
      EC: -1,
    });
  }
};

const addSingleProductToCart = async (req, res) => {
  const { USER_ID, PRODUCT_ID } = req.body;

  try {
    const [results] = await connection.execute(
      "INSERT INTO `CART` ( USER_ID , PRODUCT_ID ) VALUES (?, ?)",
      [USER_ID, PRODUCT_ID]
    );

    return res.status(200).json({
      EM: "Thêm sản phẩm vào giỏ hàng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi thêm sản phẩm vào giỏ hàng",
      EC: -1,
    });
  }
};

// Xóa một loại sản phẩm khỏi giỏ hàng của người dùng
const deleteGioHang = async (req, res) => {
  const { USER_ID, PRODUCT_ID } = req.body; // Lấy userId và productId từ tham số URL

  try {
    const [results] = await connection.execute(
      "DELETE FROM `CART` WHERE USER_ID = ? AND PRODUCT_ID = ?",
      [USER_ID, PRODUCT_ID]
    );

    // Kiểm tra xem có bản ghi nào bị xóa không
    if (results.affectedRows === 0) {
      return res.status(404).json({
        EM: "Sản phẩm không tồn tại trong giỏ hàng của người dùng",
        EC: 0,
      });
    }

    res.status(200).json({
      EM: "Xóa sản phẩm khỏi giỏ hàng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

// Lấy tất cả sản phẩm trong giỏ hàng của 1 người dùng
const getCartProductsByUser = async (req, res) => {
  const userId = req.params.id; // Lấy userId từ tham số URL

  try {
    const [results] = await connection.execute(
      `
  SELECT 
    MAX(c.CART_ID) AS CART_ID,         -- Lấy CART_ID lớn nhất (hoặc bất kỳ một CART_ID)
    c.PRODUCT_ID,                      -- Mã sản phẩm
    p.NAME AS PRODUCT_NAME,            -- Tên sản phẩm
    p.PRODUCT_PRICE,                   -- Giá sản phẩm
    p.MATERIAL_,                       -- Chất liệu
    p.WEIGHT,                          -- Cân nặng
    p.SIZE_ AS PRODUCT_SIZE,           -- Kích thước sản phẩm
    p.IMAGE_URL_ AS IMAGE_URL,         -- URL hình ảnh
    p.STOCK_QUANTITY_ AS STOCK,        -- Số lượng tồn kho
    p.PRODUCT_STATUS,                  -- Trạng thái sản phẩm
    cat.CATEGORY_ID_ AS CATEGORY_ID,   -- Mã danh mục
    cat.CATEGORY_NAME,                 -- Tên danh mục
    COUNT(*) AS QUANTITY       -- Đếm số lần sản phẩm xuất hiện trong giỏ (số lượng)
FROM 
    CART c
JOIN 
    PRODUCTS p ON c.PRODUCT_ID = p.PRODUCT_ID
JOIN 
    CATEGORIES cat ON p.CATEGORY_ID_ = cat.CATEGORY_ID_
WHERE 
    c.USER_ID = ?                    -- ID người dùng
    AND p.PRODUCT_STATUS = 'Đang hoạt động' -- Sản phẩm đang hoạt động
GROUP BY 
    c.PRODUCT_ID,                      -- Nhóm theo mã sản phẩm
    p.NAME, 
    p.PRODUCT_PRICE, 
    p.MATERIAL_, 
    p.WEIGHT, 
    p.SIZE_, 
    p.IMAGE_URL_, 
    p.STOCK_QUANTITY_, 
    p.PRODUCT_STATUS, 
    cat.CATEGORY_ID_, 
    cat.CATEGORY_NAME;

    `,
      [userId]
    );

    if (results.length === 0) {
      return res.status(200).json({
        EM: "Giỏ hàng của người dùng trống hoặc không tồn tại",
        EC: 1,
        DT: [],
      });
    }
    console.log("results", results);
    // Bước 2: Tính tổng số lượng sản phẩm trong giỏ hàng của người dùng
    const [totalResults] = await connection.execute(
      `SELECT COUNT(PRODUCT_ID) AS totalQuantity
       FROM CART
       WHERE USER_ID = ?`,
      [userId]
    );

    // Bước 3: Trả về phản hồi với tổng số sản phẩm trong giỏ hàng
    const totalQuantity = totalResults[0].totalQuantity;
    // Tính tổng số tiền
    const totalAmount = results.reduce((total, item) => {
      return total + item.PRODUCT_PRICE * item.QUANTITY_IN_CART;
    }, 0);

    return res.status(200).json({
      EM: "Lấy thông tin giỏ hàng thành công",
      EC: 1,
      DT: results,
      TOTAL_AMOUNT: totalAmount, // Trả về tổng số tiền
      totalQuantity,
    });
  } catch (error) {
    console.error("Error getting cart products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy giỏ hàng",
      EC: 0,
      DT: [],
    });
  }
};

// tổng số lượng sản phẩm của 1 người dùng trong giỏ hàng
const getCartTotalQuantity = async (req, res) => {
  const USER_ID = req.params.id; // Lấy ID người dùng từ tham số đường dẫn

  try {
    // Truy vấn số lượng sản phẩm trong giỏ hàng của người dùng
    const [results] = await connection.execute(
      `
      SELECT COUNT(PRODUCT_ID ) AS totalQuantity
      FROM GIO_HANG
      WHERE USER_ID  = ?
      `,
      [USER_ID]
    );

    if (results.length > 0) {
      return res.status(200).json({
        EM: "Lấy tổng số lượng sản phẩm trong giỏ hàng thành công",
        EC: 1,
        DT: results[0].totalQuantity, // Trả về tổng số lượng sản phẩm
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy giỏ hàng của người dùng",
        EC: 0,
        DT: 0, // Nếu không có sản phẩm, trả về 0
      });
    }
  } catch (error) {
    console.error("Error getting total cart quantity:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy tổng số lượng sản phẩm",
      EC: 0,
      DT: 0,
    });
  }
};

const createdonhang = async (req, res) => {
  const {
    USER_ID,
    TOTAL_PRICE,
    ADDRESS_ODER,
    PHONE_ODER,
    PAYMENT_METHOD_,
    ORDER_STATUS_,
  } = req.body.orders;
  const orderdetails = req.body.orderdetails; // Nhận toàn bộ danh sách chi tiết đơn hàng
  console.log(req.body);
  if (!orderdetails || !Array.isArray(orderdetails)) {
    return res.status(400).json({
      EM: "Danh sách chi tiết đơn hàng không hợp lệ",
      EC: 0,
      DT: [],
    });
  }

  try {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Thêm đơn hàng mới
    const [thanhtoanResult] = await connection.execute(
      `INSERT INTO ORDERS (USER_ID, TOTAL_PRICE_, ADDRESS_ODER, PHONE_ODER, PAYMENT_METHOD_, ORDER_STATUS_, CREATED_AT_) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        USER_ID,
        TOTAL_PRICE,
        ADDRESS_ODER,
        PHONE_ODER,
        PAYMENT_METHOD_,
        ORDER_STATUS_,
        currentTime,
      ]
    );

    const newOrderId = thanhtoanResult.insertId;

    // Thêm chi tiết đơn hàng
    for (let detail of orderdetails) {
      const { PRODUCT_ID, QUANTITY, PRICE } = detail;
      await connection.execute(
        `INSERT INTO ORDERDETAILS (ORDER_ID_, PRODUCT_ID, QUANTITY, PRICE) 
        VALUES (?, ?, ?, ?)`,
        [newOrderId, PRODUCT_ID, QUANTITY, PRICE]
      );
    }

    return res.status(200).json({
      EM: "Thêm đơn hàng thành công",
      EC: 1,
      DT: [],
    });
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi tạo đơn hàng",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getGioHang,
  createGioHang,
  addSingleProductToCart,
  removeSingleProductFromCart,
  deleteGioHang,
  getCartProductsByUser,
  getCartTotalQuantity,
  createdonhang,
};
