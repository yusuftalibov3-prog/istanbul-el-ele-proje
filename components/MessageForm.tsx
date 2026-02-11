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
