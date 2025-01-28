import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import type { Request } from '../App';

interface CalendarProps {
  requests: Request[];
}

const Calendar: React.FC<CalendarProps> = ({ requests }) => {
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const today = new Date().getDate();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendario de Mantenimiento</h1>
        <p className="text-gray-600">Visualización de trabajos programados y en ejecución</p>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-6">
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`
              border rounded-lg p-2 min-h-[100px]
              ${day === today ? 'bg-green-50 border-green-200' : 'border-gray-200'}
            `}
          >
            <div className="font-medium text-gray-700 mb-2">{day}</div>
            {requests
              .filter((request) => new Date(request.date).getDate() === day)
              .map((request) => (
                <div
                  key={request.id}
                  className="text-xs p-1 mb-1 rounded bg-white border border-gray-200 cursor-pointer hover:bg-gray-50"
                >
                  <div className="font-medium text-gray-900 truncate">
                    {request.title}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock size={12} />
                    <span>09:00 AM</span>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-lg font-medium mb-4">Próximos Mantenimientos</h2>
        <div className="space-y-4">
          {requests.slice(0, 3).map((request) => (
            <div key={request.id} className="flex items-start gap-4 p-3 border border-gray-200 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{request.title}</h3>
                <p className="text-sm text-gray-500">{request.department}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Clock size={14} />
                  <span>{request.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;