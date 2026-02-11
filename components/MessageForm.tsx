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

  const inputStyle = "w-full px-4 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all bg-slate-50/50 text-slate-700 font-medium";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Ad Soyad</label>
          <input type="text" placeholder="Ahmet Yılmaz" className={inputStyle} value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Telefon</label>
          <input type="tel" placeholder="05xx xxx xx xx" className={inputStyle} value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">E-posta</label>
          <input type="email" placeholder="örnek@mail.com" className={inputStyle} value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">İlçe</label>
          <select className={inputStyle} value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})}>
            <option value="">İlçe Seçiniz</option>
            {ISTANBUL_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Mesajınız</label>
        <textarea rows={5} placeholder="Dayanışma ilanı detaylarını buraya yazınız..." className={`${inputStyle} resize-none`} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-[0.98]">
        {isSubmitting ? 'Gönderiliyor...' : 'İlanı Yayınla'}
      </button>
    </form>
  );
};

export default MessageForm;
