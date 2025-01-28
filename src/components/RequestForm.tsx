import React, { useState } from 'react';
import type { Request } from '../App';

interface RequestFormProps {
  onSubmit: (request: Request) => void;
  onCancel: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    department: '',
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending' as const,
    photos: [] as string[],
    technicianNotes: ''
  });

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle file uploads here (in a real app, you'd upload to a server)
    const photoUrls = selectedFiles ? 
      Array.from(selectedFiles).map(file => URL.createObjectURL(file)) : 
      [];

    onSubmit({
      ...formData,
      photos: photoUrls
    } as Request);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      <h2 className="text-xl font-semibold mb-6">Nueva Solicitud de Mantenimiento</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Solicitud
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              required
            >
              <option value="">Seleccionar tipo</option>
              <option value="maintenance">Mantenimiento Preventivo</option>
              <option value="repair">Reparación</option>
              <option value="installation">Instalación</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departamento
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              placeholder="Ingrese departamento"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título de la Solicitud
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Describa brevemente el problema o requerimiento"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción Detallada
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32"
            placeholder="Proporcione todos los detalles relevantes del problema o requerimiento"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Evidencias Fotográficas
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <div className="p-2 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-green-600 hover:text-green-700">
                Subir Fotos
              </span>
              <p className="text-sm text-gray-500">
                {selectedFiles ? `${selectedFiles.length} archivo(s) seleccionado(s)` : 'Formatos: JPG, PNG'}
              </p>
            </label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors order-2 md:order-1"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors order-1 md:order-2"
          >
            Enviar Solicitud
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;