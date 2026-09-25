import React, { useState } from 'react';
import { MapPin, Navigation, Car, Baby, Accessibility, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { CHURCH_INFO, WEEKLY_SCHEDULE, CHURCH_IMAGES } from '../data/churchData';

export const LocalizacaoSection: React.FC = () => {
  const [addressCopied, setAddressCopied] = useState(false);

  const fullAddress = `${CHURCH_INFO.address}, ${CHURCH_INFO.city} - ${CHURCH_INFO.state}, CEP ${CHURCH_INFO.cep}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'AD Araras Sede, ' + fullAddress
  )}`;

  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(
    'Rua Santos Dumont 492, Araras - SP'
  )}`;

  return (
    <section id="localizacao" className="py-16 sm:py-24 bg-[#0a0c10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
              <span>NOSSA CASA DE ADORAÇÃO</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>TEMPLO SEDE</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>ARARAS - SP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight [text-wrap:balance]">
              Venha nos Fazer uma Visita
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Nossas portas estão abertas para acolher você e sua família. Localização central e de fácil acesso na cidade de Araras.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Address, Navigation Buttons & Facility Info (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="bg-[#11141c] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      Templo Sede — Ministério Araras
                    </h3>
                    <span className="text-xs text-amber-400 font-medium">AD Araras Sede</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-sm text-slate-300">
                <p className="font-semibold text-white">{CHURCH_INFO.address}</p>
                <p className="text-xs text-slate-400">{CHURCH_INFO.neighborhood} · {CHURCH_INFO.city} - {CHURCH_INFO.state}</p>
                <p className="text-xs text-slate-400 font-mono">CEP: {CHURCH_INFO.cep}</p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={handleCopyAddress}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {addressCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Endereço Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copiar Endereço</span>
                    </>
                  )}
                </button>
              </div>

              {/* Navigation Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 text-xs font-semibold text-slate-200 hover:text-white bg-white/[0.08] hover:bg-white/[0.14] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>Waze</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

            {/* Visitor Amenities & Comfort */}
            <div className="bg-[#11141c] border border-white/[0.08] rounded-2xl p-6 space-y-3.5 shadow-xl flex-1">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Estrutura & Acolhimento
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Accessibility className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Acessibilidade Total</span>
                    <span className="text-slate-400 text-[11px]">Rampas de acesso e banheiros adaptados para cadeirantes e idosos.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Baby className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Espaço Kids & Berçário</span>
                    <span className="text-slate-400 text-[11px]">Ambiente acolhedor com monitoras dedicadas durante todos os cultos.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Estacionamento Tranquilo</span>
                    <span className="text-slate-400 text-[11px]">Vagas nas imediações da Rua Santos Dumont e rua lateral com segurança.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Map Mockup + Photo (col-span-7) */}
          <div className="lg:col-span-7 bg-[#11141c] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
            
            {/* Visual Sanctuary Photo */}
            <div className="relative h-64 sm:h-72 w-full bg-slate-900">
              <img
                src={CHURCH_IMAGES.sanctuary}
                alt="Altar e Templo da AD Araras Sede"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11141c] via-[#11141c]/40 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="text-white font-semibold bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.1]">
                  Nave do Templo Sede · Rua Santos Dumont, 492
                </span>
                <span className="text-amber-400 font-mono text-[11px] bg-black/70 backdrop-blur-md px-2.5 py-1.5 rounded-lg">
                  Araras - SP
                </span>
              </div>
            </div>

            {/* Simulated Live Street & Schedule Card */}
            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Horários dos Cultos Presenciais
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                {WEEKLY_SCHEDULE.map((sch) => (
                  <div key={sch.dayShort} className="p-3 rounded-xl bg-[#090b0f] border border-white/[0.06]">
                    <div className="font-bold text-amber-400 font-mono">{sch.dayShort}</div>
                    <div className="text-sm font-extrabold text-white mt-0.5">{sch.time}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-1">{sch.name.split(' ')[0]}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-amber-500/[0.04] border border-amber-500/20 text-xs text-slate-300 leading-relaxed flex items-center justify-between">
                <span>
                  Primeira vez na igreja? Procure a <strong>Equipe de Boas-Vindas</strong> na entrada principal para receber um carinho especial da congregação!
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
