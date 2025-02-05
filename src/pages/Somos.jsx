import React from "react";
import Hero from "../components/Hero";
import { Container, Box, Typography } from "@mui/material";
import Carrusel from "../components/Carrusel"; // Importamos el nuevo componente

const Somos = () => {
  return (
    <div>
      {/* 📌 Carrusel de productos */}
      <Carrusel />

      {/* 📌 Sección HERO */}
      <Hero />

      {/* 📌 Contenido de la página */}
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            mt: 5,
            mb: 12,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "white",
          }}
        >
          <Typography variant="h6" color="#B20000" fontWeight="bold" paragraph>
            Cuidando de tu bienestar con compromiso y experiencia
          </Typography>

          <Typography variant="body1" paragraph>
            En la <strong>Botica Virgen de Lourdes</strong>, nos dedicamos a
            ofrecer productos farmacéuticos y de bienestar con un compromiso
            inquebrantable hacia la salud y el cuidado de nuestra comunidad. Con
            años de experiencia en el sector, brindamos un servicio cercano y
            profesional, asegurando la mejor atención y asesoría para cada uno
            de nuestros clientes.
          </Typography>

          <Typography variant="body1">
            Nuestra misión es garantizar el acceso a{" "}
            <strong>medicamentos de calidad</strong>, complementos naturales y
            productos de cuidado personal, siempre con un enfoque humano y
            ético. Creemos en la importancia de un trato personalizado, en la
            confianza como base de nuestra labor y en la responsabilidad de
            contribuir al bienestar de quienes nos eligen día a día.
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Somos;
