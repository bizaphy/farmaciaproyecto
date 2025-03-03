import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Box,
  Paper,
  Menu,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import { Search, ShoppingCart, Person, Phone } from "@mui/icons-material"; // Importar ícono Phone
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/logo_rojo.png";
import { styled } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Estado para controlar el menú desplegable
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Función para abrir el menú
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el menú
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    signOut(); // Cerrar sesión
    handleMenuClose(); // Cerrar el menú
    navigate("/"); // Redirigir a la página principal
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/buscar?query=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      {/* Franja roja superior con animación */}
      <Box
        style={{
          backgroundColor: "#FF0000",
          height: "30px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          overflow: "hidden", // Para ocultar el contenido que se sale del Box
          position: "relative", // Necesario para la animación
        }}
      >
        {/* Contenido animado */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px", // Espacio entre el ícono y el texto
            whiteSpace: "nowrap", // Evita que el texto se divida en varias líneas
            animation: "moveText 10s linear infinite", // Animación CSS
            position: "absolute", // Para mover el contenido
          }}
        >
          <Phone style={{ color: "white" }} />{" "}
          {/* Ícono de teléfono de Material-UI */}
          <span style={{ color: "white" }}>Delivery: +1 234 567 890</span>{" "}
          {/* Texto con el número */}
        </div>

        {/* Definición de la animación en línea */}
        <style>
          {`
            @keyframes moveText {
              0% {
                transform: translateX(100%); /* Comienza fuera del Box, a la derecha */
              }
              100% {
                transform: translateX(-100%); /* Termina fuera del Box, a la izquierda */
              }
            }
          `}
        </style>
      </Box>

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
          <Link to="/buscar" style={{ textDecoration: "none" }}>
            <Button
              variant="text"
              sx={{
                color: "#808080",
                borderRadius: "12px",
                padding: "6px 12px",
                fontSize: "1.35rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#808080",
                },
              }}
            >
              Busca tus productos
            </Button>
          </Link>

          {/* Íconos de usuario y carrito */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconButton onClick={handleMenuOpen}>
              {user ? (
                <Avatar
                  alt={user.nombre}
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <Person style={{ color: "black", fontSize: "1.5rem" }} />
              )}
            </IconButton>

            {/* Menú desplegable */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              {user ? (
                // Si el usuario está autenticado
                <>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/perfil");
                    }}
                  >
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                </>
              ) : (
                // Si el usuario no está autenticado
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("/login");
                  }}
                >
                  Iniciar Sesión
                </MenuItem>
              )}
            </Menu>

            {/* Ícono de carrito */}
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
        {!user && (
          // Si el usuario no está autenticado
          <>
            <StyledLink to="/register">Registrarse</StyledLink>
          </>
        )}
        {user && (
          // Si el usuario está autenticado
          <>
            <StyledLink to="/crear-producto">Crear Producto</StyledLink>
            <StyledLink to="/lista-productos">Modificar Producto</StyledLink>
          </>
        )}
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
