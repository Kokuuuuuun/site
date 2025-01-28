import React, { useState } from 'react';
import { Book, FileQuestion, MessageCircle, Phone, Search, ExternalLink, ChevronRight, Mail } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  const guides = [
    {
      id: 'new-request',
      title: 'Crear una nueva solicitud',
      description: 'Aprende a registrar y dar seguimiento a tus solicitudes',
      content: `
        1. Desde el dashboard, haz clic en el botón "Nueva Solicitud"
        2. Completa el formulario con la siguiente información:
           - Tipo de solicitud (Mantenimiento/Reparación/Instalación)
           - Departamento solicitante
           - Título descriptivo
           - Descripción detallada
           - Fotos o evidencias (opcional)
        3. Haz clic en "Enviar Solicitud"
        4. Recibirás una confirmación con el número de solicitud
      `
    },
    {
      id: 'calendar',
      title: 'Gestionar el calendario',
      description: 'Organiza y visualiza los mantenimientos programados',
      content: `
        1. Accede a la sección "Calendario" desde el menú lateral
        2. Visualiza las solicitudes programadas por día/semana/mes
        3. Haz clic en una solicitud para ver más detalles
        4. Utiliza los filtros para encontrar solicitudes específicas
        5. Exporta el calendario si necesitas compartirlo
      `
    },
    {
      id: 'reports',
      title: 'Generar reportes',
      description: 'Analiza y exporta datos de mantenimiento',
      content: `
        1. Ve a la sección "Reportes" en el menú lateral
        2. Selecciona el tipo de reporte que necesitas
        3. Aplica filtros por fecha, tipo o departamento
        4. Visualiza las estadísticas y gráficos
        5. Exporta los datos en formato JSON
        6. Comparte los reportes con tu equipo
      `
    }
  ];

  const faqs = [
    {
      question: '¿Cómo actualizo el estado de una solicitud?',
      answer: 'Para actualizar el estado de una solicitud, accede a los detalles de la misma y utiliza el menú desplegable de estado. Los cambios se guardarán automáticamente y se notificará al solicitante.'
    },
    {
      question: '¿Cómo adjunto archivos a una solicitud?',
      answer: 'Al crear o editar una solicitud, encontrarás una sección para adjuntar archivos. Puedes arrastrar y soltar los archivos o hacer clic para seleccionarlos. Se aceptan imágenes en formato JPG y PNG.'
    },
    {
      question: '¿Puedo modificar una solicitud después de enviarla?',
      answer: 'Sí, puedes modificar una solicitud después de enviarla. Sin embargo, algunos campos pueden estar bloqueados dependiendo del estado actual de la solicitud y tu rol en el sistema.'
    },
    {
      question: '¿Cómo recibo notificaciones de mis solicitudes?',
      answer: 'Recibirás notificaciones por correo electrónico y/o en el navegador según tus preferencias de configuración. Puedes ajustar estas preferencias en la sección de Configuración.'
    }
  ];

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Centro de Ayuda</h1>
        <p className="text-gray-600">Encuentra respuestas a tus preguntas y aprende a usar el sistema</p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar en la ayuda..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Book className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-lg font-medium">Guías y Tutoriales</h2>
            </div>
            
            {selectedGuide ? (
              <div>
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="flex items-center text-green-600 mb-4 hover:text-green-700"
                >
                  <ChevronRight className="rotate-180" size={20} />
                  <span>Volver a guías</span>
                </button>
                {guides.find(g => g.id === selectedGuide) && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      {guides.find(g => g.id === selectedGuide)?.title}
                    </h3>
                    <div className="prose prose-green">
                      <pre className="whitespace-pre-wrap text-sm text-gray-600">
                        {guides.find(g => g.id === selectedGuide)?.content}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <ul className="space-y-4">
                {filteredGuides.map((guide) => (
                  <li key={guide.id}>
                    <button
                      onClick={() => setSelectedGuide(guide.id)}
                      className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <h3 className="font-medium text-gray-900 mb-1">{guide.title}</h3>
                      <p className="text-sm text-gray-600">{guide.description}</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FileQuestion className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-medium">Preguntas Frecuentes</h2>
            </div>
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <details key={index} className="group">
                  <summary className="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <span className="text-green-600 group-open:rotate-180">▼</span>
                  </summary>
                  <p className="p-4 text-gray-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-lg font-medium">Soporte Técnico</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Chat en Vivo</h3>
                <p className="text-gray-600 mb-4">
                  Horario de atención: Lunes a Viernes, 8:00 AM - 6:00 PM
                </p>
                <button
                  onClick={() => window.open('https://tawk.to', '_blank')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <MessageCircle size={20} />
                  <span>Iniciar Chat</span>
                  <ExternalLink size={16} />
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Contacto Telefónico</h3>
                <p className="text-gray-600 mb-4">Línea directa de soporte técnico</p>
                <div className="flex items-center gap-2 text-gray-900">
                  <Phone size={20} />
                  <a href="tel:+18095551234" className="font-medium hover:text-green-600">
                    +1 (809) 555-1234
                  </a>
                </div>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Correo Electrónico</h3>
                <p className="text-gray-600 mb-4">Envíanos tus consultas</p>
                <div className="flex items-center gap-2 text-gray-900">
                  <Mail size={20} />
                  <a href="mailto:soporte@zoodom.com" className="font-medium hover:text-green-600">
                    soporte@zoodom.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;