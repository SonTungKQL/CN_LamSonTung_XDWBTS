const connection = require("../../config/database.js");

const fs = require("fs");
const path = require("path");

// Lấy danh sách sản phẩm
const getSAN_PHAM = async (req, res) => {
  try {
    // Thực hiện truy vấn lấy tất cả sản phẩm từ bảng PRODUCTS, sắp xếp theo CREATED_AT_ giảm dần
    const [results] = await connection.execute(`
      SELECT PRODUCT_ID, CATEGORY_ID_, NAME, PRODUCT_PRICE, MATERIAL_, WEIGHT, SIZE_, IMAGE_URL_, STOCK_QUANTITY_, CREATED_AT_, UPDATED_AT, PRODUCT_STATUS
      FROM PRODUCTS
      ORDER BY CREATED_AT_ DESC
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

const getSAN_PHAM_Use_ById = async (req, res) => {
  const { id } = req.params; // Lấy id từ tham số URL
  console.log("checkadkjhalkdlakd", id);
  try {
    // Truy vấn để lấy thông tin đầy đủ về sản phẩm, bao gồm thông tin từ các bảng CATEGORIES và PROMOTIONS
    const [results] = await connection.execute(
      `
      SELECT 
        p.PRODUCT_ID,
        p.CATEGORY_ID_,
        p.NAME AS PRODUCT_NAME,
        p.PRODUCT_PRICE,
        p.MATERIAL_,
        p.WEIGHT,
        p.SIZE_,
        p.IMAGE_URL_,
        p.STOCK_QUANTITY_,
        p.CREATED_AT_,
        p.UPDATED_AT,
        p.PRODUCT_STATUS,
        c.CATEGORY_NAME,
        c.CATEGORY_DECRIPTION,
        c.CATEGORY_STATUS,
        pr.PROMOTION_ID_,
        pr.PROMOTION_TITLE_,
        pr.PROMOTION__DECRIPTION,
        pr.PROMOTION_DISCOUNT,
        pr.PROMOTION_START_DATE,
        pr.PROMOTION_END_DATE
      FROM PRODUCTS p
      LEFT JOIN CATEGORIES c ON p.CATEGORY_ID_ = c.CATEGORY_ID_
      LEFT JOIN PROMOTIONS pr ON p.PRODUCT_ID = pr.PRODUCT_ID
      WHERE p.PRODUCT_ID = ? AND p.PRODUCT_STATUS = 'Đang hoạt động'
      `,
      [id] // Truyền id vào câu truy vấn
    );

    // Kiểm tra nếu không có sản phẩm nào
    if (results.length === 0) {
      return res.status(404).json({
        EM: "Sản phẩm không tìm thấy hoặc không còn hoạt động",
        EC: 0,
        DT: [],
      });
    }

    // Trả về thông tin sản phẩm cùng với thông tin từ các bảng CATEGORIES và PROMOTIONS
    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results[0], // Chỉ trả về sản phẩm đầu tiên (nếu có)
    });
  } catch (error) {
    console.error("Error getting san pham by id:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

const getSAN_PHAM_Use = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT PRODUCT_ID, CATEGORY_ID_, NAME, PRODUCT_PRICE, MATERIAL_, WEIGHT, SIZE_, IMAGE_URL_, STOCK_QUANTITY_, CREATED_AT_, UPDATED_AT, PRODUCT_STATUS
      FROM PRODUCTS
      WHERE PRODUCT_STATUS = 'Đang hoạt động'
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

//Search theo sản phẩm
const getSAN_PHAM_Search = async (req, res) => {
  const { query } = req.query; // Nhận từ khóa tìm kiếm từ frontend

  if (!query) {
    return res.status(400).json({
      EM: "Vui lòng cung cấp từ khóa tìm kiếm",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Truy vấn cơ sở dữ liệu với từ khóa tìm kiếm, tìm kiếm trong NAME, MATERIAL_ và SIZE_
    const [results] = await connection.execute(
      `
      SELECT PRODUCT_ID, CATEGORY_ID_, NAME, PRODUCT_PRICE, MATERIAL_, WEIGHT, SIZE_, IMAGE_URL_, STOCK_QUANTITY_, CREATED_AT_, UPDATED_AT, PRODUCT_STATUS
      FROM PRODUCTS
      WHERE PRODUCT_STATUS = 'Đang hoạt động' 
      AND (NAME LIKE ? OR MATERIAL_ LIKE ? OR SIZE_ LIKE ?)
      LIMIT 5
      `,
      [`%${query}%`, `%${query}%`, `%${query}%`] // Sử dụng từ khóa tìm kiếm với LIKE
    );

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

//lấy tất cả sản phẩm ĐANG HOẠT ĐỘNG = NỮ

//lấy 2 sản phẩm mới thêm vào
const getLatest2Products = async (req, res) => {
  try {
    // Truy vấn 2 sản phẩm mới nhất theo CREATED_AT_
    const [results] = await connection.execute(`
      SELECT PRODUCT_ID, CATEGORY_ID_, NAME, PRODUCT_PRICE, MATERIAL_, WEIGHT, SIZE_, IMAGE_URL_, STOCK_QUANTITY_, CREATED_AT_, UPDATED_AT, PRODUCT_STATUS
      FROM PRODUCTS
      WHERE PRODUCT_STATUS = 'Đang hoạt động'
      ORDER BY CREATED_AT_ DESC
      LIMIT 2
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin",
      EC: 0,
      DT: [],
    });
  }
};

