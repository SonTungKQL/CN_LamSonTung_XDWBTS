import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
console.log('client ' , CLIENT_ID)
root.render(
  <GoogleOAuthProvider
    clientId={CLIENT_ID}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>
);
