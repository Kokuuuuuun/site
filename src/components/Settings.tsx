import React, { useState } from 'react';
import { Bell, Mail, Lock, User as UserIcon, Shield, Database, Save } from 'lucide-react';
import type { User } from '../App';

interface SettingsProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onDeleteAccount: () => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser, onDeleteAccount }) => {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [formData, setFormData] = useState({
    ...user,
    emailNotifications: true,
    pushNotifications: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Update user in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: User & { password: string }) => 
        u.id === user.id ? { ...u, ...formData } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      // Update current user
      const { emailNotifications, pushNotifications, ...userData } = formData;
      localStorage.setItem('currentUser', JSON.stringify(userData));
      onUpdateUser(userData);

      showMessage('success', 'Perfil actualizado correctamente');
    } catch (error) {
      showMessage('error', 'Error al actualizar el perfil');
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      try {
        // Remove user from users array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.filter((u: User) => u.id !== user.id);
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Remove current user
        localStorage.removeItem('currentUser');

        // Call onDeleteAccount to log out
        onDeleteAccount();
      } catch (error) {
        showMessage('error', 'Error al eliminar la cuenta');
      }
    }
  };

  const handleExportData = () => {
    try {
      const data = localStorage.getItem('requests') || '[]';
      const blob = new Blob([data], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'zoodom-requests.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      showMessage('success', 'Datos exportados correctamente');
    } catch (error) {
      showMessage('error', 'Error al exportar los datos');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-600">Administra las preferencias del sistema</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-lg font-medium">Perfil de Usuario</h2>
            </div>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento
                </label>
                <input
                  type="text"
                  name="department"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>
              <button 
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Save size={20} />
                Guardar Cambios
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className="text-lg font-medium">Notificaciones</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Correo Electrónico</h3>
                  <p className="text-sm text-gray-600">Recibir actualizaciones por correo</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    className="sr-only peer"
                    checked={formData.emailNotifications}
                    onChange={handleInputChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Notificaciones Push</h3>
                  <p className="text-sm text-gray-600">Recibir notificaciones en el navegador</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    className="sr-only peer"
                    checked={formData.pushNotifications}
                    onChange={handleInputChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Database className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-lg font-medium">Datos</h2>
            </div>
            <div className="space-y-4">
              <button
                onClick={handleExportData}
                className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Exportar Datos
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 text-red-600"
              >
                Eliminar Cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;