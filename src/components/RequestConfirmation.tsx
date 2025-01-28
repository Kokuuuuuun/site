import React from 'react';
import { CheckCircle, Printer } from 'lucide-react';
import type { Request } from '../App';

interface RequestConfirmationProps {
  request: Request;
  onBack: () => void;
}

const RequestConfirmation: React.FC<RequestConfirmationProps> = ({ request, onBack }) => {
  const formatRequestNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const number = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    return `#SOL-${year}-${number}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Solicitud Registrada con Éxito
        </h2>
        <p className="text-gray-600">
          Su solicitud ha sido registrada y será procesada a la brevedad. A continuación se muestran los detalles de su solicitud:
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Número de Solicitud</h3>
          <p className="text-gray-900">{formatRequestNumber()}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Fecha de Registro</h3>
          <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Tipo de Solicitud</h3>
          <p className="text-gray-900">{request.type}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Prioridad</h3>
          <p className="text-gray-900">{request.priority}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Departamento</h3>
          <p className="text-gray-900">{request.department}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Estado</h3>
          <p className="text-gray-900">Pendiente</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Título de la Solicitud</h3>
        <p className="text-gray-900">{request.title}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Descripción</h3>
        <p className="text-gray-600">{request.description}</p>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          <Printer size={20} />
          Imprimir Detalles
        </button>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default RequestConfirmation;