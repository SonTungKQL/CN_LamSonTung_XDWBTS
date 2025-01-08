const pool = require("../../config/database");
const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM CATEGORIES");
    const results = rows;
    return res.status(200).json({
      EM: "Lấy tất cả danh mục thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};
const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM CATEGORIES WHERE CATEGORY_ID_ = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        EM: "Danh mục không tồn tại",
        EC: -1,
        DT: [],
      });
    }
    const result = rows[0];
    return res.status(200).json({
      EM: "Lấy thông tin danh mục thành công",
      EC: 1,
      DT: result,
    });
  } catch (error) {
    console.error("Error in getCategoryById:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};
const createCategory = async (req, res) => {
  const { CATEGORY_NAME, CATEGORY_DECRIPTION, CATEGORY_STATUS } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO CATEGORIES (CATEGORY_NAME, CATEGORY_DECRIPTION, CATEGORY_STATUS) VALUES (?, ?, ?)",
      [CATEGORY_NAME, CATEGORY_DECRIPTION, CATEGORY_STATUS]
    );
    return res.status(201).json({
      EM: "Tạo danh mục thành công",
      EC: 1,
      DT: {
        CATEGORY_ID_: result.insertId,
        CATEGORY_NAME,
        CATEGORY_DECRIPTION,
        CATEGORY_STATUS,
      },
    });
  } catch (error) {
    console.error("Error in createCategory:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { CATEGORY_NAME, CATEGORY_DESCRIPTION, CATEGORY_STATUS } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE CATEGORIES SET CATEGORY_NAME = ?, CATEGORY_DECRIPTION = ?, CATEGORY_STATUS = ? WHERE CATEGORY_ID_ = ?",
      [CATEGORY_NAME, CATEGORY_DESCRIPTION, CATEGORY_STATUS, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        EM: "Danh mục không tồn tại",
        EC: -1,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Cập nhật danh mục thành công",
      EC: 1,
      DT: {
        CATEGORY_ID_: id,
        CATEGORY_NAME,
        CATEGORY_DESCRIPTION,
        CATEGORY_STATUS,
      },
    });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM CATEGORIES WHERE CATEGORY_ID_ = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        EM: "Danh mục không tồn tại",
        EC: -1,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Xóa danh mục thành công",
      EC: 1,
      DT: [],
    });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