const get_5CheapestProducts = async (req, res) => {
  try {
    // Truy vấn 5 sản phẩm có giá thấp nhất theo PRODUCT_PRICE
    const [results] = await connection.execute(`
      SELECT PRODUCT_ID, CATEGORY_ID_, NAME, PRODUCT_PRICE, MATERIAL_, WEIGHT, SIZE_, IMAGE_URL_, STOCK_QUANTITY_, CREATED_AT_, UPDATED_AT, PRODUCT_STATUS
      FROM PRODUCTS
      WHERE PRODUCT_STATUS = 'Đang hoạt động'
      ORDER BY PRODUCT_PRICE ASC
      LIMIT 5
    `);

    return res.status(200).json({
      EM: "Xem 5 sản phẩm giá rẻ nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting cheapest san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin sản phẩm giá rẻ nhất",
      EC: 0,
      DT: [],
    });
  }
};

const getTop5BestSellingProducts = async (req, res) => {
  try {
    // Truy vấn 5 sản phẩm bán chạy nhất dựa vào tổng số lượng bán
    const [results] = await connection.execute(`
      SELECT p.PRODUCT_ID, p.CATEGORY_ID_, p.NAME, p.PRODUCT_PRICE, p.MATERIAL_, p.WEIGHT, p.SIZE_, p.IMAGE_URL_, p.STOCK_QUANTITY_, p.CREATED_AT_, p.UPDATED_AT_, p.PRODUCT_STATUS, SUM(oi.QUANTITY) AS total_sold
      FROM PRODUCTS p
      JOIN ORDER_ITEMS oi ON p.PRODUCT_ID = oi.PRODUCT_ID
      WHERE p.PRODUCT_STATUS = 'Đang hoạt động'
      GROUP BY p.PRODUCT_ID
      ORDER BY total_sold DESC
      LIMIT 5
    `);

    return res.status(200).json({
      EM: "Xem 5 sản phẩm bán chạy nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting best-selling products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin sản phẩm bán chạy nhất",
      EC: 0,
      DT: [],
    });
  }
};

