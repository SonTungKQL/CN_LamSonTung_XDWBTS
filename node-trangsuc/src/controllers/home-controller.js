const connection = require("../config/database");

const danhsachusermuahang = async (req, res) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT 
    USERS.USER_ID  AS ma_khach_hang,
    USERS.USERNAME AS ten_khach_hang,
    USERS.EMAIL as TEN_DANG_NHAP,
    USERS.PHONE as SDT_KH,
    COUNT(ORDERDETAILS.ORDER_ID_ ) AS so_luong_dat_hang,
    SUM(ORDERDETAILS.PRICE) AS tong_tien
FROM 
    ORDERS
JOIN 
    ORDERDETAILS ON ORDERS.ORDER_ID_ = ORDERDETAILS.ORDER_ID_
JOIN 
    USERS ON ORDERS.USER_ID  = USERS.USER_ID 
GROUP BY 
    USERS.USER_ID , USERS.USERNAME;`
    );
    console;
    // Trả về danh sách sản phẩm trong giỏ hàng
    return res.status(200).json({
      EM: "Xem thông tin sản phẩm ngẫu nhiên thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Lỗi server nội bộ",
      error: error.message,
    });
  }
};

const tongsoluongcuatop3 = async (req, res) => {
  try {
    const [results, fields] = await connection.execute(
      `WITH ProductRank AS (
    SELECT 
        PRODUCTS.NAME,
        COUNT(*) AS so_luong -- Đếm số dòng trong bảng chi_tiet_hoa_don cho mỗi sản phẩm
    FROM 
        ORDERDETAILS
    JOIN 
        PRODUCTS ON ORDERDETAILS.PRODUCT_ID  = PRODUCTS.PRODUCT_ID 
    GROUP BY 
        PRODUCTS.NAME
),
Top3PRODUCTS AS (
    SELECT 
        NAME AS nhom_san_pham,
        so_luong
    FROM 
        ProductRank
    ORDER BY 
        so_luong DESC
    LIMIT 3
),
Others AS (
    SELECT 
        'Khác' AS nhom_san_pham,
        SUM(so_luong) AS so_luong
    FROM 
        ProductRank
    WHERE 
        NAME NOT IN (SELECT nhom_san_pham FROM Top3PRODUCTS)
)
SELECT 
    nhom_san_pham,
    so_luong
FROM (
    SELECT * FROM Top3PRODUCTS
    UNION ALL
    SELECT * FROM Others
) AS final_result;

`
    );

    // Trả về danh sách sản phẩm trong giỏ hàng
    return res.status(200).json({
      EM: "Xem thông tin sản phẩm ngẫu nhiên thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Lỗi server nội bộ",
      error: error.message,
    });
  }
};

const danhsachordertheotime = async (req, res) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT 
    CONCAT('Tháng ', months.thang) AS thang,
    IFNULL(COUNT(ORDERS.ORDER_ID_ ), 0) AS so_luong_hoa_don
FROM 
    (SELECT 1 AS thang UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION 
     SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION 
     SELECT 11 UNION SELECT 12) AS months
LEFT JOIN 
    ORDERS ON MONTH(ORDERS.CREATED_AT_) = months.thang
    AND ORDERS.CREATED_AT_ BETWEEN '2024-01-01' AND '2024-12-31'
GROUP BY 
    months.thang
ORDER BY 
    months.thang;
`
    );

    // Trả về danh sách sản phẩm trong giỏ hàng
    return res.status(200).json({
      EM: "Xem thông tin sản phẩm ngẫu nhiên thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Lỗi server nội bộ",
      error: error.message,
    });
  }
};

