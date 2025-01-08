const connection = require("../../config/database"); // Đảm bảo `connection` được import từ tệp kết nối cơ sở dữ liệu của bạn

const getBaiViet = async (req, res) => {
  try {
    const [results] = await connection.execute("SELECT * FROM `BLOGS`");
    res.status(200).json({
      EM: "Lấy danh sách bài viết thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};
const getBaiViet_byID = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "SELECT * FROM `BLOGS` where BLOG_ID_ =?",
      [id]
    );
    res.status(200).json({
      EM: "Lấy danh sách bài viết thành công",
      EC: 1,
      DT: results[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

const createBaiViet = async (req, res) => {
  const { BLOG_TITLE, BLOG_CONTENT, BLOG_AUTHOR, CREATED_AT, BLOG_STAUS } =
    req.body;

  // Lấy tên file nếu có upload
  const BLOG_IMAGE = req.file ? req.file.filename : null;

  try {
    const [results] = await connection.execute(
      "INSERT INTO `BLOGS` (BLOG_TITLE, BLOG_CONTENT, BLOG_IMAGE_URL, BLOG_AUTHOR, CREATED_AT, BLOG_STAUS) VALUES (?, ?, ?, ?, NOW(), ?)",
      [BLOG_TITLE, BLOG_CONTENT, BLOG_IMAGE, BLOG_AUTHOR, BLOG_STAUS]
    );
    res.status(201).json({
      EM: "Thêm bài viết thành công",
      EC: 1,
      DT: {
        BLOG_ID: results.insertId,
        BLOG_TITLE,
        BLOG_CONTENT,
        BLOG_IMAGE,
        BLOG_AUTHOR,
        CREATED_AT,
        BLOG_STAUS,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

const updateBaiViet = async (req, res) => {
  const { id } = req.params; // Lấy ID bài viết từ URL
  const { BLOG_TITLE, BLOG_CONTENT, BLOG_AUTHOR, CREATED_AT, BLOG_STAUS } =
    req.body;

  // Lấy tên file nếu có upload
  const BLOG_IMAGE = req.file ? req.file.filename : undefined;

  try {
    // Tạo mảng chứa các trường và giá trị cần cập nhật
    const fieldsToUpdate = [];
    const values = [];

    if (BLOG_TITLE !== undefined) {
      fieldsToUpdate.push("BLOG_TITLE = ?");
      values.push(BLOG_TITLE);
    }
    if (BLOG_CONTENT !== undefined) {
      fieldsToUpdate.push("BLOG_CONTENT = ?");
      values.push(BLOG_CONTENT);
    }
    if (BLOG_IMAGE !== undefined) {
      fieldsToUpdate.push("BLOG_IMAGE_URL = ?");
      values.push(BLOG_IMAGE);
    }
    if (BLOG_AUTHOR !== undefined) {
      fieldsToUpdate.push("BLOG_AUTHOR = ?");
      values.push(BLOG_AUTHOR);
    }
    if (CREATED_AT !== undefined) {
      fieldsToUpdate.push("CREATED_AT = ?");
      values.push(CREATED_AT);
    }
    if (BLOG_STAUS !== undefined) {
      fieldsToUpdate.push("BLOG_STAUS = ?");
      values.push(BLOG_STAUS);
    }

    // Nếu không có trường nào để cập nhật
    if (fieldsToUpdate.length === 0) {
      return res
        .status(400)
        .json({ EM: "Không có dữ liệu để cập nhật", EC: 0 });
    }

    // Tạo câu truy vấn dynamic
    const sqlQuery = `UPDATE \`BLOGS\` SET ${fieldsToUpdate.join(
      ", "
    )} WHERE BLOG_ID_ = ?`;
    values.push(id); // Thêm ID vào cuối danh sách giá trị

    // Thực thi câu lệnh SQL
    const [results] = await connection.execute(sqlQuery, values);

    // Kiểm tra kết quả
    if (results.affectedRows === 0) {
      return res.status(404).json({ EM: "Không tìm thấy bài viết", EC: 0 });
    }

    res.status(200).json({
      EM: "Cập nhật bài viết thành công",
      EC: 1,
      DT: { id, ...req.body, BLOG_IMAGE },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

const deleteBaiViet = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await connection.execute(
      "DELETE FROM `BLOGS` WHERE BLOG_ID_ = ?",
      [id]
    );
    res.status(200).json({
      EM: "Xóa bài viết thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ EM: "Lỗi hệ thống", EC: -1 });
  }
};

module.exports = {
  getBaiViet,
  createBaiViet,
  updateBaiViet,
  deleteBaiViet,
  getBaiViet_byID,
};
