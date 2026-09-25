import React, { useState } from 'react';
import { ChurchLogo } from './ChurchLogo';
import { Radio, Menu, X, Calendar, MapPin, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isLiveNow?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  isLiveNow = true
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'transmissao', label: 'Transmissão' },
    { id: 'agenda', label: 'Agenda & Eventos' },
    { id: 'ministerios', label: 'Ministérios' },
    { id: 'oracao', label: 'Pedidos de Oração' },
    { id: 'dizimos', label: 'Dízimos & Ofertas' },
    { id: 'localizacao', label: 'Localização' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0c10]/90 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark Element */}
        <button
          onClick={() => handleNavClick('inicio')}
          className="flex items-center gap-3.5 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
        >
          <ChurchLogo size={46} />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              AD Araras Sede
            </span>
            <span className="text-xs text-amber-500/90 font-medium tracking-wider">
              Ministério Araras
            </span>
          </div>
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors whitespace-nowrap cursor-pointer relative py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 rounded ${
                  isActive
                    ? 'text-amber-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('transmissao')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-lg shadow-lg shadow-amber-900/30 transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <Radio className="w-3.5 h-3.5" />
            <span>Assistir Ao Vivo</span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#0d0f14] px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                activeSection === item.id
                  ? 'bg-amber-500/10 text-amber-400 font-semibold'
                  : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
              }`}
            >
              <span>{item.label}</span>
              {item.id === 'transmissao' && (
                <span className="text-xs text-amber-400 font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  AO VIVO
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-white/[0.06] flex items-center justify-around text-xs text-slate-400">
            <button
              onClick={() => handleNavClick('localizacao')}
              className="flex items-center gap-1.5 hover:text-amber-400 py-1"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Santos Dumont, 492</span>
            </button>
            <button
              onClick={() => handleNavClick('dizimos')}
              className="flex items-center gap-1.5 hover:text-amber-400 py-1"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-amber-500" />
              <span>Dízimo & Pix</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
