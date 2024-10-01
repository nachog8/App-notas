import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Verifica si el token está en localStorage

  return isAuthenticated ? element : <Navigate to="/login" />; // Si está autenticado, muestra el componente; si no, redirige a login
};

export default ProtectedRoute;
