import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // 📌 Contexto 1: Auth.
import { CarritoProvider } from "./context/CarritoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>  {" "}
      <CarritoProvider>
    
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </CarritoProvider>
    </AuthProvider>
  </React.StrictMode>
);
