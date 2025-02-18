import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// 📌 URL BASE DEL BACKEND --> RENDER
const API_URL = "https://farmaciaproyecto.onrender.com/api/";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 📌 REGISTRAR USUARIO
  const signUp = async (formData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      // Guarda el token y usuario si el registro fue exitoso
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      throw error;
    }
  };

  // 📌 INICIAR SESIÓN (LOGIN)
  const signIn = async ({ email, password }) => {
    // Ahora recibe un objeto
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_electronico: email, password }), // Enviar correo_electronico
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el inicio de sesión");
      }

      // Guarda el token en localStorage
      localStorage.setItem("token", data.token);

      // Guardar usuario en el estado
      setUser({
        id: data.id,
        correo_electronico: data.correo_electronico,
      });
    } catch (error) {
      console.error("❌ Error en el inicio de sesión:", error);
      throw error;
    }
  };

  // 📌 CERRAR SESIÓN (LOGOUT)
  const signOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// 📌 Hook para acceder a la autenticación
export const useAuth = () => useContext(AuthContext);
