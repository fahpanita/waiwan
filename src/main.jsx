import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LiffProvider } from "react-liff";

const liffId = import.meta.env.VITE_LIFF_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <LiffProvider liffId={liffId}> */}
    <App />
    {/* </LiffProvider> */}
  </React.StrictMode>
);
