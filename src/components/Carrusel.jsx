import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

const CarouselProductos = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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

  const productos = [
    {
      url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/vitaminas_yyrhqr.jpg",
      alt: "Publicidad de colageno y calcio con vitamina D",
    },
    {
      url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/La_roche_antihelios_ehidph.jpg",
      alt: "Publicidad de protector solar Anthelios La Roche",
    },
    {
      url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/abrilar_lq5g9o.jpg",
      alt: "Publicidad de jarabe para la tos ABRILAR",
    },
    {
      url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/optimum_whey_upsasj.jpg",
      alt: "Publicidad de proteina WHEY gold standard",
    },
    {
      url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/aspirina_bycjz6.jpg",
      alt: "Publicidad de aspirina",
    },
    {
      url: "https://res.cloudinary.com/ddlbn5fnx/image/upload/v1738716036/fastlyte_uvrxai.jpg",
      alt: "Publicididad de bebida hidratante Fastlyte",
    },
  ];

  return (
    <Box
      sx={{
        mt: 3,
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Slider {...settings}>
        {productos.map((producto, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            <img
              src={producto.url}
              alt={producto.alt}
              style={{
                width: "clamp(150px, 90%, 430px)",
                height: "clamp(150px, 90%, 430px)",
                objectFit: "cover",
                borderRadius: "8px",
                maxWidth: "100%",
              }}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselProductos;
