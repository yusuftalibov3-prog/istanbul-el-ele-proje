import React, { useState, useEffect } from 'react';
import { UserRole, SolidarityMessage, ViewState } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripleEntry from './components/TripleEntry';
import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import WhyUs from './components/WhyUs';

const App: React.FC = () => {
  const [messages, setMessages] = useState<SolidarityMessage[]>(() => {
    const savedMessages = localStorage.getItem('ist_elele_all_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [activeRole, setActiveRole] = useState<UserRole | null>(null);
  const [view, setView] = useState<ViewState>('landing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myMessageIds, setMyMessageIds] = useState<string[]>([]);

  useEffect(() => {
    const savedIds = localStorage.getItem('ist_elele_my_messages');
    if (savedIds) setMyMessageIds(JSON.parse(savedIds));
  }, []);

  useEffect(() => {
    localStorage.setItem('ist_elele_all_messages', JSON.stringify(messages));
  }, [messages]);

  const handleAddMessage = (newMessage: Omit<SolidarityMessage, 'id' | 'createdAt'>) => {
    setIsSubmitting(true);
    const id = Math.random().toString(36).substr(2, 9);
    const message: SolidarityMessage = { ...newMessage, id, createdAt: Date.now() };
    
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
      setMessages(messages.filter(m => m.id !== id));
      const updatedMyIds = myMessageIds.filter(mid => mid !== id);
      setMyMessageIds(updatedMyIds);
      localStorage.setItem('ist_elele_my_messages', JSON.stringify(updatedMyIds));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onNavigate={(v) => { setView(v); setActiveRole(null); }} 
        currentView={view} 
      />
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
            <button onClick={() => setActiveRole(null)} className="mb-6 flex items-center text-slate-500">
              <i className="fas fa-arrow-left mr-2"></i> Geri Dön
            </button>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <h2 className="text-3xl font-bold mb-2">{activeRole} Formu</h2>
              <MessageForm role={activeRole} onSubmit={handleAddMessage} isSubmitting={isSubmitting} />
            </div>
          </div>
        )}
        {view === 'feed' && (
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8">Canlı Dayanışma Havuzu</h2>
            <MessageFeed messages={messages} onDelete={handleDeleteMessage} myMessageIds={myMessageIds} />
          </div>
        )}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <p>© 2024 İstanbul El Ele. Yusuf Tolibov Projesidir.</p>
      </footer>
    </div>
  );
};

export default App;
