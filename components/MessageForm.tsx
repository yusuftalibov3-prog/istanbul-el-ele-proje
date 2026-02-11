import React, { useState } from 'react';
import { UserRole, SolidarityMessage } from '../types';

interface MessageFormProps {
  role: UserRole;
  onSubmit: (data: Omit<SolidarityMessage, 'id' | 'createdAt'>) => void;
  isSubmitting: boolean;
}

const ISTANBUL_DISTRICTS = ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"];

const MessageForm: React.FC<MessageFormProps> = ({ role, onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({ fullName: '', phone: '', email: '', district: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.fullName && formData.district && formData.message) {
      onSubmit({ ...formData, role });
    } else {
      alert("Lütfen tüm alanları doldurun.");
    }
  };

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-white text-slate-700 shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Ad Soyad</label>
          <input type="text" placeholder="Örn: Ahmet Yılmaz" className={inputStyle} value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Telefon</label>
          <input type="tel" placeholder="05xx xxx xx xx" className={inputStyle} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">E-posta</label>
          <input type="email" placeholder="ahmet@email.com" className={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">İlçe</label>
          <select className={inputStyle} value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})}>
            <option value="">İlçe Seçiniz</option>
            {ISTANBUL_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Mesajınız</label>
        <textarea rows={4} placeholder="Dayanışma ilanı detaylarını buraya yazınız..." className={`${inputStyle} resize-none`} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center">
        {isSubmitting ? 'Gönderiliyor...' : 'İlanı Yayınla'}
      </button>
    </form>
  );
};

export default MessageForm;
