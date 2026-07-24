import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { Buildingcontrol } from "./context/Buildingcontext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Buildingcontrol>
      <App />
    </Buildingcontrol>
  </React.StrictMode>,
);
