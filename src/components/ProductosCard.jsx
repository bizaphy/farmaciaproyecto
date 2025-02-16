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
  descripcion,
  precio,
  imagen_url,
}) => {
  // Extraemos funciones y datos del contexto
  const { agregarAlCarrito, carrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  // Función para redirigir al detalle del producto

  const irADetalle = () => {
    navigate(`/producto/${id}`);
  };
  const productoEnCarrito = carrito.some((item) => item.id === id);

  // Función para agregar un producto al carrito
  const agregarAlCarro = (e) => {
    e.stopPropagation(); // Evita que se active el evento "onClick" del card
    agregarAlCarrito({ id, nombre, principio_activo, precio, imagen_url });
  };

  // Verificamos si el producto ya está en el carrito

  return (
    <MuiCard
      onClick={irADetalle}
      sx={{
        width: "100%",
        maxWidth: 1000,
        margin: 2,
        boxShadow: 3,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "auto",
      }}
    >
      <CardMedia
        component="img"
        image={imagen_url || "https://via.placeholder.com/345x345"}
        alt={nombre}
        sx={{
          width: "100%",
          objectFit: "cover",
        }}
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
            <strong>Descripcion:</strong> {descripcion}
          </Typography>
        </Box>

        {/* Contenedor para precio y botón */}
        <Box sx={{ mt: "auto", textAlign: "center", pt: 2 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Precio:</strong> $
            {precio ? Number(precio).toFixed(2) : "N/A"}
          </Typography>

          {productoEnCarrito ? (
            <Typography variant="body2" color="text.secondary">
              Producto en el carrito
            </Typography>
          ) : (
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
          )}
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default ProductosCard;
