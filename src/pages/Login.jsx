import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUsuarios } from "../context/UsuarioContext";
import Layout from "../components/Layout";

export default function Login() {
  const { setUsuarioActual } = useAuth();
  const { usuarios } = useUsuarios();
  const [datos, setDatos] = useState({ usuario: "", contrasena: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarioValido = usuarios.find(
      (u) =>
        u.usuario === datos.usuario &&
        u.contrasena === datos.contrasena
    );
      

    if (usuarioValido) {
      setUsuarioActual(usuarioValido);
      console.log(usuarioValido)
      if (usuarioValido.rol === "administrativo") {
        navigate("/panel-admin");
      } else {
        navigate("/panel-cliente");
      }
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
     <Layout>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-20 rounded shadow-lg max-w-sm w-full text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-10">LOGIN</h2>

          <input
            name="usuario"
            placeholder="Usuario"
            onChange={handleChange}
            className="input mb-5"
          />
          <input
            name="contrasena"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            className="input mb-5"
          />

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition">
            Acceder
          </button>
        </form>
      </div>
  </Layout>
  );
}
