import { useRoutes, Navigate } from "react-router-dom";
import DashboardAdmin from "./pages/DashboardAdmin";
import CategoryCRUD from "./pages/sanPhamAdmin.jsx/page/categoryAdmin";
import ProductManager from "./pages/sanPhamAdmin.jsx/page/sanPhamAdmin";
import UserAdmin from "./pages/userPage/page/userAdmin";
import OrderManagement from "./pages/donhangAdmin/donhang";
import BlogCRUD from "./pages/userPage/page/baiVietAdmin";
const RouterAdmin = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <DashboardAdmin />,
    },
    {
      path: "/san-pham",
      element: <ProductManager />,
    },
    {
      path: "/nguoi-dung",
      element: <UserAdmin />,
    },
    {
      path: "/san-pham/danh-muc",
      element: <CategoryCRUD />,
    },
    {
      path: "/donhang",
      element: <OrderManagement />,
    },
    {
      path: "/blog",
      element: <BlogCRUD />,
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />, // Chuyển hướng nếu không tìm thấy route
    },
  ]);

  return element;
};

export default RouterAdmin;
