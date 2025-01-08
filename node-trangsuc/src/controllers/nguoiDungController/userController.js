const pool = require("../../config/database"); // Đảm bảo `pool` được import từ tệp kết nối cơ sở dữ liệu của bạn
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");

const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const otpStorage = new Map();

const getAllUser_Admin = async (req, res) => {
  try {
    // Check if the user already exists in the database

    const [rows] = await pool.query("SELECT * FROM USERS ");
    const results = rows;
    return res.status(200).json({
      EM: "Lấy thông tin tất cả người dùng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error in loginUserGoogle:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};

const getUser_ById = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the user already exists in the database

    const [rows] = await pool.query("SELECT * FROM USERS where USER_ID =? ", [
      id,
    ]);
    const results = rows;
    return res.status(200).json({
      EM: "Lấy thông tin tất cả người dùng thành công",
      EC: 1,
      DT: results,
    });
  } catch (error) {
    console.error("Error in loginUserGoogle:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};

// ---------------------------------------------- updateUserById
const updateUserById_Admin = async (req, res) => {
  const {
    USER_ID,
    PASSWORD,
    EMAIL,
    PHONE,
    ADDRESS_,
    UPDATED_AT,
    USER_STATUS,
    AVATAR_USER,
  } = req.body;

  // Kiểm tra xem có đủ ID người dùng để cập nhật hay không
  if (!USER_ID) {
    return res.status(400).json({
      EM: "USER_ID is missing",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Cập nhật thông tin người dùng trong database
    const [result] = await pool.query(
      `UPDATE USERS 
         SET PASSWORD = ?, 
             EMAIL = ?, 
             PHONE = ?, 
             ADDRESS_ = ?, 
             UPDATED_AT = ?, 
             USER_STATUS = ?, 
             AVATAR_USER = ? 
         WHERE USER_ID = ?`,
      [
        PASSWORD,
        EMAIL,
        PHONE,
        ADDRESS_,
        UPDATED_AT,
        USER_STATUS,
        AVATAR_USER,
        USER_ID,
      ]
    );

    // Kiểm tra kết quả cập nhật
    if (result.affectedRows === 0) {
      return res.status(404).json({
        EM: "User not found",
        EC: 0,
        DT: [],
      });
    }

    return res.status(200).json({
      EM: "Cập nhật thông tin người dùng thành công",
      EC: 1,
      DT: { USER_ID },
    });
  } catch (error) {
    console.error("Error in updateUserById:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};

const updateUserById_User = async (req, res) => {
  const { USERNAME, PHONE, ADDRESS } = req.body;

  const { USER_ID } = req.params;

  if (!USER_ID) {
    return res.status(400).json({
      EM: "ID người dùng bị thiếu",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Kiểm tra xem người dùng có tồn tại hay không
    const [existingUser] = await pool.execute(
      "SELECT * FROM USERS WHERE USER_ID = ?",
      [USER_ID]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        EM: "Không tìm thấy người dùng",
        EC: 0,
        DT: [],
      });
    }
    const userA = existingUser[0];

    // Nếu có avatar mới, lưu đường dẫn vào cơ sở dữ liệu
    let avatarUrl = userA.AVATAR; // Giữ nguyên avatar cũ nếu không có avatar mới
    if (req.file) {
      avatarUrl = req.file.filename; // Cập nhật đường dẫn của ảnh
    }
    // Cập nhật các trường không phải null
    let updateFields = [];
    let updateValues = [];

    if (ADDRESS) {
      updateFields.push("ADDRESS_ = ?");
      updateValues.push(ADDRESS);
    }
    if (USERNAME) {
      updateFields.push("USERNAME = ?");
      updateValues.push(USERNAME);
    }
    if (PHONE) {
      updateFields.push("PHONE = ?");
      updateValues.push(PHONE);
    }
    // Cập nhật avatar nếu có
    if (req.file) {
      updateFields.push("AVATAR_USER = ?");
      updateValues.push(avatarUrl);
    }

    // Ngày cập nhật
    const ngayCapNhat = new Date();
    updateFields.push("UPDATED_AT = ?");
    updateValues.push(ngayCapNhat);

    if (updateFields.length === 0) {
      return res.status(400).json({
        EM: "Không có thông tin cần cập nhật",
        EC: 0,
        DT: [],
      });
    }

    // Cập nhật người dùng
    const updateQuery = `
      UPDATE USERS 
      SET ${updateFields.join(", ")}
      WHERE USER_ID  = ?
    `;
    updateValues.push(USER_ID);

    const [updateResult] = await pool.execute(updateQuery, updateValues);

    if (updateResult.affectedRows === 0) {
      return res.status(400).json({
        EM: "Không có gì thay đổi",
        EC: 0,
        DT: [],
      });
    }

    // Trả về thông tin người dùng sau cập nhật
    const [updatedUser] = await pool.execute(
      "SELECT * FROM USERS  WHERE USER_ID = ?",
      [USER_ID]
    );

    const user = updatedUser[0];
    const token = jwt.sign(
      {
        USER_ID: user.USER_ID,
        USERNAME: user.USERNAME,
        PASSWORD: user.PASSWORD,
        EMAIL: user.EMAIL,
        PHONE: user.PHONE,
        ADDRESS_: user.ADDRESS_,
        AVATAR_USER: user.AVATAR_USER,
        CREATED_AT: user.CREATED_AT,
        UPDATED_AT: user.UPDATED_AT,
        USER_STATUS: user.USER_STATUS,
      },
      JWT_SECRET,
      { expiresIn: "5h" }
    );

    return res.status(200).json({
      EM: "Cập nhật thông tin thành công",
      EC: 1,
      DT: updatedUser[0],
      accessToken: token,
    });
  } catch (error) {
    console.error("Lỗi trong updateUserById_User:", error);
    return res.status(500).json({
      EM: `Lỗi hệ thống: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};

const loginUserGoogle = async (req, res) => {
  const { email, HO_TEN } = req.body;
  console.log("req.body loginUserGoogle", req.body);

  if (!email) {
    return res.status(401).json({
      EM: "email is missing",
      EC: 401,
      DT: [],
    });
  }

  try {
    // Kiểm tra nếu người dùng đã tồn tại trong cơ sở dữ liệu
    const [rows] = await pool.query("SELECT * FROM USERS WHERE EMAIL = ?", [
      email,
    ]);

    if (rows.length > 0) {
      const user = rows[0];
      console.log(user);

      // Tạo token JWT
      const token = jwt.sign(
        {
          USER_ID: user.USER_ID,
          EMAIL: user.EMAIL,
          USERNAME: user.USERNAME,
          PHONE: user.PHONE,
          ADDRESS_: user.ADDRESS_,
          USER_STATUS: user.USER_STATUS,
          CREATED_AT: user.CREATED_AT,
          UPDATED_AT: user.UPDATED_AT,
          AVATAR_USER: user.AVATAR_USER,
          ROLE: user.ROLE,
        },
        JWT_SECRET,
        { expiresIn: "5h" }
      );
    
      // Kiểm tra nếu tài khoản bị vô hiệu hóa
      if (user.USER_STATUS == "Ngưng hoạt động") {
        return res.status(403).json({
          EM: "Tài khoản đã bị khóa, không thể đăng nhập",
          EC: 403,
          DT: "Account is disabled",
        });
      }

      return res.status(200).json({
        EM: "Login successful",
        EC: 200,
        DT: {
          accessToken: token,
          userInfo: {
            USER_ID: user.USER_ID,
            EMAIL: user.EMAIL,
            USERNAME: user.USERNAME,
            PHONE: user.PHONE,
            ADDRESS_: user.ADDRESS_,
            USER_STATUS: user.USER_STATUS,
            CREATED_AT: user.CREATED_AT,
            UPDATED_AT: user.UPDATED_AT,
            AVATAR_USER: user.AVATAR_USER,
            ROLE: user.ROLE,
          },
        },
      });
    } else {
      // Thêm người dùng mới vào cơ sở dữ liệu
      const ROLE = 0;
      const USER_STATUS = "Đang hoạt động";
      const [insertResult] = await pool.query(
        "INSERT INTO USERS (EMAIL, USERNAME, USER_STATUS, CREATED_AT, UPDATED_AT,ROLE) VALUES (?, ?, ?, NOW(), NOW(),?)",
        [email, HO_TEN, USER_STATUS, ROLE]
      );

      const [newUserRows] = await pool.query(
        "SELECT * FROM USERS WHERE EMAIL = ?",
        [email]
      );

      const newUser = newUserRows[0];

      const token = jwt.sign(
        {
          USER_ID: newUser.USER_ID,
          EMAIL: newUser.EMAIL,
          USERNAME: newUser.USERNAME,
          PHONE: newUser.PHONE,
          ADDRESS_: newUser.ADDRESS_,
          USER_STATUS: newUser.USER_STATUS,
          CREATED_AT: newUser.CREATED_AT,
          UPDATED_AT: newUser.UPDATED_AT,
          AVATAR_USER: newUser.AVATAR_USER,
          ROLE: newUser.ROLE,
        },
        JWT_SECRET,
        { expiresIn: "5h" }
      );

      return res.status(200).json({
        EM: "New user created and logged in successfully",
        EC: 200,
        DT: {
          accessToken: token,
          userInfo: {
            USER_ID: newUser.USER_ID,
            EMAIL: newUser.EMAIL,
            USERNAME: newUser.USERNAME,
            PHONE: newUser.PHONE,
            ADDRESS_: newUser.ADDRESS_,
            USER_STATUS: newUser.USER_STATUS,
            CREATED_AT: newUser.CREATED_AT,
            UPDATED_AT: newUser.UPDATED_AT,
            AVATAR_USER: newUser.AVATAR_USER,
            ROLE: newUser.ROLE,
          },
        },
      });
    }
  } catch (error) {
    console.error("Error in loginUserGoogle:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: 500,
      DT: [],
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra thông tin đầu vào
  if (!email || !password) {
    return res.status(400).json({
      EM: "Email và mật khẩu không được để trống",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Tìm người dùng dựa trên email
    const [rows] = await pool.query("SELECT * FROM USERS WHERE EMAIL = ?", [
      email,
    ]);

    // Kiểm tra xem người dùng có tồn tại không
    if (rows.length === 0) {
      return res.status(404).json({
        EM: "Người dùng không tồn tại",
        EC: 0,
        DT: [],
      });
    }

    const user = rows[0];

    // So sánh mật khẩu được lưu trữ với mật khẩu nhập vào
    const isPasswordValid = await bcrypt.compare(password, user.PASSWORD);
    if (!isPasswordValid) {
      return res.status(401).json({
        EM: "Mật khẩu không đúng",
        EC: 0,
        DT: [],
      });
    }

    // Kiểm tra trạng thái người dùng
    if (user.USER_STATUS ==="Ngưng hoạt động") {
      return res.status(403).json({
        EM: "Tài khoản bị khóa, không thể đăng nhập",
        EC: 0,
        DT: "Account is disabled",
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      {
        USER_ID: user.USER_ID,
        EMAIL: user.EMAIL,
        USERNAME: user.USERNAME,
        PHONE: user.PHONE,
        ADDRESS_: user.ADDRESS_,
        USER_STATUS: user.USER_STATUS,
        CREATED_AT: user.CREATED_AT,
        UPDATED_AT: user.UPDATED_AT,
        AVATAR_USER: user.AVATAR_USER,
        ROLE: user.ROLE,
      },
      JWT_SECRET,
      { expiresIn: "5h" }
    );

    // Trả về thông tin đăng nhập
    return res.status(200).json({
      EM: "Đăng nhập thành công",
      EC: 1,
      DT: {
        accessToken: token,
        userInfo: {
          USER_ID: user.USER_ID,
          EMAIL: user.EMAIL,
          USERNAME: user.USERNAME,
          PHONE: user.PHONE,
          ADDRESS_: user.ADDRESS_,
          USER_STATUS: user.USER_STATUS,
          CREATED_AT: user.CREATED_AT,
          UPDATED_AT: user.UPDATED_AT,
          AVATAR_USER: user.AVATAR_USER,
          ROLE: user.ROLE,
        },
      },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({
      EM: `Lỗi: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};

const verifyAdmin = async (req, res) => {
  const { token } = req.body;

  // Kiểm tra token
  if (!token) {
    return res.status(401).json({
      EM: "Token is missing",
      EC: 401,
      DT: { isAdmin: false },
    });
  }

  try {
    // Giải mã token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Lấy ID người dùng từ token
    const USER_ID = decoded.USER_ID;

    // Truy vấn thông tin vai trò người dùng
    const [rows] = await pool.query(
      "SELECT ROLE FROM USERS WHERE USER_ID = ?",
      [USER_ID]
    );

    if (rows.length > 0) {
      const user = rows[0];

      // Kiểm tra vai trò của người dùng (ví dụ: `USER_STATUS` = 1 là admin)
      if (user.ROLE == 1) {
        return res.status(200).json({
          EM: "User is admin",
          EC: 200,
          DT: { isAdmin: true }, // Người dùng là admin
        });
      } else {
        return res.status(403).json({
          EM: "User is not admin",
          EC: 403,
          DT: { isAdmin: false }, // Người dùng không phải admin
        });
      }
    } else {
      return res.status(404).json({
        EM: "User not found",
        EC: 404,
        DT: { isAdmin: false }, // Không tìm thấy người dùng
      });
    }
  } catch (error) {
    console.error("Error decoding token or querying database:", error);
    return res.status(401).json({
      EM: `Invalid token: ${error.message}`, // Token không hợp lệ
      EC: 401,
      DT: { isAdmin: false },
    });
  }
};

const registerUser = async (req, res) => {
  const {
    password,
    email,
    fullName,
    phone,
    address = null, // Mặc định null nếu không có địa chỉ
    USER_STATUS = "Đang hoạt động", 
    AVATAR_USER = null, // Mặc định không có avatar
  } = req.body.formData;
  const ROLE = 0;
  const USERNAME = fullName; // Giả sử `USERNAME` giống với `EMAIL`
  const hashedPassword = await bcrypt.hash(password, 10);

  // Kiểm tra thông tin bắt buộc
  if (!USERNAME || !hashedPassword || !fullName || !phone) {
    return res.status(400).json({
      EM: "Missing required fields",
      EC: 0,
      DT: [],
    });
  }

  try {
    // Kiểm tra email đã tồn tại chưa
    const [existingUser] = await pool.query(
      `SELECT * FROM USERS WHERE EMAIL = ?`,
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        EM: "Tài khoản email này đã được đăng ký",
        EC: 0,
        DT: [],
      });
    }

    // Đăng ký người dùng mới
    const [result] = await pool.query(
      `INSERT INTO USERS (
        USERNAME, PASSWORD, EMAIL, PHONE, ADDRESS_, CREATED_AT, UPDATED_AT, USER_STATUS, AVATAR_USER,ROLE
      ) VALUES (?, ?, ?, ?, ?, NOW(), NOW(), ?, ?,?)`,
      [
        USERNAME,
        hashedPassword,
        email,
        phone,
        address,
        USER_STATUS,
        AVATAR_USER,
        ROLE,
      ]
    );

    return res.status(200).json({
      EM: "Đăng ký tài khoản thành công",
      EC: 1,
      DT: {
        USER_ID: result.insertId, // ID của người dùng vừa đăng ký
        EMAIL: email,
        FULLNAME: fullName,
      },
    });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({
      EM: `Error: ${error.message}`,
      EC: -1,
      DT: [],
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  return res.status(200).json({ message: "Đăng xuất thành công" });
};
// API thay đổi avatar
const updateAvatarController = async (req, res) => {
  try {
    const { id } = req.params;
    const { avatar } = req.body;
    const updatedAt = new Date();
    const avatarFile = req.file ? path.basename(req.file.path) : avatar;

    // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
    const [results] = await pool.execute(
      "SELECT * FROM USERS WHERE USER_ID = ?",
      [id]
    );
    console.log("id user =>", id);

    if (results.length > 0) {
      // Cập nhật avatar và ngày cập nhật của người dùng
      await pool.execute(
        "UPDATE USERS SET UPDATED_AT = ?, AVATAR_USER = ? WHERE USER_ID = ?",
        [updatedAt, avatarFile, id]
      );

      // Lấy thông tin mới nhất của người dùng sau khi cập nhật
      const [updatedUser] = await pool.execute(
        "SELECT * FROM USERS WHERE USER_ID = ?",
        [id]
      );

      console.log("updatedUser[0]", updatedUser[0]);
      const user = updatedUser[0];

      // Tạo token JWT mới với thông tin đã cập nhật
      const token = jwt.sign(
        {
          USER_ID: user.USER_ID,
          EMAIL: user.EMAIL,
          USERNAME: user.USERNAME,
          PHONE: user.PHONE,
          ADDRESS_: user.ADDRESS_,
          USER_STATUS: user.USER_STATUS,
          CREATED_AT: user.CREATED_AT,
          UPDATED_AT: user.UPDATED_AT,
          AVATAR_USER: user.AVATAR_USER,
          ROLE: user.ROLE,
        },
        JWT_SECRET,
        { expiresIn: "5h" }
      );

      return res.status(200).json({
        EM: "Cập nhật thông tin thành công",
        EC: 1,
        DT: updatedUser,
        accessToken: token,
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy người dùng",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating avatar:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật avatar",
      EC: 0,
      DT: [],
    });
  }
};

const updatePasswordUser = async (req, res) => {
  const { USER_ID, newPassword } = req.body;

  // Kiểm tra xem các trường có được điền đầy đủ không
  if (!USER_ID || !newPassword) {
    return res.status(400).json({ message: "Tất cả các trường đều yêu cầu" });
  }

  try {
    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu vào cơ sở dữ liệu
    const [result] = await pool.execute(
      "UPDATE USERS SET PASSWORD = ?, UPDATED_AT = NOW() WHERE USER_ID = ?",
      [hashedPassword, USER_ID]
    );

    // Kiểm tra xem việc cập nhật có thành công không
    if (result.affectedRows > 0) {
      return res.status(200).json({
        EM: "Cập nhật mật khẩu thành công",
        EC: 1,
        DT: [],
      });
    } else {
      return res.status(404).json({
        EM: "Không tìm thấy người dùng với email này",
        EC: 0,
        DT: [],
      });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({
      EM: "Có lỗi xảy ra khi cập nhật mật khẩu",
      EC: 0,
      DT: [],
    });
  }
};

module.exports = {
  loginUserGoogle,
  verifyAdmin,
  logoutUser,

  updateUserById_Admin,
  getAllUser_Admin,
  updateAvatarController,
  getUser_ById,
  updateUserById_User,

  updatePasswordUser,

  registerUser,
  loginUser,
};
