import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, Clock, MapPin, Download, Share2, 
  ChevronRight, Check, Sparkles, Filter, Ticket, X, User, Phone, 
  ExternalLink, ArrowUpRight 
} from 'lucide-react';
import { UPCOMING_EVENTS, WEEKLY_SCHEDULE, CHURCH_INFO, CHURCH_IMAGES } from '../data/churchData';
import { ChurchEvent } from '../types/church';

export const AgendaEventos: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [viewMode, setViewMode] = useState<'cards' | 'calendario' | 'grade'>('cards');
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  
  // RSVP registration modal state
  const [rsvpEvent, setRsvpEvent] = useState<ChurchEvent | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [rsvpPassCode, setRsvpPassCode] = useState('');

  // Filter events
  const filteredEvents = UPCOMING_EVENTS.filter((evt) => {
    if (activeCategory === 'todos') return true;
    return evt.category === activeCategory;
  });

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = (event: ChurchEvent) => {
    const title = encodeURIComponent(`${event.title} - AD Araras Sede`);
    const details = encodeURIComponent(`${event.description}\n\nLocal: ${event.location}\nTema: ${event.theme || ''}`);
    const location = encodeURIComponent(`${CHURCH_INFO.address}, ${CHURCH_INFO.city} - ${CHURCH_INFO.state}`);
    
    // Construct simplified date format YYYYMMDDTHHmmssZ
    const cleanDate = event.date.replace(/-/g, '');
    const cleanTime = event.time.replace(':', '') + '00';
    const dates = `${cleanDate}T${cleanTime}/${cleanDate}T${Number(cleanTime) + 20000}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Generate and download .ICS file
  const downloadIcsFile = (event: ChurchEvent) => {
    const cleanDate = event.date.replace(/-/g, '');
    const cleanTime = event.time.replace(':', '') + '00';
    
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//AD Araras Sede//Agenda Oficial//PT-BR',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - AD Araras Sede`,
      `DESCRIPTION:${event.description}`,
      `LOCATION:${CHURCH_INFO.address}, ${CHURCH_INFO.city} - ${CHURCH_INFO.state}`,
      `DTSTART:${cleanDate}T${cleanTime}`,
      `DTEND:${cleanDate}T${Number(cleanTime) + 20000}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.id}-ad-araras.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenRsvp = (event: ChurchEvent) => {
    setRsvpEvent(event);
    setRsvpConfirmed(false);
    setRsvpName('');
    setRsvpPhone('');
    setRsvpPassCode(`ADA-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpConfirmed(true);
  };

  return (
    <section id="agenda" className="py-16 sm:py-24 bg-[#0a0c10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
              <span>CRONOGRAMA INTEGRADO</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>CALENDÁRIO & EVENTOS</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>ANO 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight [text-wrap:balance]">
              Agenda da Igreja & Congressos
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Acompanhe as datas especiais, cultos semanais e conferências. Sincronize com seu calendário do celular com um clique.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-[#12151d] border border-white/[0.08] rounded-xl self-start lg:self-end">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-amber-500 text-black font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Eventos Especiais
            </button>
            <button
              onClick={() => setViewMode('grade')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grade'
                  ? 'bg-amber-500 text-black font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Grade Semanal de Cultos
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        {viewMode === 'cards' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 text-xs scrollbar-none">
            {[
              { id: 'todos', label: 'Todos os Eventos' },
              { id: 'missoes', label: 'Missões' },
              { id: 'juventude', label: 'Juventude' },
              { id: 'mulheres', label: 'Mulheres' },
              { id: 'culto', label: 'Cultos Solenes' },
              { id: 'criancas', label: 'Crianças' },
              { id: 'especial', label: 'Vigílias' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white/[0.12] text-white border border-amber-500/40 shadow-sm'
                    : 'bg-[#12151d] text-slate-400 hover:text-slate-200 border border-white/[0.05]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* View 1: Event Cards Grid */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-[#12151e] border border-white/[0.08] hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                {/* Banner Thumbnail */}
                <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={evt.bannerImage || CHURCH_IMAGES.hero}
                    alt={evt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151e] via-[#12151e]/40 to-transparent" />
                  
                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-[#0a0c10]/85 backdrop-blur-md border border-white/[0.1] px-3 py-1.5 rounded-lg text-center">
                    <span className="block text-xs font-bold text-amber-400 font-mono">
                      {new Date(evt.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).toUpperCase()}
                    </span>
                    <span className="block text-[10px] text-slate-300">
                      {evt.time}h
                    </span>
                  </div>

                  {evt.isSpecial && (
                    <div className="absolute top-3 right-3 bg-amber-500/90 text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow-md">
                      Destaque
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Unboxed Metadata Line */}
                    <div className="flex items-center gap-2 text-xs text-amber-500 font-medium mb-1.5">
                      <span>{evt.dayOfWeek}</span>
                      <span aria-hidden="true" className="text-white/20">·</span>
                      <span>{evt.time}H</span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {evt.title}
                    </h3>

                    {evt.theme && (
                      <p className="text-xs text-amber-400/90 font-medium mt-1">
                        Tema: {evt.theme}
                      </p>
                    )}

                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>

                  {/* Speaker & Location */}
                  <div className="space-y-1.5 pt-3 border-t border-white/[0.06] text-xs text-slate-400">
                    {evt.speaker && (
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <User className="w-3.5 h-3.5 text-amber-500" />
                        <span className="truncate">{evt.speaker}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  {/* Interactive Action Buttons */}
                  <div className="pt-2 flex items-center gap-2">
                    {evt.requiresRegistration ? (
                      <button
                        onClick={() => handleOpenRsvp(evt)}
                        className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>Confirmar Presença</span>
                      </button>
                    ) : (
                      <a
                        href={getGoogleCalendarUrl(evt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.08] hover:bg-white/[0.12] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>Salvar no Google</span>
                      </a>
                    )}

                    <button
                      onClick={() => downloadIcsFile(evt)}
                      title="Baixar arquivo .ICS para o calendário"
                      className="p-2 text-slate-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] rounded-lg transition-colors cursor-pointer"
                      aria-label="Baixar .ics"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View 2: Weekly Schedule Table */}
        {viewMode === 'grade' && (
          <div className="bg-[#12151e] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/[0.08] bg-[#0d1017]">
              <h3 className="text-lg font-bold text-white">Grade Perene de Cultos Semanais</h3>
              <p className="text-xs text-slate-400 mt-1">
                Conforme estabelecido pela AD Araras Sede na Rua Santos Dumont, 492.
              </p>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {WEEKLY_SCHEDULE.map((item, idx) => (
                <div key={idx} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-amber-400">{item.dayShort}</span>
                      <span className="text-[11px] font-mono text-slate-300 mt-0.5">{item.time}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{item.name}</span>
                        <span className="text-xs text-amber-400/90 font-medium">({item.day})</span>
                      </div>
                      <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                        {item.description}
                      </p>
                      <div className="text-[11px] text-slate-500">
                        Ministrado por: {item.pastor}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start md:self-center">
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        item.name + ' - AD Araras Sede'
                      )}&details=${encodeURIComponent(item.description)}&location=${encodeURIComponent(
                        CHURCH_INFO.address + ', Araras - SP'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                      <span>Adicionar Lembrete</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* RSVP Modal with Digital Pass Generator */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#12151e] border border-white/[0.12] rounded-2xl max-w-md w-full p-6 relative shadow-2xl overflow-hidden">
            
            <button
              onClick={() => setRsvpEvent(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-white/[0.05] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!rsvpConfirmed ? (
              <form onSubmit={handleSubmitRsvp} className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                    <Ticket className="w-4 h-4" />
                    <span>CONFIRMAÇÃO DE PRESENÇA (GRATUITA)</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {rsvpEvent.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Gere seu passe digital para entrada rápida no Templo Sede da AD Araras.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: João Silva"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      WhatsApp para Lembrete (opcional)
                    </label>
                    <input
                      type="tel"
                      placeholder="(19) 99999-9999"
                      value={rsvpPhone}
                      onChange={(e) => setRsvpPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl transition-all cursor-pointer shadow-lg"
                  >
                    Emitir Credencial Digital
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white">Presença Confirmada!</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Apresente este comprovante na recepção do evento.
                  </p>
                </div>

                {/* Digital Pass Card */}
                <div className="p-4 rounded-xl bg-[#090b0f] border border-amber-500/30 space-y-3 text-left relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                      AD ARARAS SEDE · INGRESSO DIGITAL
                    </span>
                    <span className="text-xs font-mono text-slate-400">{rsvpPassCode}</span>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-white">{rsvpName}</div>
                    <div className="text-xs text-slate-300">{rsvpEvent.title}</div>
                    <div className="text-[11px] text-amber-400/90 mt-1 font-mono">
                      {rsvpEvent.date} às {rsvpEvent.time}H
                    </div>
                  </div>

                  {/* Simulated QR Code */}
                  <div className="flex items-center justify-center pt-2">
                    <div className="p-2 bg-white rounded-lg">
                      <svg className="w-24 h-24" viewBox="0 0 100 100">
                        <rect x="0" y="0" width="30" height="30" fill="black" />
                        <rect x="5" y="5" width="20" height="20" fill="white" />
                        <rect x="10" y="10" width="10" height="10" fill="black" />

                        <rect x="70" y="0" width="30" height="30" fill="black" />
                        <rect x="75" y="5" width="20" height="20" fill="white" />
                        <rect x="80" y="10" width="10" height="10" fill="black" />

                        <rect x="0" y="70" width="30" height="30" fill="black" />
                        <rect x="5" y="75" width="20" height="20" fill="white" />
                        <rect x="10" y="80" width="10" height="10" fill="black" />

                        <rect x="40" y="10" width="15" height="15" fill="black" />
                        <rect x="45" y="35" width="10" height="25" fill="black" />
                        <rect x="65" y="45" width="20" height="10" fill="black" />
                        <rect x="35" y="70" width="25" height="15" fill="black" />
                        <rect x="70" y="75" width="15" height="15" fill="black" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => downloadIcsFile(rsvpEvent)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-200 bg-white/[0.08] hover:bg-white/[0.12] rounded-lg transition-colors"
                  >
                    Salvar na Agenda
                  </button>
                  <button
                    onClick={() => setRsvpEvent(null)}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
