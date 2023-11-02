import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LiffProvider } from "react-liff";

import { Provider } from 'react-redux';
import { createStore } from "redux";
import { store } from "./store/store.js";
//import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension.js";

const liffId = import.meta.env.VITE_LIFF_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <LiffProvider liffId={liffId}>
      <Provider store={store}>
        <App />
      </Provider>
    </LiffProvider>

  </React.StrictMode>
);