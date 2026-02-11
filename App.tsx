import React, { useState, useEffect } from 'react';
import { UserRole, SolidarityMessage, ViewState } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripleEntry from './components/TripleEntry';
import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import WhyUs from './components/WhyUs';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  // Mesajları LocalStorage'dan yükle veya boş liste başlat
  const [messages, setMessages] = useState<SolidarityMessage[]>(() => {
    const savedMessages = localStorage.getItem('ist_elele_all_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);
  const [view, setView] = useState<ViewState>('landing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [myMessageIds, setMyMessageIds] = useState<string[]>([]);

  // Sayfa ilk açıldığında benim mesajlarımın ID'lerini yükle
  useEffect(() => {
    const savedIds = localStorage.getItem('ist_elele_my_messages');
    if (savedIds) {
      setMyMessageIds(JSON.parse(savedIds));
    }
  }, []);

  // Mesajlar her değiştiğinde LocalStorage'a kaydet (Kalıcılık burada sağlanıyor)
  useEffect(() => {
    localStorage.setItem('ist_elele_all_messages', JSON.stringify(messages));
  }, [messages]);

  const handleAddMessage = (newMessage: Omit<SolidarityMessage, 'id' | 'createdAt'>) => {
    setIsSubmitting(true);
    const id = Math.random().toString(36).substr(2, 9);
    const message: SolidarityMessage = {
      ...newMessage,
      id,
      createdAt: Date.now()
    };
    
    setTimeout(() => {
      setMessages(prev => [message, ...prev]);
      
      const updatedMyIds = [...myMessageIds, id];
      setMyMessageIds(updatedMyIds);
      localStorage.setItem('ist_elele_my_messages', JSON.stringify(updatedMyIds));

      setActiveRole(null);
      setView('feed');
      setIsSubmitting(false);
    }, 800);
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
      setMessages(prev => prev.filter(m => m.id !== id));
      const updatedMyIds = myMessageIds.filter(mid => mid !== id);
      setMyMessageIds(updatedMyIds);
      localStorage.setItem('ist_elele_my_messages', JSON.stringify(updatedMyIds));
    }
  };

  const getAiSummary = async () => {
    if (messages.length === 0) return;
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `Aşağıdaki dayanışma mesajlarını kısaca özetle ve bugünün dayanışma ruhunu bir cümleyle anlat. Mesajlar: ${messages.map(m => m.message).join(' | ')}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setAiSummary(response.text || '');
    } catch (error) {
      console.error('AI Summary failed', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={(v) => { setView(v); setActiveRole(null); }} currentView={view} />
      
      <main className="flex-grow">
        {view === 'landing' && !activeRole && (
          <>
            <Hero />
            <TripleEntry onSelectRole={(role) => setActiveRole(role)} />
            <WhyUs />
          </>
        )}

        {activeRole && (
          <div className="max-w-2xl mx-auto px-4 py-12">
            <button 
              onClick={() => setActiveRole(null)}
              className="mb-6 flex items-center text-slate-500 hover:text-indigo-600 transition-colors"
            >
              <i className="fas fa-arrow-left mr-2"></i> Geri Dön
            </button>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {activeRole} Formu
              </h2>
              <p className="text-slate-500 mb-8">
