import React, { useState } from 'react';
import { Users, Heart, Music, Baby, ArrowUpRight, Check, X, ShieldAlert } from 'lucide-react';
import { MINISTRIES_DATA } from '../data/churchData';
import { Ministry } from '../types/church';

export const MinisteriosSection: React.FC = () => {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  const handleOpenVolunteer = (m: Ministry) => {
    setSelectedMinistry(m);
    setVolunteerSubmitted(false);
    setVolunteerName('');
    setVolunteerPhone('');
  };

  const handleSubmitVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!volunteerName.trim()) return;
    setVolunteerSubmitted(true);
  };

  return (
    <section id="ministerios" className="py-16 sm:py-24 bg-[#0a0c10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
              <span>CORPO DE CRISTO EM AÇÃO</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>DEPARTAMENTOS & COMUNHÃO</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>VOLUNTARIADO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight [text-wrap:balance]">
              Ministérios da AD Araras Sede
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Cada membro é parte viva da congregação. Descubra onde sua vocação e dons espirituais podem florescer para abençoar vidas em Araras.
            </p>
          </div>
        </div>

        {/* Asymmetric Bento-Grid for Ministries */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {MINISTRIES_DATA.map((ministry, idx) => {
            const isWide = idx === 0 || idx === 1;
            return (
              <div
                key={ministry.id}
                className={`${
                  isWide ? 'lg:col-span-6' : 'lg:col-span-6'
                } bg-[#11141c] border border-white/[0.08] hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-xl`}
              >
                {/* Image Banner */}
                <div className="relative h-56 sm:h-64 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={ministry.image}
                    alt={ministry.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.75] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-[#11141c]/40 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-medium text-amber-300 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/[0.1]">
                      {ministry.meetingTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                      {ministry.name}
                    </h3>
                    <p className="text-xs font-medium text-amber-400 mt-1">
                      {ministry.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                      {ministry.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Liderança: <span className="text-slate-200">{ministry.leader}</span>
                    </div>

                    <button
                      onClick={() => handleOpenVolunteer(ministry)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-white/[0.08] hover:bg-amber-600 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Quero Fazer Parte</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Volunteer Modal */}
      {selectedMinistry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#12151e] border border-white/[0.12] rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedMinistry(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-white/[0.05] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!volunteerSubmitted ? (
              <form onSubmit={handleSubmitVolunteer} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                    INTEGRAÇÃO MINISTERIAL
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Servir no departamento: {selectedMinistry.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Preencha seus dados para que a coordenação ministerial entre em contato com você.
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
                      placeholder="Ex: Ana Clara Santos"
                      value={volunteerName}
                      onChange={(e) => setVolunteerName(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      WhatsApp para Contato *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(19) 99876-5432"
                      value={volunteerPhone}
                      onChange={(e) => setVolunteerPhone(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-xl transition-colors cursor-pointer shadow-lg"
                  >
                    Enviar Inscrição de Voluntário
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Deus abençoe sua disposição!</h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                    Obrigado, <strong className="text-white">{volunteerName}</strong>. A liderança do ministério entrará em contato via WhatsApp para marcar uma conversa e acolher você na equipe!
                  </p>
                </div>
                <button
                  onClick={() => setSelectedMinistry(null)}
                  className="px-6 py-2 text-xs font-semibold text-white bg-white/[0.1] hover:bg-white/[0.2] rounded-lg transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
};
