import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SingUp from "./pages/SingUp/SingUp";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir la raíz "/" al login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Ruta protegida que solo se muestra si el usuario está autenticado */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Home />} />}
        />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/singUp" element={<SingUp />} />
      </Routes>
    </Router>
  );
};

export default App;
