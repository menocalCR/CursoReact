export default function DetalleConsultaModal({ contacto, onClose }) {
  if (!contacto) return null;
  const estado = contacto.estado || "En espera de atención";

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold text-blue-600 mb-2">Detalle de la consulta</h2>
         <p className="text-sm mt-2 text-gray-500">
          <strong>Fecha de creación:</strong>{" "}
            {(() => {
              const fecha = new Date(contacto.fechaIngreso);
              const dia = String(fecha.getDate()).padStart(2, "0");
              const mes = String(fecha.getMonth() + 1).padStart(2, "0");
              const año = fecha.getFullYear();
              return `${dia}-${mes}-${año}`;
            })()}
        </p>
        <p><strong>Cliente:</strong> {contacto.nombre} {contacto.apellidos}</p>
        <p><strong>Correo:</strong> {contacto.email}</p>
        <p><strong>Teléfono:</strong> {contacto.telefono}</p>
        <p><strong>Placa:</strong> {contacto.placa || "N/A"}</p>
        <p><strong>Estado:</strong> {estado}</p>
        {contacto.atendidoPor && (
          <>
            <p><strong>Atendido por:</strong> {contacto.atendidoPor}</p>
            {contacto.fechaAtencion && (
              <p className="text-sm mt-1 text-gray-500">
                <strong>Fecha de atención:</strong>{" "}
                {(() => {
                  const fecha = new Date(contacto.fechaAtendido);
                  const dia = String(fecha.getDate()).padStart(2, "0");
                  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
                  const año = fecha.getFullYear();
                  return `${dia}-${mes}-${año}`;
                })()}
              </p>
            )}
            <p><strong>Resolución:</strong> {contacto.resolucion}</p>
          </>
        )}
        <p className="mt-2"><strong>Consulta:</strong> {contacto.consulta || "Sin mensaje registrado."}</p>
      </div>
    </div>
  );
}
