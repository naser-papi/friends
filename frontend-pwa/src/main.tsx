import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { CircularProgress } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./state";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<CircularProgress color="primary" />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
