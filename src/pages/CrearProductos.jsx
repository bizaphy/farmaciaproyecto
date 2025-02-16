import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

function CrearProducto() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Obtener el token de autenticación
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Incluir el token si es necesario
        },
        body: JSON.stringify({
          nombre: formData.name, // Asegurar que coincida con los campos de la DB
          descripcion: formData.description,
          precio: parseFloat(formData.price),
          image_url: formData.image_url,
          user_id: user?.id || null, // Si necesitas almacenar el usuario
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
      }
      navigate("/productos"); // Redirigir después de éxito
      const data = await response.json();
      return data;
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
          Crear Nueva Publicación
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            margin="normal"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Descripción"
            variant="outlined"
            margin="normal"
            required
            multiline
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <TextField
            fullWidth
            label="Precio"
            type="number"
            variant="outlined"
            margin="normal"
            required
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            InputProps={{
              inputProps: { step: "0.01" },
            }}
          />

          <TextField
            fullWidth
            label="URL de la imagen"
            type="url"
            variant="outlined"
            margin="normal"
            required
            value={formData.image_url}
            onChange={(e) =>
              setFormData({ ...formData, image_url: e.target.value })
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              bgcolor: "#FF0000",
              "&:hover": { bgcolor: "#45a049" },
            }}
          >
            Publicar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CrearProducto;