const express = require("express");
const router = express.Router();
const {
  getYEU_THICH,
  createYEU_THICH,
  deleteYEU_THICH,
  getYEU_THICH_By_IdUser,
  addSingleProductToCartAndDeleteWish,
  getWishlistProductsByUser,
} = require("../../controllers/tuongTacUserController/yeuThichController");
// Định nghĩa các route
router.get("", getYEU_THICH);
router.get("/:id", getWishlistProductsByUser);
router.post("/", createYEU_THICH);
router.post("/delete", deleteYEU_THICH);
router.post("/add-cart/delete-wish", addSingleProductToCartAndDeleteWish);

module.exports = router;
