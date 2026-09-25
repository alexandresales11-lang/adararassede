/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TransmissaoHub } from './components/TransmissaoHub';
import { AgendaEventos } from './components/AgendaEventos';
import { MinisteriosSection } from './components/MinisteriosSection';
import { PedidosOracao } from './components/PedidosOracao';
import { DizimosOfertas } from './components/DizimosOfertas';
import { LocalizacaoSection } from './components/LocalizacaoSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scrollspy observer for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['transmissao', 'agenda', 'ministerios', 'oracao', 'dizimos', 'localizacao'];
      const scrollY = window.pageYOffset;

      if (scrollY < 300) {
        setActiveSection('inicio');
        return;
      }

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0c10] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Bar Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isLiveNow={true}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection onNavigate={scrollToSection} />
        <TransmissaoHub />
        <AgendaEventos />
        <MinisteriosSection />
        <PedidosOracao />
        <DizimosOfertas />
        <LocalizacaoSection />
      </main>

      {/* Institutional Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
