import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  Inventory,
  Medication,
  Numbers,
  Description,
  AttachMoney,
  Image,
  Store,
  Layers,
} from "@mui/icons-material";

function ModificarProducto() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // 📌 Obtener ID de la URL

  // 📌 Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    principio_activo: "",
    dosis: "",
    descripcion: "",
    precio: "",
    imagen_url: "",
    stock: "",
    laboratorio: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 📌 Cargar datos del producto al cargar el componente
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(
          `https://farmaciaproyecto.onrender.com/api/products/${id}`
        );
        const data = await response.json();
        if (response.ok) {
          setFormData(data);
        } else {
          setError(data.message || "Error al cargar el producto");
        }
      } catch (error) {
        setError("Error de conexión al cargar el producto");
      }
    };

    fetchProducto();
  }, [id]);

  // 📌 Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://farmaciaproyecto.onrender.com/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            principio_activo: formData.principio_activo,
            dosis: formData.dosis,
            descripcion: formData.descripcion,
            precio: parseFloat(formData.precio),
            imagen_url: formData.imagen_url,
            stock: parseInt(formData.stock),
            laboratorio: formData.laboratorio,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar el producto");
      }

      // 📌 Mostrar mensaje de éxito
      setSuccess(true);
      setError("");

      // 📌 Redirigir a la galería de productos
      setTimeout(() => {
        setSuccess(false); // Ocultar tras unos segundos
        navigate("/productos");
      }, 3000); // ⏰ 3 segundos de tiempo de espera
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer."
      )
    ) {
      try {
        const response = await fetch(
          `https://farmaciaproyecto.onrender.com/api/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al eliminar el producto");
        }

        alert("Producto eliminado exitosamente.");
        navigate("/productos"); // Redirige a la lista de productos
      } catch (error) {
        setError(error.message);
      }
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
          Modificar Producto
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            Producto actualizado con éxito 🎉
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* 📌 Nombre */}
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            margin="normal"
            required
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Principio Activo */}
          <TextField
            fullWidth
            label="Principio Activo"
            variant="outlined"
            margin="normal"
            required
            value={formData.principio_activo}
            onChange={(e) =>
              setFormData({ ...formData, principio_activo: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Medication color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Dosis */}
          <TextField
            fullWidth
            label="Dosis"
            variant="outlined"
            margin="normal"
            required
            value={formData.dosis}
            onChange={(e) =>
              setFormData({ ...formData, dosis: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Numbers color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Descripción */}
          <TextField
            fullWidth
            label="Descripción"
            variant="outlined"
            margin="normal"
            required
            multiline
            rows={4}
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Precio */}
          <TextField
            fullWidth
            label="Precio"
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={formData.precio}
            onChange={(e) =>
              setFormData({ ...formData, precio: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 URL de la imagen */}
          <TextField
            fullWidth
            label="URL de la imagen"
            variant="outlined"
            margin="normal"
            required
            type="url"
            value={formData.imagen_url}
            onChange={(e) =>
              setFormData({ ...formData, imagen_url: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Stock */}
          <TextField
            fullWidth
            label="Stock"
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Layers color="action" />
                </InputAdornment>
              ),
            }}
          />
          {/* 📌 Laboratorio */}
          <TextField
            fullWidth
            label="Laboratorio"
            variant="outlined"
            margin="normal"
            required
            value={formData.laboratorio}
            onChange={(e) =>
              setFormData({ ...formData, laboratorio: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Store color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 6,
              py: 1.5,
              bgcolor: "#FF0000",
              "&:hover": { bgcolor: "#B20000" },
            }}
          >
            Guardar Cambios
          </Button>
          <Button
            onClick={handleDelete}
            fullWidth
            variant="contained"
            color="error"
            sx={{
              mt: 2,
              mb: 3,
              py: 1.5,
              bgcolor: "#B20000",
              "&:hover": { bgcolor: "#800000" },
            }}
          >
            Eliminar Producto
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ModificarProducto;
