import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Button,
  Box,
  CardMedia,
} from "@mui/material";

const ProductosCard = ({
  id,
  nombre,
  principio_activo,
  precio,
  imagen_url,
}) => {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  const irADetalle = () => {
    navigate(`/producto/${id}`);
  };

  const agregarAlCarro = (e) => {
    e.stopPropagation();
    agregarAlCarrito({ id, nombre, principio_activo, precio, imagen_url });
  };

  return (
    <MuiCard
      onClick={irADetalle}
      sx={{
        width: "100%",
        maxWidth: 345,
        margin: 2,
        boxShadow: 3,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "500px", // 📌 Altura fija para todas las tarjetas
      }}
    >
      {/* 📌 Imagen del producto */}
      <CardMedia
        component="img"
        height="200" // 📌 Altura de la imagen
        image={imagen_url || "https://via.placeholder.com/345x200"} // Imagen por defecto si no hay URL
        alt={nombre}
        sx={{ objectFit: "cover" }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
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
            <strong>Precio:</strong> $
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
