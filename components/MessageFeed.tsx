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

  return (
    <div className="space-y-12">
      <div className="relative max-w-2xl">
        <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input 
          type="text" 
          placeholder="İlçe veya mesaj içeriği ile arama yapın..." 
          className="w-full pl-16 pr-6 py-5 rounded-[24px] bg-white border border-slate-100 focus:border-indigo-500 outline-none transition-all shadow-2xl shadow-slate-200/50 text-lg" 
          onChange={e => setSearchTerm(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(msg => (
          <div key={msg.id} className="bg-white rounded-[40px] p-10 border border-slate-50 shadow-2xl shadow-slate-200/40 flex flex-col hover:-translate-y-2 transition-all duration-300 group relative">
            
            <div className="flex justify-between items-start mb-8">
              <div className="space-y-3">
                <span className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-2xl text-[11px] font-black uppercase tracking-widest">
                  {msg.role}
                </span>
                <div className="flex items-center text-indigo-600 font-bold">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span className="text-sm tracking-tight">{msg.district.toUpperCase()}</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-300 bg-slate-50 px-3 py-1.5 rounded-xl">
                {new Date(msg.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>

            <p className="text-slate-700 text-xl font-medium leading-relaxed flex-grow mb-10 italic">
              "{msg.message}"
            </p>

            <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-600 rounded-[20px] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">
                  {msg.fullName[0].toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 leading-tight">{msg.fullName}</h4>
                  <div className="mt-1 flex flex-col gap-0.5">
                    <a href={`tel:${msg.phone}`} className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                      <i className="fas fa-phone-alt text-[10px]
