import React, { useState } from 'react';
import { SolidarityMessage, UserRole } from '../types';

interface MessageFeedProps {
  messages: SolidarityMessage[];
  onDelete: (id: string) => void;
  myMessageIds: string[];
}

const MessageFeed: React.FC<MessageFeedProps> = ({ messages, onDelete, myMessageIds }) => {
  const [filter, setFilter] = useState<UserRole | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMessages = messages.filter(m => {
    const matchesFilter = filter === 'all' || m.role === filter;
    const matchesSearch = 
      m.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.district && m.district.toLowerCase().includes(searchTerm.toLowerCase())); // İlçe araması eklendi
    return matchesFilter && matchesSearch;
  });

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.STUDENT: return 'bg-indigo-100 text-indigo-700';
      case UserRole.SHOPKEEPER: return 'bg-emerald-100 text-emerald-700';
      case UserRole.PARENT: return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow relative">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            type="text"
            placeholder="İlanlar içinde ara (isim, mesaj veya ilçe)..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:border-indigo-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
