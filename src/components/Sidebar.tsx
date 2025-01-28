import React from 'react';
import { Calendar, FileText, HelpCircle, Home, Settings } from 'lucide-react';

interface SidebarProps {
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-8">
        <span className="text-green-600 font-bold text-2xl">ZOODOM</span>
      </div>
      
      <nav className="space-y-2">
        <a
          href="#"
          onClick={() => onNavigate('list')}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Home size={20} />
          <span>Dashboard</span>
        </a>
        <a
          href="#"
          onClick={() => onNavigate('list')}
          className="flex items-center gap-3 px-4 py-3 text-green-600 bg-green-50 rounded-lg font-medium"
        >
          <FileText size={20} />
          <span>Registro Solicitudes</span>
        </a>
        <a
          href="#"
          onClick={() => onNavigate('calendar')}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Calendar size={20} />
          <span>Calendario</span>
        </a>
        <a
          href="#"
          onClick={() => onNavigate('reports')}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <FileText size={20} />
          <span>Reportes</span>
        </a>
        <a
          href="#"
          onClick={() => onNavigate('help')}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <HelpCircle size={20} />
          <span>Ayuda</span>
        </a>
        <a
          href="#"
          onClick={() => onNavigate('settings')}
          className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Settings size={20} />
          <span>Configuración</span>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;