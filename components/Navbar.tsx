import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, darkMode, setDarkMode }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('landing')}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none group-hover:rotate-12 transition-transform">
            <i className="fas fa-hand-holding-heart text-white text-xl"></i>
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
            İSTANBUL <span className="text-indigo-600">ELELE</span>
          </span>
        </div>

        {/* Sağ Menü */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('feed')}
            className={`text-sm font-bold transition-colors ${
              currentView === 'feed' 
                ? 'text-indigo-600' 
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600'
            }`}
          >
            İlanlar
          </button>

          {/* DARK MODE BUTONU */}
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm"
            title={darkMode ? "Aydınlık Moda Geç" : "Karanlık Moda Geç"}
          >
            <i className={`fas ${darkMode ? 'fa-sun text-lg' : 'fa-moon text-lg'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
