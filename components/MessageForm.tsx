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
      alert("Lütfen tüm alanları doldurun ve ilçenizi seçin.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Ad Soyad" className="w-full p-3 border rounded-xl" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
      <input type="tel" placeholder="Telefon (05xx...)" className="w-full p-3 border rounded-xl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
      <input type="email" placeholder="E-posta" className="w-full p-3 border rounded-xl" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
      <select className="w-full p-3 border rounded-xl bg-white" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})}>
        <option value="">İlçe Seçiniz</option>
        {ISTANBUL_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
      </select>
      <textarea placeholder="Mesajınız" className="w-full p-3 border rounded-xl" rows={4} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
      <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">
        {isSubmitting ? 'Gönderiliyor...' : 'İlanı Yayınla'}
      </button>
    </form>
  );
};

export default MessageForm;
