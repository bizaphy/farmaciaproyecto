import React from "react";
import { Box, Container, Typography } from "@mui/material";
import ProductosList from "../components/ProductosList";

const Productos = () => {
  return (
    <Container
      maxWidth="xl" //
      sx={{
        maxWidth: { xs: "100%", lg: "1400px", xl: "1600px" }, // 🔹 Personalización para pantallas grandes
        paddingX: { xs: 2, sm: 4, md: 6, lg: 8, xl: 12 }, // Márgenes laterales adaptativos
        mt: 4, // 🔹 Espaciado superior
      }}
    >
      <Typography variant="h4" textAlign="center" mb={4}>
        Productos
      </Typography>

      <ProductosList />
    </Container>
  );
};

export default Productos;
