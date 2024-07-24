import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux/reducers/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <CssBaseline >
          <div style={{
            width:'100vw',
            height:'100vh'
          }} onContextMenu={(e) => e.preventDefault()}>
            <App />
          </div>
        </CssBaseline>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
