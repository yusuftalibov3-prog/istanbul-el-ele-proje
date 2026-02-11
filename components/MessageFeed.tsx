import React, { useState } from 'react';
import { SolidarityMessage, UserRole } from '../types';

interface MessageFeedProps {
  messages: SolidarityMessage[];
  onDelete: (id: string) => void;
  myMessageIds: string[];
}

const MessageFeed: React.FC<MessageFeedProps> = ({ messages, onDelete, myMessageIds }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = messages.filter(m => 
    m.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <input type="text" placeholder="İlçe veya mesaj ara..." className="w-full p-3 border rounded-2xl" onChange={e => setSearchTerm(e.target.value)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(msg => (
          <div key={msg.id} className="bg-white p-6 rounded-3xl border shadow-sm relative">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold text-indigo-600">📍 {msg.district.toUpperCase()}</span>
              <span className="text-xs text-slate-400">{new Date(msg.createdAt).toLocaleDateString('tr-TR')}</span>
            </div>
            <p className="text-slate-800 mb-4">"{msg.message}"</p>
            <div className="border-t pt-4">
              <h4 className="text-sm font-bold">{msg.fullName}</h4>
              <p className="text-xs text-slate-500">{msg.phone}</p>
            </div>
            {myMessageIds.includes(msg.id) && (
              <button onClick={() => onDelete(msg.id)} className="absolute top-2 right-2 text-red-500 text-xs">Sil</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageFeed;