// Lấy 5 sản phẩm được người ta yêu thích nhiều nhất
const get5TopFavoriteProducts = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT p.PRODUCT_ID, p.CATEGORY_ID_, p.NAME, p.PRODUCT_PRICE, p.MATERIAL_, p.WEIGHT, p.SIZE_, p.IMAGE_URL_, p.STOCK_QUANTITY_, p.CREATED_AT_, p.UPDATED_AT_, p.PRODUCT_STATUS, COUNT(w.WISHLIST_ID) AS total_likes
      FROM PRODUCTS p
      LEFT JOIN WISHLIST w ON p.PRODUCT_ID = w.PRODUCT_ID
      WHERE p.PRODUCT_STATUS = 'Đang hoạt động'
      GROUP BY p.PRODUCT_ID
      ORDER BY total_likes DESC
      LIMIT 5
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm được yêu thích nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting favorite products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin sản phẩm yêu thích",
      EC: 0,
      DT: [],
    });
  }
};

// Lấy 5 sản phẩm có giá tiền cao nhất
const getTopExpensiveProducts = async (req, res) => {
  try {
    const [results] = await connection.execute(`
      SELECT PRODUCT_ID, CATEGORY_ID_, NAME, PRODUCT_PRICE, MATERIAL_, WEIGHT, SIZE_, IMAGE_URL_, STOCK_QUANTITY_, CREATED_AT_, UPDATED_AT_, PRODUCT_STATUS
      FROM PRODUCTS
      WHERE PRODUCT_STATUS = 'Đang hoạt động'
      ORDER BY PRODUCT_PRICE DESC
      LIMIT 5
    `);

    return res.status(200).json({
      EM: "Xem thông tin sản phẩm có giá cao nhất thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting top expensive products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy thông tin sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

// Lấy tất cả sản phẩm trong yêu thích của 1 người dùng
const getFavoriteProductsByUser = async (req, res) => {
  const userId = req.params.id; // Lấy userId từ tham số URL

  try {
    const [results] = await connection.execute(
      `
      SELECT p.PRODUCT_ID, p.CATEGORY_ID_, p.NAME, p.PRODUCT_PRICE, p.MATERIAL_, p.WEIGHT, p.SIZE_, p.IMAGE_URL_, p.STOCK_QUANTITY_, p.CREATED_AT_, p.UPDATED_AT_, p.PRODUCT_STATUS
      FROM WISHLIST w
      JOIN PRODUCTS p ON w.PRODUCT_ID = p.PRODUCT_ID
      WHERE w.USER_ID = ? AND p.PRODUCT_STATUS = 'Đang hoạt động'
      `,
      [userId]
    );

    if (results.length === 0) {
      return res.status(200).json({
        EM: "Không có sản phẩm yêu thích cho người dùng hoặc sản phẩm không tồn tại",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Lấy thông tin sản phẩm yêu thích thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error getting favorite products:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi lấy sản phẩm yêu thích",
      EC: 0,
      DT: [],
    });
  }
};

// Tạo sản phẩm mới
const createSAN_PHAM = async (req, res) => {
  const {
    CATEGORY_ID_,
    NAME,
    PRODUCT_PRICE,
    MATERIAL_,
    WEIGHT,
    SIZE_,
    STOCK_QUANTITY_,
    PRODUCT_STATUS,
  } = req.body;

  // Lấy tên hình từ `req.file`
  const IMAGE_URL_ = req.file ? req.file.filename : null;

  try {
    const [result] = await connection.execute(
      `
      INSERT INTO PRODUCTS (CATEGORY_ID_, NAME, PRODUCT_PRICE, MATERIAL_, WEIGHT, SIZE_, IMAGE_URL_, STOCK_QUANTITY_, PRODUCT_STATUS)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        CATEGORY_ID_,
        NAME,
        PRODUCT_PRICE,
        MATERIAL_,
        WEIGHT,
        SIZE_,
        IMAGE_URL_,
        STOCK_QUANTITY_,
        PRODUCT_STATUS,
      ]
    );

    return res.status(201).json({
      EM: "Thêm sản phẩm thành công",
      EC: 1,
      DT: {
        PRODUCT_ID: result.insertId,
        CATEGORY_ID_,
        NAME,
        PRODUCT_PRICE,
        MATERIAL_,
        WEIGHT,
        SIZE_,
        IMAGE_URL_,
        STOCK_QUANTITY_,
        PRODUCT_STATUS,
      },
    });
  } catch (error) {
    console.error("Error creating san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi thêm sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

// Cập nhật sản phẩm
const updateSAN_PHAM = async (req, res) => {
  const { id } = req.params; // Lấy PRODUCT_ID từ URL
  const {
    CATEGORY_ID_,
    NAME,
    PRODUCT_PRICE,
    MATERIAL_,
    WEIGHT,
    SIZE_,
    STOCK_QUANTITY_,
    PRODUCT_STATUS,
  } = req.body;
  console.log(" req.body", req.body);
  // Lấy tên hình từ req.file (nếu có)
  // Lấy tên hình từ req.file (nếu có)
  const IMAGE_URL_ = req.file ? req.file.filename : undefined; // Thay null bằng undefined

  try {
    // Tạo mảng các trường cần cập nhật
    const fieldsToUpdate = [];
    const values = [];

    // Kiểm tra từng trường và thêm vào danh sách cập nhật nếu có giá trị
    if (CATEGORY_ID_ !== undefined) {
      fieldsToUpdate.push("CATEGORY_ID_ = ?");
      values.push(CATEGORY_ID_);
    }
    if (NAME !== undefined) {
      fieldsToUpdate.push("NAME = ?");
      values.push(NAME);
    }
    if (PRODUCT_PRICE !== undefined) {
      fieldsToUpdate.push("PRODUCT_PRICE = ?");
      values.push(PRODUCT_PRICE);
    }
    if (MATERIAL_ !== undefined) {
      fieldsToUpdate.push("MATERIAL_ = ?");
      values.push(MATERIAL_);
    }
    if (WEIGHT !== undefined) {
      fieldsToUpdate.push("WEIGHT = ?");
      values.push(WEIGHT);
    }
    if (SIZE_ !== undefined) {
      fieldsToUpdate.push("SIZE_ = ?");
      values.push(SIZE_);
    }
    if (IMAGE_URL_ !== undefined) {
      fieldsToUpdate.push("IMAGE_URL_ = ?");
      values.push(IMAGE_URL_);
    }

    if (STOCK_QUANTITY_ !== undefined) {
      fieldsToUpdate.push("STOCK_QUANTITY_ = ?");
      values.push(STOCK_QUANTITY_);
    }
    if (PRODUCT_STATUS !== undefined) {
      fieldsToUpdate.push("PRODUCT_STATUS = ?");
      values.push(PRODUCT_STATUS);
    }

    // Nếu không có trường nào để cập nhật
    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({
        EM: "Không có dữ liệu nào để cập nhật",
        EC: 0,
        DT: [],
      });
    }

    // Thêm PRODUCT_ID vào cuối mảng giá trị
    values.push(id);

    // Tạo câu lệnh SQL động
    const sql = `
      UPDATE PRODUCTS
      SET ${fieldsToUpdate.join(", ")}
      WHERE PRODUCT_ID = ?
    `;

    // Thực hiện truy vấn
    const [result] = await connection.execute(sql, values);

    // Kiểm tra nếu không có sản phẩm nào được cập nhật
    if (result.affectedRows === 0) {
      return res.status(404).json({
        EM: "Sản phẩm không tồn tại hoặc không có thay đổi",
        EC: 0,
        DT: [],
      });
    }

    // Trả về thông báo thành công
    return res.status(200).json({
      EM: "Cập nhật sản phẩm thành công",
      EC: 1,
      DT: {
        id,
        ...(CATEGORY_ID_ && { CATEGORY_ID_ }),
        ...(NAME && { NAME }),
        ...(PRODUCT_PRICE && { PRODUCT_PRICE }),
        ...(MATERIAL_ && { MATERIAL_ }),
        ...(WEIGHT && { WEIGHT }),
        ...(SIZE_ && { SIZE_ }),
        ...(IMAGE_URL_ && { IMAGE_URL_ }),
        ...(STOCK_QUANTITY_ && { STOCK_QUANTITY_ }),
        ...(PRODUCT_STATUS && { PRODUCT_STATUS }),
      },
    });
  } catch (error) {
    console.error("Error updating san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

// Xóa sản phẩm

const deleteSAN_PHAM = async (req, res) => {
  const { id } = req.params; // Lấy PRODUCT_ID từ tham số URL

  try {
    // Bước 1: Lấy thông tin sản phẩm để lấy tên hình ảnh
    const [product] = await connection.execute(
      `
      SELECT IMAGE_URL_ FROM PRODUCTS WHERE PRODUCT_ID = ?
      `,
      [id]
    );

    // Kiểm tra xem sản phẩm có tồn tại không
    if (product.length === 0) {
      return res.status(404).json({
        EM: "Sản phẩm không tồn tại",
        EC: 0,
        DT: [],
      });
    }

    // Lấy tên hình ảnh từ sản phẩm
    const imageUrl = product[0].IMAGE_URL_;

    // Bước 2: Xóa sản phẩm khỏi cơ sở dữ liệu
    const [deleteResult] = await connection.execute(
      `
      DELETE FROM PRODUCTS WHERE PRODUCT_ID = ?
      `,
      [id]
    );

    // Kiểm tra nếu không có sản phẩm nào bị xóa
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        EM: "Sản phẩm không tồn tại hoặc đã được xóa",
        EC: 0,
        DT: [],
      });
    }

    // Bước 3: Xóa hình ảnh nếu cần (nếu bạn muốn xóa file hình ảnh thực tế từ server)
    // Ví dụ, nếu bạn lưu trữ hình ảnh trên server, bạn có thể xóa file ở đây:
    // if (imageUrl) {
    //   const fs = require('fs');
    //   const path = require('path');
    //   const imagePath = path.join(__dirname, 'public', imageUrl);
    //   fs.unlink(imagePath, (err) => {
    //     if (err) {
    //       console.error('Lỗi khi xóa hình ảnh:', err);
    //     }
    //   });
    // }

    // Trả về thông báo thành công
    return res.status(200).json({
      EM: "Xóa sản phẩm thành công",
      EC: 1,
      DT: [],
    });
  } catch (error) {
    console.error("Error deleting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

const getSANPHAMwithCATEGORY = async (req, res) => {
  const { categoryname } = req.body;

  try {
    // Bước 1: Lấy thông tin sản phẩm để lấy tên hình ảnh
    if (categoryname === "tất cả") {
      const [product] = await connection.execute(
        `
      SELECT * FROM PRODUCTS,CATEGORIES WHERE  
      CATEGORIES.CATEGORY_ID_ = PRODUCTS.CATEGORY_ID_`
      );
      return res.status(200).json({
        EM: "Xóa sản phẩm thành công",
        EC: 1,
        DT: product,
      });
    }
    const [product] = await connection.execute(
      `
      SELECT * FROM PRODUCTS,CATEGORIES WHERE  
      CATEGORIES.CATEGORY_ID_ = PRODUCTS.CATEGORY_ID_
      and CATEGORIES.CATEGORY_NAME = ?
      `,
      [categoryname]
    );

    // Kiểm tra xem sản phẩm có tồn tại không

    // Trả về thông báo thành công
    return res.status(200).json({
      EM: "Xóa sản phẩm thành công",
      EC: 1,
      DT: product,
    });
  } catch (error) {
    console.error("Error deleting san pham:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi xóa sản phẩm",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  getSAN_PHAM,
  createSAN_PHAM,
  updateSAN_PHAM,
  deleteSAN_PHAM,
  getSAN_PHAM_Use,

  getLatest2Products,

  getTop5BestSellingProducts,
  get5TopFavoriteProducts,
  getTopExpensiveProducts,

  getFavoriteProductsByUser,
  getSAN_PHAM_Use_ById,

  getSAN_PHAM_Search,
  getSANPHAMwithCATEGORY,
};
