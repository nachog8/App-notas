import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import axiosInstance from "../utils/axiosInstance";
import { validateEmail } from "../utils/helper";

const SingUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSingUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Por favor, introduce tu nombre");
      return;
    }

    if (!validateEmail(email)) {
      setError("Por favor, introduce un email válido");
      return;
    }

    if (!password) {
      setError("Por favor, introduce una contraseña");
      return;
    }

    setError("");

    //singUp Api Call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      //Handle successful registration response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
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
          <form onSubmit={handleSingUp}>
            <h4 className="text-2xl mb-7">Registrate</h4>

            <input
              type="text"
              placeholder="Nombre"
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

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
              Crear Cuenta
            </button>

            <p className="text-sm text-center mt-4">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="font-medium text-primary underline">
                Inicia Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingUp;
