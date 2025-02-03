import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

const CarouselProductos = () => {
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

  // Lista de productos con URL e imagen descriptiva para accesibilidad
  const productos = [
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/92894d86637063.5d9f5174bd756.png",
      alt: "Publicidad de bebida hidratante Electrolit y sus disitntas variedades",
    },
    {
      url: "https://as2.ftcdn.net/v2/jpg/10/25/93/09/1000_F_1025930905_Gb9Afl9UfpO1VHObOQkDEnWgkBwQKqiN.jpg",
      alt: "Imagen representativa de frasco de medicamento abierto",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/42f17780276945.5cdc65da88864.jpg",
      alt: "Solucion sabor menta Erhosil",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/2800/a2f96d28730711.55cf215c8dce9.jpg",
      alt: "Publicidad de Olopatadina, medicamento para alergia",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/20cb2328731097.55cf285de109f.jpg",
      alt: "Publicidad de Pediacort, medicamento respiratorio con corticoides",
    },
    {
      url: "https://mir-s3-cdn-cf.behance.net/project_modules/2800/5d207828731309.55cf2c92af80c.jpg",
      alt: "Publicididad de Apiret. Medicamento en jarabe de paracetamol",
    },
  ];

  return (
    <Box sx={{ mt: 5 }}>
      <Slider {...settings}>
        {productos.map((producto, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              src={producto.url}
              alt={producto.alt} // ALT para accesibilidad
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselProductos;
