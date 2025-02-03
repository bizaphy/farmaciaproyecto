import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

// 📌 Componente para mostrar un producto en la lista
const ProductosCard = ({ id, nombre, principio_activo, precio }) => {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate(); // 📌 Hook para navegación

  // 📌 Función para ir a los detalles del producto
  const irADetalle = () => {
    navigate(`/producto/${id}`); // Redirige a la página del producto
  };

  const agregarAlCarro = (e) => {
    e.stopPropagation(); // Evita que también se dispare la navegación al hacer clic en el botón
    agregarAlCarrito({ id, nombre, principio_activo, precio });
  };

  return (
    <MuiCard
      onClick={irADetalle} // 📌 tarjeta es clickeable y redirige a producto
      sx={{
        width: "100%",
        maxWidth: 345,
        margin: 2,
        boxShadow: 3,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "100%", // Hace que todas las tarjetas tengan la misma altura
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Distribuye los elementos uniformemente
          flexGrow: 1, // Permite que el contenido ocupe todo el espacio disponible
        }}
      >
        <Box>
          <Typography variant="h5">{nombre}</Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Principio Activo:</strong> {principio_activo}
          </Typography>
        </Box>

        {/* 📌 Contenedor para precio y botón */}
        <Box sx={{ mt: "auto", textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Precio:</strong> ${" "}
            {precio ? Number(precio).toFixed(2) : "N/A"}
          </Typography>

          <Button
            variant="contained"
            onClick={agregarAlCarro}
            sx={{
              backgroundColor: "#FF0000",
              color: "white",
              padding: "8px 16px",
              borderRadius: "8px",
              fontWeight: "normal",
              textTransform: "none",
              "&:hover": { backgroundColor: "#CC0000" },
            }}
          >
            Agregar al carro
          </Button>
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default ProductosCard;
