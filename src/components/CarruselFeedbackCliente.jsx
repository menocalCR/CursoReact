import { useState } from "react";
import { useTestimonios } from "../context/TestimoniosContext";
import { FaStar } from "react-icons/fa";

export default function CarruselFeedbackCliente({ clienteId }) {
  const { testimonios } = useTestimonios();
  const [pagina, setPagina] = useState(0);

  const propios = testimonios.filter(test => Number(test.idcliente) === Number(clienteId));
  const porPagina = 3;
  const totalPaginas = Math.ceil(propios.length / porPagina);
  const visibles = propios.slice(pagina * porPagina, (pagina + 1) * porPagina);

  return (
    <div>
      {visibles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center text-black">
          <p className="text-base max-w-md">
            Aquí podrás ver tus feedbacks hacia los vehículos y la atención que has recibido.
          </p>
          <p className="text-sm mt-2 max-w-md">
            Esto ayuda a futuros clientes en la calidad del servicio recibido.
          </p>
        </div>
      ) : (
        <div className={`grid ${visibles.length === 1 ? "grid-cols-1 justify-center" : "grid-cols-1 md:grid-cols-3"} gap-4`}>
          {visibles.map((testimonio) => (
            <div
              key={testimonio.id}
              className="bg-white p-4 rounded shadow-md text-sm transition-transform duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="font-semibold text-blue-700 text-lg">{testimonio.nombre}</h3>
              <p className="text-sm text-gray-500 mb-2">{testimonio.info}</p>
              <div className="flex text-yellow-400 mb-2">
                {Array.from({ length: testimonio.estrellas }, (_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-sm text-gray-700">{testimonio.mensaje}</p>
            </div>
          ))}
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPaginas }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPagina(i)}
              className={`px-3 py-1 rounded text-sm transition ${
                i === pagina ? "bg-blue-600 text-white" : "bg-gray-200 text-blue-700 hover:bg-blue-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
