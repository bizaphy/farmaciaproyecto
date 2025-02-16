import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import { Search, ShoppingCart, Person } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo_rojo.png";
import { styled } from "@mui/material/styles";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/buscar?query=${searchTerm}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Franja roja superior */}
      <Box
        style={{
          backgroundColor: "#FF0000",
          height: "30px",
          width: "100%",
        }}
      ></Box>

      {/* Barra principal de la navbar */}
      <AppBar
        position="static"
        style={{ backgroundColor: "#fff", boxShadow: "none" }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "75px",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link to="/">
              <img
                src={logo}
                alt="Logo Botica Virgen de Lourdes"
                style={{ height: "50px" }}
              />
            </Link>
          </div>

          {/* Buscador */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flex: 1,
              margin: "0 20px", // Ajuste de margen para centrar
            }}
          >
            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%", // Ocupa todo el espacio disponible
                maxWidth: "600px", // Aumentar el ancho máximo
                borderRadius: "25px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <InputBase
                placeholder="Busca tu producto"
                sx={{
                  ml: 2,
                  flex: 1,
                  fontSize: "1.1rem", // Tamaño de fuente más grande
                  padding: "10px 0", // Ajuste de padding para mayor altura
                }}
                value={searchTerm}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              <IconButton
                onClick={handleSearch}
                sx={{
                  p: "12px", // Aumentar el padding del botón
                  color: "#FF0000",
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.1)", // Efecto hover suave
                  },
                }}
              >
                <Search style={{ fontSize: "1.5rem" }} />{" "}
                {/* Icono más grande */}
              </IconButton>
            </Paper>
          </div>

          {/* Íconos de usuario y carrito */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link
              to="/perfil"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton>
                <Person style={{ color: "black", fontSize: "1.5rem" }} />{" "}
                {/* Icono más grande */}
              </IconButton>
            </Link>
            <Link
              to="/carrito"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton>
                <ShoppingCart style={{ color: "black", fontSize: "1.5rem" }} />{" "}
                {/* Icono más grande */}
              </IconButton>
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      {/* Enlaces de navegación */}
      <Box
        style={{
          backgroundColor: "white",
          fontSize: "20px",
          padding: "0px 0px 10px 0px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          textAlign: "center",
          paddingBottom: "10px",
        }}
      >
        <StyledLink to="/">Somos</StyledLink>
        <StyledLink to="/productos">Productos</StyledLink>
        <StyledLink to="/Crear-Productos">Crear Productos</StyledLink>
        <StyledLink to="/login">Login</StyledLink>
        <StyledLink to="/register">Registrarse</StyledLink>
      </Box>
    </div>
  );
};

const StyledLink = styled(Link)(({ theme }) => ({
  color: "#FF0000",
  textDecoration: "none",
  fontWeight: "bold",
  padding: "8px 12px",
  borderRadius: "5px",
  display: "inline-block",
  transition: "all 0.2s ease-in-out",

  "&:hover": {
    opacity: 0.7,
  },

  "&:active": {
    transform: "scale(0.95)",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    padding: "5px 8px",
  },
}));

export default Navbar;
