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
    m.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.STUDENT: return 'bg-indigo-100 text-indigo-700';
      case UserRole.SHOPKEEPER: return 'bg-emerald-100 text-emerald-700';
      case UserRole.PARENT: return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-10">
      {/* Arama Çubuğu */}
      <div className="relative max-w-xl mx-auto md:mx-0">
        <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input 
          type="text" 
          placeholder="İlçe veya mesaj ara..." 
          className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 outline-none transition-all shadow-xl shadow-slate-100" 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      {/* Mesaj Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(msg => (
          <div key={msg.id} className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-2xl shadow-slate-200/60 flex flex-col hover:border-indigo-200 transition-all group relative min-h-[300px]">
            
            {/* Üst Kısım: Rol ve İlçe */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-2">
                <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest w-fit ${getRoleBadgeColor(msg.role)}`}>
                  {msg.role}
                </span>
                <span className="text-sm font-bold text-indigo-600 flex items-center tracking-tight">
                  <i className="fas fa-map-marker-alt mr-2 text-indigo-400"></i> 
                  {msg.district?.toUpperCase() || "İSTANBUL"}
                </span>
              </div>
              <div className="flex
