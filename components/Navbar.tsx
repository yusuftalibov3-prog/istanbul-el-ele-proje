import React from 'react';
import { ViewState } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 h-20">
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-hand-holding-heart text-white text-xl"></i>
          </div>
          <span className="text-xl font-black text-slate-900">İSTANBUL ELELE</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('feed')}
            className={`text-sm font-bold ${currentView === 'feed' ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            İlanlar
          </button>
          <button 
            onClick={() => onNavigate('landing')}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm"
          >
            Ana Sayfa
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
