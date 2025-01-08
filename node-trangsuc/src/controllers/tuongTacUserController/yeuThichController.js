const pool = require("../../config/database"); // Đảm bảo `pool` được import từ tệp kết nối cơ sở dữ liệu của bạn
const moment = require("moment");
// Lấy danh sách yêu thích
const getYEU_THICH = async (req, res) => {
  try {
    const [results] = await pool.execute("SELECT * FROM `WISHLIST`");
    return res.status(200).json({
      EM: "Xem thông tin thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
const getYEU_THICH_By_IdUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Lấy userId từ URL
    const [results] = await pool.execute(
      "SELECT * FROM `WISHLIST` WHERE USER_ID = ?",
      [userId]
    );
    return res.status(200).json({
      EM: "Xem thông tin thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting wishlist:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};
// Tạo yêu thích mới
const createYEU_THICH = async (req, res) => {
  const { idSanPham, idNguoiDung } = req.body;
  try {
    // Kiểm tra xem đã tồn tại trong yêu thích chưa
    const [results] = await pool.execute(
      "SELECT * FROM WISHLIST WHERE PRODUCT_ID = ? AND USER_ID = ?",
      [idSanPham, idNguoiDung]
    );

    if (results.length > 0) {
      return res.status(400).json({
        EM: "Sản phẩm đã được thêm vào danh sách yêu thích",
        EC: 0,
        DT: [],
      });
    } else {
      const [results1] = await pool.execute(
        "INSERT INTO WISHLIST (PRODUCT_ID, USER_ID) VALUES (?, ?)",
        [idSanPham, idNguoiDung]
      );
      return res.status(201).json({
        EM: "Thêm sản phẩm vào danh sách yêu thích thành công",
        EC: 1,
        DT: results1,
      });
    }
  } catch (error) {
    console.error("Error creating yeu thich:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm sản phẩm vào danh sách yêu thích",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa sản phẩm khỏi danh sách yêu thích
const deleteYEU_THICH = async (req, res) => {
  const { idSanPham, idNguoiDung } = req.body;
  try {
    const [results] = await pool.execute(
      "SELECT * FROM WISHLIST WHERE PRODUCT_ID = ? AND USER_ID = ?",
      [idSanPham, idNguoiDung]
    );

    if (results.length > 0) {
      await pool.execute(
        "DELETE FROM WISHLIST WHERE PRODUCT_ID = ? AND USER_ID = ?",
        [idSanPham, idNguoiDung]
      );
      return res.status(200).json({
        EM: "Xóa sản phẩm khỏi danh sách yêu thích thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy sản phẩm trong danh sách yêu thích",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error deleting yeu thich:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa sản phẩm khỏi danh sách yêu thích",
      EC: 0,
      DT: [],
    });
  }
};
// Lấy tất cả sản phẩm yêu thích của 1 người dùng
const getWishlistProductsByUser = async (req, res) => {
  const userId = req.params.id; // Lấy userId từ tham số URL

  try {
    const [results] = await pool.execute(
      `
      SELECT 
        w.WISHLIST_ID,                 -- Mã yêu thích
        w.PRODUCT_ID,                  -- Mã sản phẩm
        p.NAME AS PRODUCT_NAME,        -- Tên sản phẩm
        p.PRODUCT_PRICE,               -- Giá sản phẩm
        p.MATERIAL_,                   -- Chất liệu
        p.WEIGHT,                      -- Cân nặng
        p.SIZE_ AS PRODUCT_SIZE,       -- Kích thước sản phẩm
        p.IMAGE_URL_ AS IMAGE_URL,     -- URL hình ảnh
        p.STOCK_QUANTITY_ AS STOCK,    -- Số lượng tồn kho
        p.PRODUCT_STATUS,              -- Trạng thái sản phẩm
        cat.CATEGORY_ID_ AS CATEGORY_ID, -- Mã danh mục
        cat.CATEGORY_NAME              -- Tên danh mục
      FROM 
        WISHLIST w
      JOIN 
        PRODUCTS p ON w.PRODUCT_ID = p.PRODUCT_ID
      JOIN 
        CATEGORIES cat ON p.CATEGORY_ID_ = cat.CATEGORY_ID_
      WHERE 
        w.USER_ID = ?                  -- ID người dùng
        AND p.PRODUCT_STATUS = 'Đang hoạt động' -- Sản phẩm đang hoạt động
    `,
      [userId]
    );

    if (results.length === 0) {
      return res.status(200).json({
        EM: "Danh sách yêu thích của người dùng trống hoặc không tồn tại",
        EC: 1,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Lấy thông tin yêu thích thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting wishlist products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin yêu thích",
      EC: 0,
      DT: [],
    });
  }
};

// Di chuyển sản phẩm từ Yêu thích sang Giỏ hàng
const addSingleProductToCartAndDeleteWish = async (req, res) => {
  const { userId, productId, updateDate } = req.body;

  const formattedUpdateDate = moment(updateDate).format("YYYY-MM-DD HH:mm:ss");
  const connection = await pool.getConnection(); // Lấy kết nối từ pool

  try {
    // Bắt đầu transaction
    await connection.beginTransaction();

    // Xóa sản phẩm từ bảng YEU_THICH
    const [deleteFavoriteResult] = await connection.execute(
      "DELETE FROM `WISHLIST` WHERE `USER_ID` = ? AND `PRODUCT_ID` = ?",
      [userId, productId]
    );

    if (deleteFavoriteResult.affectedRows === 0) {
      await connection.rollback(); // Rollback nếu không xóa được sản phẩm
      return res.status(404).json({
        EM: "Sản phẩm không tồn tại trong danh sách yêu thích",
        EC: 0,
      });
    }

    // Thêm sản phẩm vào bảng GIO_HANG
    const [addToCartResult] = await connection.execute(
      "INSERT INTO `CART` (USER_ID, PRODUCT_ID) VALUES (?, ?)",
      [userId, productId, formattedUpdateDate]
    );

    // Commit transaction sau khi mọi thao tác thành công
    await connection.commit();

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const [totalResults] = await connection.execute(
      "SELECT COUNT(PRODUCT_ID) AS totalQuantity FROM CART WHERE USER_ID = ?",
      [userId]
    );

    const totalQuantity = totalResults[0]?.totalQuantity || 0;

    return res.status(200).json({
      EM: "Sản phẩm đã được thêm vào giỏ hàng thành công",
      EC: 1,
      DT: addToCartResult,
      totalQuantity,
    });
  } catch (error) {
    // Nếu có lỗi xảy ra, rollback transaction
    await connection.rollback();
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      EM: "Lỗi hệ thống khi thêm sản phẩm vào giỏ hàng",
      EC: -1,
    });
  } finally {
    connection.release(); // Giải phóng kết nối
  }
};

module.exports = {
  getYEU_THICH,
  createYEU_THICH,
  deleteYEU_THICH,
  getYEU_THICH_By_IdUser,
  addSingleProductToCartAndDeleteWish,
  getWishlistProductsByUser,
};
