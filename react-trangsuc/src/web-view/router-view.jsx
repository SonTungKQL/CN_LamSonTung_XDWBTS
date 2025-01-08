import { useRoutes, Navigate } from "react-router-dom";
import Home from "./view-page/home";
import LoginForm from "./view-page/login";
import RegisterForm from "./view-page/register";
import Cart from "./view-page/cart";
import ProductDetail from "./view-page/select-product";
import JewelryCareGuide from "./view-page/huongdan_baoquan";
import FAQPage from "./view-page/cauhoi";
import SizingGuidePage from "./view-page/huongdan-chitiet";
import ProductList from "./view-page/sanphamdanhmuc";
import PaymentConfirmation from "./view-page/xacnhanthanhtoan";
import CheckOutMoMo from "./view-page/checkout";
import JewelryGifts from "./view-page/quaTang";
import BlogList from "./view-page/blog";
import BlogDetails from "./view-page/blog-details";
import Wishlist from "./view-page/wishList";

const RouterView = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/wish-list",
      element: <Wishlist />,
    },
    {
      path: "/register",
      element: <RegisterForm />,
    },
    {
      path: "/select-product/:id",
      element: <ProductDetail />,
    },
    {
      path: "/huongdan-baoquan",
      element: <JewelryCareGuide />,
    },
    {
      path: "/huongdan-chitiet",
      element: <SizingGuidePage />,
    },
    {
      path: "/cauhoi",
      element: <FAQPage />,
    },
    {
      path: "/productlist",
      element: <ProductList />,
    },
    {
      path: "/xacnhanthanhtoan",
      element: <PaymentConfirmation />,
    },
    {
      path: "/checkout",
      element: <CheckOutMoMo />,
    },
    {
      path: "/qua-tang",
      element: <JewelryGifts />,
    },
    {
      path: "/blog",
      element: <BlogList />,
    },
    {
      path: "/blog-details/:id",
      element: <BlogDetails />,
    },
    {
      path: "*",
      element: <Navigate to="/contact" replace />,
    },
  ]);

  return <div> {element} </div>;
};

export default RouterView;
