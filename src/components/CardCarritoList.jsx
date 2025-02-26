import React, { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext"; // Importa useAuth
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir
import CarritoCard from "./CarritoCard";
import { Box, Typography, Button } from "@mui/material";

const CardCarritoList = () => {
  const { carrito, calcularTotal } = useContext(CarritoContext);
  const { user } = useAuth(); // Obtén el usuario actual
  const navigate = useNavigate(); // Hook para redirigir
  const handlePagar = () => {
    if (!user) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      alert("Debes iniciar sesión para continuar con la compra.");
      navigate("/login"); 
    } else {
      // Si el usuario está autenticado, procede con el pago
      alert("Redirigiendo al proceso de pago...");
     
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      width="100%"
    >
      {/* 📌 GENERACION DEL CARRITO (si hay por lo menos 1 producto en el carrito) */}
      {carrito.length === 0 ? (
        <Typography>Tu carrito está vacío</Typography>
      ) : (
        <>
          {carrito.map((producto) => (
            <CarritoCard
              key={producto.id}
              id={producto.id}
              imagen_url={producto.imagen_url}
              nombre={producto.nombre}
              principio_activo={producto.principio_activo}
              precio={producto.precio}
              cantidad={producto.cantidad}
            />
          ))}
          {/* 📌 TOTAL DEL CARRITO */}
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            <strong>Total:</strong> ${calcularTotal().toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#FF0000",
              "&:hover": { backgroundColor: "#CC0000" },
              marginTop: 2,
              fontWeight: "normal",
              textTransform: "none",
              fontSize: 18,
            }}
            onClick={handlePagar}
          >
            Pagar
          </Button>
        </>
      )}
    </Box>
  );
};

export default CardCarritoList;
