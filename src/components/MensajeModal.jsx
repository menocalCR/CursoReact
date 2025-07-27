// MensajeModal.jsx
import React from 'react';

export default function MensajeModal({ visible, onClose, titulo, mensaje }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold text-blue-700 mb-2">{titulo}</h2>
        <p className="text-gray-700 text-sm">{mensaje}</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
