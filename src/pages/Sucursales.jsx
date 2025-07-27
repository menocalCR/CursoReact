import { useState } from "react";
import Layout from "../components/Layout";
import SucursalInfo from "../components/SucursalInfo";

const opciones = [
  { nombre: "Lomas de Ayarco", id: "ayarco" },
  { nombre: "Pérez Zeledón", id: "perez" },
  { nombre: "San Carlos", id: "sancarlos" },
  { nombre: "Liberia", id: "liberia" },
  { nombre: "Naranjo", id: "naranjo" },
  { nombre: "San Ramon de Alajuela", id: "sanRamon" },
  { nombre: "Río Segundo", id: "rio" },
];

export default function Sucursales() {
  const [seleccion, setSeleccion] = useState("ayarco");

  return (
    <Layout>

      {/* <div className="bg-gradient-to-b from-blue-950 to-blue-800 text-white py-10 px-[40px]">*/}
        <div className="bg-black bg-opacity-70 text-white py-10 px-[40px]">
        <h2 className="text-lg uppercase tracking-wider mb-2">Contáctenos</h2>
        <h1 className="text-4xl font-bold mb-2 ">Nuestras Sucursales</h1>
        <p className="max-w-3xl  text-sm md:text-base text-blue-100 mb-2">
          Podés visitar nuestras instalaciones donde encontrarás la más amplia variedad de modelos y rangos de precios. En Autos CR estamos para ayudarte en lo que necesités.
        </p>
        <p className="text-lg mt-4 font-medium">¿Cuál sucursal querés encontrar?</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Tabs para seleccionar sucursal */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {opciones.map((op) => (
            <button
              key={op.id}
              onClick={() => setSeleccion(op.id)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                seleccion === op.id
                  ? "bg-blue-700 text-white shadow-md"
                  : "bg-gray-200 text-blue-800 hover:bg-gray-300"
              }`}
            >
              {op.nombre}
            </button>
          ))}
        </div>

        {/* Contenido de sucursal */}
        <SucursalInfo id={seleccion} />
      </div>
    </Layout>
  );
}
