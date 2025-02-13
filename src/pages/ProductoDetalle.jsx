import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Box } from "@mui/material";
import { CarritoContext } from "../context/CarritoContext";

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
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={3}
      gap={3}
      mt={5}
    >
      {/* Contenedor superior con Bloque 1 y Bloque 2 en fila */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // responsividad en movil
          width: "90%",
          maxWidth: 1100,
          gap: 3, // Espacio entre Bloque 1 y Bloque 2
          boxSizing: "border-box",
        }}
      >
        {/* Bloque 1: Imagen */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow:
              "0px 1px 9px rgba(0, 0, 0, 0.12), 0px 1px 9px rgba(0, 0, 0, 0.12)", // Sombra igual a la de MuiCard
            borderRadius: "8px",
            backgroundColor: "white",
            p: 3,
          }}
        >
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            style={{
              width: "100%",
              maxWidth: 500,
              maxHeight: 400,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* Bloque 2: Información del producto */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: 2,
            boxSizing: "border-box",
            p: 3,
            boxShadow:
              "0px 1px 9px rgba(0, 0, 0, 0.12), 0px 1px 9px rgba(0, 0, 0, 0.12)", // Sombra similar a MuiCard
            borderRadius: "8px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {producto.nombre}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            <strong>Principio activo:</strong> {producto.principio_activo}
          </Typography>
          <Typography variant="h5">
            <strong>Precio:</strong> $
            {producto.precio ? Number(producto.precio).toFixed(2) : "N/A"}
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "auto",
            }}
          >
            <Button
              variant="contained"
              onClick={agregarAlCarro}
              sx={{
                backgroundColor: "#FF0000",
                color: "white",
                padding: "12px 20px",
                fontSize: "1.2rem",
                borderRadius: "8px",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { backgroundColor: "#CC0000" },
              }}
            >
              Agregar al carrito
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Bloque 3: Descripción (100% de ancho) */}
      <Box
        sx={{
          width: "90%", // Mismo ancho que los bloques superiores
          maxWidth: 1100, // Mantiene proporción con los otros bloques
          backgroundColor: "#f9f9f9",
          boxSizing: "border-box",
          boxShadow:
            "0px 1px 9px rgba(0, 0, 0, 0.12), 0px 1px 9px rgba(0, 0, 0, 0.13)", // Sombra MuiCard
          borderRadius: "8px",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" color="text.primary">
            <strong>Descripción:</strong>{" "}
            {producto.descripcion || "Sin descripción disponible."}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductoDetalle;
