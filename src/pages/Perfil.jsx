import { useAuth } from "../context/AuthContext";
import { Container, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Perfil() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 8, p: 4, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}
      >
        <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
          Perfil de Usuario
        </Typography>
        {user ? (
          <>
            <Typography variant="h6">
              Correo: {user.correo_electronico}
            </Typography>
            <Typography variant="h6">Nombre: {user.nombre}</Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 2 }}
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <Typography variant="h6">No has iniciado sesión</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Perfil;
