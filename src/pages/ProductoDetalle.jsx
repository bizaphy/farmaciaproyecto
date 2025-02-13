import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { CarritoContext } from "../context/CarritoContext"; // 🔹 Importamos el contexto del carrito

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CarritoContext);

  useEffect(() => {
    fetch(`https://farmaciaproyecto.onrender.com/api/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          setError(
            `Error: No se pudo obtener el producto (${response.status})`
          );
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setProducto(data);
        }
      })
      .catch(() => setError("Error de conexión con el servidor"))
      .finally(() => setLoading(false));
  }, [id]);

  const agregarAlCarro = () => {
    if (!producto) return;

    agregarAlCarrito({
      id: producto.id,
      nombre: producto.nombre,
      principio_activo: producto.principio_activo,
      precio: producto.precio,
      imagen_url: producto.imagen_url,
    });

    console.log(`Producto agregado al carrito: ${producto.nombre}`);
  };

  if (loading || error || !producto) {
    return (
      <Typography align="center" color={error ? "error" : "textPrimary"}>
        {loading
          ? "⏳ Cargando producto..."
          : error || "❌ Producto no encontrado."}
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          boxShadow: 3,
          maxHeight: "80vh",
        }}
      >
        {producto.imagen_url && (
          <CardMedia
            component="img"
            height="550"
            image={producto.imagen_url}
            alt={producto.nombre}
          />
        )}

        <CardContent>
          <Typography variant="h5" component="div">
            {producto.nombre}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            <strong>Principio activo:</strong> {producto.principio_activo}
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            <strong>Precio:</strong> $
            {producto.precio ? Number(producto.precio).toFixed(2) : "N/A"}
          </Typography>

          <Box sx={{ mt: "auto", textAlign: "center", pt: 2 }}>
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
      </Card>
    </Box>
  );
};

export default ProductoDetalle;