const laytongsoluongnhieunhat = async (req, res) => {
  try {
    const [results, fields] = await connection.execute(
      `SELECT 
    SUM(PRICE) AS tong_tien
FROM 
    ORDERDETAILS;

`
    );

    const [results2, fields2] = await connection.execute(
      `SELECT 
    USERS.USER_ID  AS ma_khach_hang,
    USERS.USERNAME AS ten_khach_hang,
    COUNT(ORDERS.ORDER_ID_ ) AS so_luong_hoa_don
FROM 
    ORDERS
JOIN 
    USERS ON ORDERS.USER_ID  = USERS.USER_ID 
GROUP BY 
    USERS.USER_ID , USERS.USERNAME
ORDER BY 
    so_luong_hoa_don DESC
LIMIT 1;
`
    );

    const [results3, fields3] = await connection.execute(
      `SELECT 
    SUM(ORDERDETAILS.PRICE) AS tong_tien_hom_nay
FROM 
    ORDERS
JOIN 
    ORDERDETAILS ON ORDERS.ORDER_ID_  = ORDERDETAILS.ORDER_ID_ 
WHERE 
    DATE(ORDERS.CREATED_AT_) = CURDATE();

`
    );

    const [results4, fields4] = await connection.execute(
      `SELECT 
    SUM(ORDERDETAILS.PRICE) AS tong_tien_thang_nay
FROM 
    ORDERS
JOIN 
      ORDERDETAILS ON ORDERS.ORDER_ID_  = ORDERDETAILS.ORDER_ID_ 
WHERE 
    YEAR(ORDERS.CREATED_AT_) = YEAR(CURDATE()) 
    AND MONTH(ORDERS.CREATED_AT_) = MONTH(CURDATE());

`
    );

    // Trả về danh sách sản phẩm trong giỏ hàng
    return res.status(200).json({
      EM: "Xem thông tin sản phẩm ngẫu nhiên thành công",
      EC: 1,
      DT: { results, results2, results3, results4 },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Lỗi server nội bộ",
      error: error.message,
    });
  }
};

const getAllDonhangAdmin = async (req, res) => {
  try {
    const ORDER_STATUS = req.body.ORDER_STATUS;
    const [results, fields] = await connection.execute(
      `select * from ORDERS,USERS where ORDERS.ORDER_STATUS_ = ?
      and ORDERS.USER_ID = USERS.USER_ID 
      order by ORDERS.ORDER_ID_ DESC
`,
      [ORDER_STATUS]
    );

    // Trả về danh sách sản phẩm trong giỏ hàng
    return res.status(200).json({
      EM: "Xem thông tin sản phẩm ngẫu nhiên thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Lỗi server nội bộ",
      error: error.message,
    });
  }
};

const getAllChitietDonhangAdmin = async (req, res) => {
  try {
    const ORDER_ID = req.body.ORDER_ID;

    const [results, fields] = await connection.execute(
      `SELECT * FROM ORDERS,orderdetails, products, USERS 
      where ORDERS.USER_ID = USERS.USER_ID 
      and ORDERS.ORDER_ID_ = orderdetails.ORDER_ID_
      and orderdetails.PRODUCT_ID = products.PRODUCT_ID
      and ORDERS.ORDER_ID_  = ?
`,
      [ORDER_ID]
    );

    // Trả về danh sách sản phẩm trong giỏ hàng
    return res.status(200).json({
      EM: "Xem thông tin sản phẩm ngẫu nhiên thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Lỗi server nội bộ",
      error: error.message,
    });
  }
};

const updateStatusdonhang = async (req, res) => {
  // try {
  const ORDER_ID = req.body.ORDER_ID;
  const ORDER_STATUS_ = req.body.ORDER_STATUS_;
  const [results, fields] = await connection.execute(
    `UPDATE ORDERS SET ORDER_STATUS_ = ? WHERE ORDER_ID_ = ?
  `,
    [ORDER_STATUS_, ORDER_ID] // newStatus là trạng thái mới, ORDER_ID là ID của đơn hàng cần cập nhật
  );

  // Trả về danh sách sản phẩm trong giỏ hàng
  return res.status(200).json({
    EM: "Xem thông tin sản phẩm ngẫu nhiên thành công",
    EC: 1,
    DT: results,
  });
  // } catch (error) {
  //   console.error(error.message);
  //   return res.status(500).json({
  //     message: "Lỗi server nội bộ",
  //     error: error.message,
  //   });
  // }
};

module.exports = {
  danhsachusermuahang,
  tongsoluongcuatop3,
  danhsachordertheotime,
  laytongsoluongnhieunhat,
  getAllDonhangAdmin,
  getAllChitietDonhangAdmin,
  updateStatusdonhang,
};
