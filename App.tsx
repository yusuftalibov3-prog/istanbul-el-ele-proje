import React, { useState, useEffect } from 'react';
import { UserRole, SolidarityMessage, ViewState } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TripleEntry from './components/TripleEntry';
import MessageForm from './components/MessageForm';
import MessageFeed from './components/MessageFeed';
import WhyUs from './components/WhyUs';

const App: React.FC = () => {
  // Mesajları LocalStorage'dan yükle
  const [messages, setMessages] = useState<SolidarityMessage[]>(() => {
    const savedMessages = localStorage.getItem('ist_elele_all_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  
  // --- DARK MODE AYARI BURADA ---
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);
  // ------------------------------

  const [activeRole, setActiveRole] = useState<UserRole | null>(null);
  const [view, setView] = useState<ViewState>('landing');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myMessageIds, setMyMessageIds] = useState<string[]>([]);

  // Sayfa ilk açıldığında benim mesajlarımın ID'lerini yükle
  useEffect(() => {
    const savedIds = localStorage.getItem('ist_elele_my_messages');
    if (savedIds) {
      setMyMessageIds(JSON.parse(savedIds));
    }
  }, []);

  // Mesajlar her değiştiğinde LocalStorage'a kaydet
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
      const updatedMessages = messages.filter(m => m.id !== id);
      setMessages(updatedMessages);
      const updatedMyIds = myMessageIds.filter(mid => mid !== id);
      setMyMessageIds(updatedMyIds);
      localStorage.setItem('ist_elele_my_messages', JSON.stringify(updatedMyIds));
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
        <Navbar 
          onNavigate={(v) => { setView(v); setActiveRole(null); }} 
          currentView={view} 
          darkMode={darkMode}
          setDarkMode={setDarkMode}
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
            <div className="max-w-2xl mx-auto px-4 py-12 text-slate-900 dark:text-white">
              <button 
                onClick={() => setActiveRole(null)}
                className="mb-6 flex items-center text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <i className="fas fa-arrow-left mr-2"></i> Geri Dön
              </button>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-100 dark:border-slate-700">
                <h2 className="text-3xl font-bold mb-2">
                  {activeRole} Formu
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8">Lütfen dayanışma mesajınızı ve iletişim bilgilerinizi giriniz.</p>
                <MessageForm 
                  role={activeRole} 
                  onSubmit={handleAddMessage} 
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          )}

          {view === 'feed' && !activeRole && (
            <div className="max-w-6xl mx-auto px-4 py-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Canlı Dayanışma Havuzu</h2>
                  <p className="text-slate-500 dark:text-slate-400">İstanbul'daki güncel yardım ve dayanışma ilanları.</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setView('landing')}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all shadow-md"
                  >
                    <i className="fas fa-plus mr-2"></i> İlan Ver
                  </button>
                </div>
              </div>

              <MessageFeed 
                messages={messages} 
                onDelete={handleDeleteMessage} 
                myMessageIds={myMessageIds}
              />
            </div>
          )}
        </main>

        <footer className="bg-slate-900 text-slate-400 py-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h3 className="text-white text-xl font-bold mb-4">İstanbul El Ele</h3>
            <p className="max-w-md mx-auto mb-8">
              Şehrin her köşesinden gelen dayanışma seslerini birleştiriyoruz. Kar amacı gütmeyen, gönüllülük esaslı bir platformdur.
            </p>
            <div className="border-t border-slate-800 pt-8 text-sm flex flex-col gap-2">
              <p>© 2024 İstanbul Dayanışma Portalı. Tüm hakları saklıdır.</p>
              <p className="text-indigo-400 font-semibold italic">Bu Web Siteyi Yusuf Tolibov Isimli 14 Yaşındaki Genç Girişimci Yapmıştır.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
