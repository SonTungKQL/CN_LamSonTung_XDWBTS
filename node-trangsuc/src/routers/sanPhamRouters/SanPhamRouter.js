const express = require("express");
const router = express.Router();

const {
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
} = require("../../controllers/sanPhamController/SanPhamController");
const uploads = require("../../config/multerConfig");
// Định nghĩa các route

router.get("/use/last2products", getLatest2Products);
router.get("/", getSAN_PHAM);
router.get("/use/", getSAN_PHAM_Use);

router.get("/use/5best-selling", getTop5BestSellingProducts);
router.get("/use/5best-expensive", getTopExpensiveProducts);

router.get("/use/5best-favorite", get5TopFavoriteProducts);
router.get("/use/wishlist-user/:id", getFavoriteProductsByUser);
router.post("/", uploads.single("IMAGE_URL_"), createSAN_PHAM);

// PUT: Cập nhật sản phẩm với hình ảnh mới
router.put("/:id", uploads.single("IMAGE_URL_"), updateSAN_PHAM);
router.delete("/:id", deleteSAN_PHAM);
router.get("/use/:id", getSAN_PHAM_Use_ById);
router.get("/search", getSAN_PHAM_Search);
router.post("/categorysanpham", getSANPHAMwithCATEGORY);
module.exports = router;
