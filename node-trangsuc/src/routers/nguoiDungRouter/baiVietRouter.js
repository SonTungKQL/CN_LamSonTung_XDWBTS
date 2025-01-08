const express = require("express");
const router = express.Router();
const {
  getBaiViet,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
  getBaiViet_byID,
} = require("../../controllers/nguoiDungController/baiVietController");
const upload = require("../../config/multerConfig");
router.get("/", getBaiViet);
router.get("/:id", getBaiViet_byID);

router.post("/", upload.single("BLOG_IMAGE"), createBaiViet);

router.put("/:id", upload.single("BLOG_IMAGE"), updateBaiViet);

router.delete("/:id", deleteBaiViet);

module.exports = router;
