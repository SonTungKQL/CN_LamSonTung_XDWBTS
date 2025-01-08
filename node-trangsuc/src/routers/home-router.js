const express = require("express");
const router = express.Router();

const {
  danhsachusermuahang,
  tongsoluongcuatop3,
  danhsachordertheotime,
  laytongsoluongnhieunhat,
  getAllDonhangAdmin,
  getAllChitietDonhangAdmin,
  updateStatusdonhang,
} = require("../controllers/home-controller");

router.get("/use/danhsachkhachhang", danhsachusermuahang);
router.get("/use/tongsoluongcuatop3", tongsoluongcuatop3);
router.get("/use/danhsachordertheotime", danhsachordertheotime);
router.get("/use/laytongsoluongnhieunhat", laytongsoluongnhieunhat);
router.post("/use/getalldonhangadmin", getAllDonhangAdmin);
router.post("/use/getallchitietdonhangadmin", getAllChitietDonhangAdmin);
router.post("/use/updateStatusdonhang", updateStatusdonhang);
module.exports = router;
