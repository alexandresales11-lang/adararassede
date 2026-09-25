import React, { useState, useEffect } from 'react';
import { Play, Calendar, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { WEEKLY_SCHEDULE, CHURCH_INFO } from '../data/churchData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  nextServiceTitle: string;
  nextServiceDay: string;
  nextServiceTime: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    nextServiceTitle: 'Culto da Família',
    nextServiceDay: 'Domingo',
    nextServiceTime: '19:00H',
  });

  // Calculate real next service from church schedule (TER 19:30, QUI 19:30, SAB 19:30, DOM 19:00)
  useEffect(() => {
    const calculateNextService = () => {
      const now = new Date();
      // Target schedule table: 0=Sun(19:00), 2=Tue(19:30), 4=Thu(19:30), 6=Sat(19:30)
      const targets = [
        { dayOfWeek: 0, hour: 19, minute: 0, title: 'Culto da Família & Celebração', name: 'Domingo', timeStr: '19:00H' },
        { dayOfWeek: 2, hour: 19, minute: 30, title: 'Culto de Ensino & Doutrina', name: 'Terça-feira', timeStr: '19:30H' },
        { dayOfWeek: 4, hour: 19, minute: 30, title: 'Culto da Vitória & Libertação', name: 'Quinta-feira', timeStr: '19:30H' },
        { dayOfWeek: 6, hour: 19, minute: 30, title: 'Culto da Juventude (Conectados)', name: 'Sábado', timeStr: '19:30H' },
      ];

      let closestDiff = Infinity;
      let selectedTarget = targets[0];
      let selectedDate = new Date();

      for (const t of targets) {
        const nextDate = new Date(now);
        let dayDiff = (t.dayOfWeek - now.getDay() + 7) % 7;
        
        // If today is the service day, check if it already passed
        if (dayDiff === 0) {
          const serviceTimeToday = new Date(now);
          serviceTimeToday.setHours(t.hour, t.minute, 0, 0);
          if (now.getTime() > serviceTimeToday.getTime()) {
            dayDiff = 7; // moves to next week
          }
        }

        nextDate.setDate(now.getDate() + dayDiff);
        nextDate.setHours(t.hour, t.minute, 0, 0);

        const diff = nextDate.getTime() - now.getTime();
        if (diff > 0 && diff < closestDiff) {
          closestDiff = diff;
          selectedTarget = t;
          selectedDate = nextDate;
        }
      }

      const totalSeconds = Math.max(0, Math.floor(closestDiff / 1000));
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        nextServiceTitle: selectedTarget.title,
        nextServiceDay: selectedTarget.name,
        nextServiceTime: selectedTarget.timeStr,
      });
    };

    calculateNextService();
    const interval = setInterval(calculateNextService, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0a0c10] border-b border-white/[0.06]">
      {/* Background Hero Photography with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_church_worship_1790360423474.jpg"
          alt="Momento de adoração no Templo Sede da AD Araras"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
        />
        {/* Ambient Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-[#0a0c10]/70 to-[#0a0c10]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c10]/90 via-[#0a0c10]/60 to-transparent" />
        <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Header (Zero-Pill Discipline) - Hidden on Mobile */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
              <span>ASSEMBLEIA DE DEUS</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>MINISTÉRIO ARARAS SEDE</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span className="text-slate-300">ARARAS - SP</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] [text-wrap:balance]">
              Jesus é Bom. <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-orange-400 bg-clip-text text-transparent">
                Cura, Salvação e Libertação.
              </span>
            </h1>

            {/* Subtitle with measure 65-75ch */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Uma família de fé no coração de Araras. Cultos vibrantes, ensino bíblico
              aprofundado, acolhimento pastoral para o seu lar e transmissões em alta
              definição para alcançar você onde estiver.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('transmissao')}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl shadow-xl shadow-amber-900/40 transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Assistir Culto Ao Vivo</span>
              </button>

              <button
                onClick={() => onNavigate('agenda')}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Programação da Semana</span>
              </button>
            </div>

            {/* Physical Location Marker */}
            <div className="pt-4 flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{CHURCH_INFO.address} — Araras - SP</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <button
                onClick={() => onNavigate('localizacao')}
                className="text-amber-400 hover:underline font-medium"
              >
                Como Chegar
              </button>
            </div>
          </div>

          {/* Right Column: Next Service Countdown & Broadcast Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#12151d]/90 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide">
                    <Clock className="w-3.5 h-3.5" />
                    <span>PRÓXIMO ENCONTRO CONGREGACIONAL</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">
                    {timeLeft.nextServiceTitle}
                  </h2>
                </div>
              </div>

              {/* Date & Time details */}
              <div className="text-xs text-slate-300 mb-5 flex items-center gap-2">
                <span className="font-semibold text-white">{timeLeft.nextServiceDay}</span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-400 font-mono font-medium">{timeLeft.nextServiceTime}</span>
                <span aria-hidden="true">·</span>
                <span>Templo Sede</span>
              </div>

              {/* Countdown Ticker with Tabular Numerals */}
              <div className="grid grid-cols-4 gap-2.5 mb-6 text-center">
                <div className="bg-[#0a0c10] border border-white/[0.06] rounded-xl p-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Dias</div>
                </div>
                <div className="bg-[#0a0c10] border border-white/[0.06] rounded-xl p-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Horas</div>
                </div>
                <div className="bg-[#0a0c10] border border-white/[0.06] rounded-xl p-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-1">Min</div>
                </div>
                <div className="bg-[#0a0c10] border border-white/[0.06] rounded-xl p-3 border-amber-500/30 bg-amber-500/[0.04]">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-amber-400 uppercase tracking-wider mt-1">Seg</div>
                </div>
              </div>

              {/* Service schedule quick list */}
              <div className="space-y-2 border-t border-white/[0.06] pt-4 mb-5">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Nossa Grade Semanal Oficial
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {WEEKLY_SCHEDULE.map((item) => (
                    <div key={item.dayShort} className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-200">{item.dayShort}</span>
                        <span className="text-amber-400 font-mono">{item.time}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{item.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => onNavigate('agenda')}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.08] hover:bg-white/[0.12] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ver Todos os Eventos</span>
                </button>
                <button
                  onClick={() => onNavigate('transmissao')}
                  className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-950/50"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Canal Ao Vivo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
