import React, { useState } from 'react';
import { UserRole, SolidarityMessage } from '../types';

interface MessageFormProps {
  role: UserRole;
  onSubmit: (message: Omit<SolidarityMessage, 'id' | 'createdAt'>) => void;
  isSubmitting: boolean;
}

const MessageForm: React.FC<MessageFormProps> = ({ role, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    district: 'Kadıköy',
    contact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type: role === 'İhtiyaç Sahibi' ? 'help' : 'support'
    });
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-slate-300">Başlık</label>
        <input 
          required 
          className={inputClass} 
          placeholder="Örn: Erzak yardımı, Ders desteği..."
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-slate-300">Açıklama</label>
        <textarea 
          required 
          className={inputClass} 
          rows={4}
          placeholder="Detayları buraya yazınız..."
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-slate-300">İletişim Bilgisi</label>
        <input 
          required 
          className={inputClass} 
          placeholder="Telefon veya E-posta"
          value={formData.contact}
          onChange={e => setFormData({...formData, contact: e.target.value})}
        />
      </div>
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Gönderiliyor...' : 'Yayınla'}
      </button>
    </form>
  );
};

export default MessageForm;
