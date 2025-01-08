const express = require("express");
const router = express.Router();

// Import controller functions
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/sanPhamController/categoriesController");

// Lấy tất cả danh mục
router.get("/", getAllCategories);

// Lấy danh mục theo ID
router.get("/:id", getCategoryById);

// Tạo mới một danh mục
router.post("/", createCategory);

// Cập nhật thông tin danh mục
router.put("/:id", updateCategory);

// Xóa danh mục
router.delete("/:id", deleteCategory);

module.exports = router;
