import React, { useState, useEffect } from 'react';
import { Bell, FileText, HelpCircle, Home, Settings as SettingsIcon } from 'lucide-react';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';
import RequestConfirmation from './components/RequestConfirmation';
import CalendarView from './components/Calendar';
import Reports from './components/Reports';
import Help from './components/Help';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';

export type Request = {
  id: string;
  type: string;
  department: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'in-progress' | 'completed';
  startDate?: string;
  endDate?: string;
  executionTime?: number;
  photos?: string[];
  technicianNotes?: string;
};

type View = 'list' | 'form' | 'confirmation' | 'calendar' | 'reports' | 'help' | 'settings' | 'login' | 'register';

export type User = {
  id: string;
  name: string;
  email: string;
  department: string;
};

function App() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentView, setCurrentView] = useState<View>('login');
  const [currentRequest, setCurrentRequest] = useState<Request | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setCurrentView('list');
    }

    // Load requests from localStorage
    const storedRequests = localStorage.getItem('requests');
    if (storedRequests) {
      setRequests(JSON.parse(storedRequests));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('requests', JSON.stringify(requests));
  }, [requests]);

  const handleNewRequest = (request: Omit<Request, 'id'>) => {
    const newRequest = {
      ...request,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      status: 'pending' as const
    };
    setRequests([newRequest, ...requests]);
    setCurrentRequest(newRequest);
    setCurrentView('confirmation');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setCurrentView('login');
  };

  if (!user && currentView !== 'register') {
    return <Login onLogin={setUser} onRegister={() => setCurrentView('register')} />;
  }

  if (currentView === 'register') {
    return <Register onRegister={setUser} onBack={() => setCurrentView('login')} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'form':
        return (
          <RequestForm
            onSubmit={handleNewRequest}
            onCancel={() => setCurrentView('list')}
          />
        );
      case 'confirmation':
        return (
          <RequestConfirmation
            request={currentRequest!}
            onBack={() => setCurrentView('list')}
          />
        );
      case 'calendar':
        return <CalendarView requests={requests} />;
      case 'reports':
        return <Reports requests={requests} />;
      case 'help':
        return <Help />;
      case 'settings':
        return <Settings user={user!} onUpdateUser={setUser} onDeleteAccount={handleLogout} />;
      default:
        return (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Registro de Solicitudes</h1>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => setCurrentView('form')}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Nueva Solicitud
                </button>
                <div className="flex items-center gap-4">
                  <button className="relative">
                    <Bell size={24} className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Cerrar Sesión
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                      {user?.name.charAt(0)}
                    </span>
                    <span className="text-gray-700 font-medium hidden md:inline">{user?.name}</span>
                  </div>
                </div>
              </div>
            </div>
            <RequestList requests={requests} />
          </>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} 
           onClick={() => setIsMobileMenuOpen(false)} />
      
      <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30`}>
        <Sidebar onNavigate={(view: View) => {
          setCurrentView(view);
          setIsMobileMenuOpen(false);
        }} />
      </div>

      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <button
            className="md:hidden mb-4 p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;