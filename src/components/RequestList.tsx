import React, { useState } from 'react';
import { Clock, Search } from 'lucide-react';
import type { Request } from '../App';

interface RequestListProps {
  requests: Request[];
}

const RequestList: React.FC<RequestListProps> = ({ requests }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar solicitudes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendiente</option>
              <option value="in-progress">En progreso</option>
              <option value="completed">Completado</option>
            </select>
            <select
              className="border border-gray-300 rounded-lg px-4 py-2"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Todos los tipos</option>
              <option value="maintenance">Mantenimiento</option>
              <option value="repair">Reparación</option>
              <option value="installation">Instalación</option>
            </select>
          </div>
        </div>

        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No hay solicitudes</h3>
            <p className="text-gray-500">No se encontraron solicitudes que coincidan con los filtros aplicados.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{request.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status === 'pending' ? 'Pendiente' : 
                         request.status === 'in-progress' ? 'En progreso' : 'Completado'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span>{request.department}</span>
                      <span>•</span>
                      <span>{request.type === 'maintenance' ? 'Mantenimiento' :
                            request.type === 'repair' ? 'Reparación' : 'Instalación'}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        <span>{new Date(request.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  {request.photos && request.photos.length > 0 && (
                    <div className="flex gap-2">
                      {request.photos.slice(0, 3).map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Evidencia ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ))}
                      {request.photos.length > 3 && (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                          +{request.photos.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestList;