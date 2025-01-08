import { useRoutes, Navigate } from "react-router-dom";

import UserProfile from "./pages/userProfile";
import OrderPage from "./pages/orderprofile";
const UserRouter = () => {
  const element = useRoutes([
    {
      path: "/thongtincanhan",
      element: <UserProfile />,
    },
    {
      path: "/",
      element: <UserProfile />,
    },
    {
      path: "/order",
      element: <OrderPage />,
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ]);

  return element;
};

export default UserRouter;
