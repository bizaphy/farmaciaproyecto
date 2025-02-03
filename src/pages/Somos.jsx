import React from "react";
import Hero from "../components/Hero"; // Ajusta la ruta según la ubicación del archivo Hero.jsx
import { Container, Box, Typography } from "@mui/material";
import Slider from "react-slick";

const Somos = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  // Array de imágenes de productos
  const productos = [
    "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/92894d86637063.5d9f5174bd756.png",
    "https://as2.ftcdn.net/v2/jpg/10/25/93/09/1000_F_1025930905_Gb9Afl9UfpO1VHObOQkDEnWgkBwQKqiN.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/42f17780276945.5cdc65da88864.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/2800/a2f96d28730711.55cf215c8dce9.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/fs/20cb2328731097.55cf285de109f.jpg",
    "https://mir-s3-cdn-cf.behance.net/project_modules/2800/5d207828731309.55cf2c92af80c.jpg",
  ];

  return (
    <div>
      {/* 📌 Carrusel de productos */}
      <Box sx={{ mt: 5 }}>
        <Slider {...settings}>
          {productos.map((producto, index) => (
            <div key={index}>
              <img
                src={producto}
                alt={`Producto ${index + 1}`}
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
          ))}
        </Slider>
      </Box>
      {/* 📌 Sección HERO */}
      <Hero />

      {/* 📌 Contenido de la página */}
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: "center",
            mt: 5,
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
