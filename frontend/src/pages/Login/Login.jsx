import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../utils/helper";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Verifica si el usuario ya está logueado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirige al dashboard si ya hay un token
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Por favor, introduce un email válido");
      return;
    }

    if (!password) {
      setError("Por favor, introduce una contraseña");
      return;
    }
    setError("");

    //Login Api Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken); // Guarda el token en localStorage
        navigate("/dashboard"); // Redirige al dashboard después de iniciar sesión
      }
    } catch (error) {
      //Handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Algo salió mal. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Iniciar Sesion</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              placeholder={"Contraseña"}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              ¿No tienes una cuenta?{" "}
              <Link to="/singUp" className="font-medium text-primary underline">
                Regístrate aquí
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
