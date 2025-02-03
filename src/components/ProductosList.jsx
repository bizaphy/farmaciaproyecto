import React, { useEffect, useState } from "react";
import ProductosCard from "./ProductosCard";
import { Box, Typography, CircularProgress } from "@mui/material";

// 📌 Componente para mostrar/renderizar la lista de productos
const ProductosList = () => {
  const [productos, setProductos] = useState([]); //  Estado para guardar la lista de productos obtenidos desde la API
  const [loading, setLoading] = useState(true); //  Estado para controlar la carga de los productos

  //  useEffect para obtener los productos desde el backend al montar el componente
  useEffect(() => {
    fetch("https://farmaciaproyecto.onrender.com/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Productos recibidos:", data);
        setProductos(data); //  Almacena los productos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
      })
      .finally(() => {
        setLoading(false); // Finaliza la carga cuando la petición termina
      });
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "16px",
        justifyContent: "center",
        mt: 4,
        p: 2,
      }}
    >
      {/* indicador de carga mientras se obtienen los productos */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <CircularProgress color="primary" />
        </Box>
      ) : productos.length === 0 ? (
        <Box sx={{ textAlign: "center", width: "100%" }}>
          <Typography variant="h6" color="textSecondary">
            No hay productos disponibles
          </Typography>
        </Box>
      ) : (
        // 📌 Renderiza la lista de productos
        productos.map((producto) => (
          <Box
            key={producto.id}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ProductosCard
              id={producto.id}
              nombre={producto.nombre}
              principio_activo={producto.principio_activo}
              precio={producto.precio}
            />
          </Box>
        ))
      )}
    </Box>
  );
};

export default ProductosList;
