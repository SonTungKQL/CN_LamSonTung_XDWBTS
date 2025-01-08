import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOutMoMo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);
  const [orderDetails, setOrderDetails] = useState();
  const ordersinfo = JSON.parse(localStorage.getItem("orderData"));
  const api = process.env.REACT_APP_URL_SERVER;
  useEffect(() => {
    if (ordersinfo) {
      setOrderDetails(ordersinfo);
    }
  }, []);

  useEffect(() => {
    if (orderDetails && check) {
      handleOrder();
    }
  }, [orderDetails, check]);

  const handleOrder = async () => {
    try {
      console.log("chálkdjsadkljad", orderDetails);
      const response = await axios.post(
        `${api}/gio-hang/add-donhang`,
        orderDetails
      );

      localStorage.removeItem("orderData");
      setCheck(false); // Ensure `handleOrder` runs only once

      if (response.data.EC === 200) {
        navigate("/");
      } else {
        console.error("order error:", response.data);
      }
    } catch (error) {
      console.error("Error when order:", error);
    }
  };

  return null;
};

export default CheckOutMoMo;
