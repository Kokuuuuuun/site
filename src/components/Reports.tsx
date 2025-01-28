import React from 'react';
import { BarChart, PieChart, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import type { Request } from '../App';

interface ReportsProps {
  requests: Request[];
}

const Reports: React.FC<ReportsProps> = ({ requests }) => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reportes y Estadísticas</h1>
        <p className="text-gray-600">Análisis detallado de solicitudes y mantenimientos</p>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{requests.length}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Total Solicitudes</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {requests.filter(r => r.status === 'pending').length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Pendientes</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {requests.filter(r => r.status === 'completed').length}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Completadas</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(requests.reduce((acc, r) => acc + (r.executionTime || 0), 0) / (requests.length || 1))}h
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500">Tiempo Promedio</h3>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Solicitudes por Tipo</h2>
            <BarChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Gráfico de barras aquí
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium">Distribución por Estado</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Gráfico circular aquí
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;