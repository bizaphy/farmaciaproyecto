import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      style={{
        backgroundColor: "#B20000",
        color: "white",
        padding: "20px 0",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Botica Virgen de Lourdes. Todos los
        derechos reservados.
      </Typography>
      <Box mt={2}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook"
            style={{ width: "30px", height: "30px", margin: "0 10px" }} 
          />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" 
            alt="Instagram"
            style={{ width: "30px", height: "30px", margin: "0 10px" }}
          />
        </a>
      </Box>
      
    </Box>
  );
};

export default Footer;
