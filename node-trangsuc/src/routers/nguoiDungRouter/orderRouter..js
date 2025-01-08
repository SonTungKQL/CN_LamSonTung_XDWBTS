const express = require("express");
const router = express.Router();
const {
  getDonhang,
  getDonhangchitiet,
} = require("../../controllers/nguoiDungController/orderController");

router.post("/ordercanhan", getDonhang);
router.post("/getDonhangchitiet", getDonhangchitiet);

module.exports = router;
