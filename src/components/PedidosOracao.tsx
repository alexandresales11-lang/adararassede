import React, { useState } from 'react';
import { Heart, Send, ShieldCheck, Check, Sparkles, User, MapPin, Lock, MessageCircle } from 'lucide-react';
import { INITIAL_PRAYERS } from '../data/churchData';
import { PrayerRequest } from '../types/church';

export const PedidosOracao: React.FC = () => {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('ad_araras_prayers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRAYERS;
      }
    }
    return INITIAL_PRAYERS;
  });

  const [authorName, setAuthorName] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<'saude' | 'familia' | 'espiritual' | 'financeiro' | 'urgente'>('saude');
  const [requestText, setRequestText] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [prayedIds, setPrayedIds] = useState<string[]>([]);

  const handlePrayFor = (id: string) => {
    if (prayedIds.includes(id)) return;

    const updated = prayers.map((p) => {
      if (p.id === id) {
        return { ...p, prayersCount: p.prayersCount + 1 };
      }
      return p;
    });

    setPrayers(updated);
    setPrayedIds([...prayedIds, id]);
    localStorage.setItem('ad_araras_prayers', JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    const newPrayer: PrayerRequest = {
      id: `pr-${Date.now()}`,
      authorName: authorName.trim() || 'Irmão em Cristo (Anônimo)',
      city: city.trim() || 'Araras - SP',
      category,
      request: requestText.trim(),
      date: 'Agora mesmo',
      prayersCount: 1,
      isPrivate
    };

    if (!isPrivate) {
      const updated = [newPrayer, ...prayers];
      setPrayers(updated);
      localStorage.setItem('ad_araras_prayers', JSON.stringify(updated));
    }

    setIsSubmitted(true);
    setRequestText('');
    setAuthorName('');
    setCity('');
  };

  return (
    <section id="oracao" className="py-16 sm:py-24 bg-[#0a0c10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
              <span>INTERCESSÃO & FÉ</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>EQUIPE DE ORAÇÃO</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>ATENDIMENTO PASTORAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight [text-wrap:balance]">
              Pedidos de Oração & Clamor
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              "A oração de um justo é poderosa e eficaz" (Tiago 5:16). Compartilhe seu fardo conosco ou envie um pedido confidencial para o corpo pastoral.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Submit Prayer Request (col-span-5) */}
          <div className="lg:col-span-5 bg-[#12151e] border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-xl">
            <div className="space-y-1 mb-5">
              <h3 className="text-lg font-bold text-white">
                Como podemos orar por você?
              </h3>
              <p className="text-xs text-slate-400">
                Os pedidos são levados ao altar nos cultos de terça, quinta, sábado e domingo.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Pedido Apresentado diante de Deus!</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Nossa equipe de intercessão e pastores estarão clamando pelo seu propósito. Tenha paz em seu coração: Jesus é bom!
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 text-xs font-semibold text-amber-400 hover:text-white bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
                >
                  Enviar outro pedido
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Seu Nome (ou deixe vazio para anônimo)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Irmão Roberto ou Anônimo"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Bairro / Cidade
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Araras - SP"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Motivo Principal
                    </label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-white/[0.1] rounded-lg text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="saude">Saúde & Cura</option>
                      <option value="familia">Família & Casamento</option>
                      <option value="espiritual">Vida Espiritual</option>
                      <option value="financeiro">Finanças & Emprego</option>
                      <option value="urgente">Causa Urgente</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Escreva o seu pedido *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={requestText}
                    onChange={(e) => setRequestText(e.target.value)}
                    placeholder="Conte-nos o motivo pelo qual você precisa que o Senhor intervenha..."
                    className="w-full px-3 py-2 text-sm bg-[#0a0c10] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>

                {/* Privacy Toggle */}
                <div className="p-3 bg-[#0a0c10] border border-white/[0.08] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-200">
                        Pedido Confidencial?
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Se ativado, apenas os pastores terão acesso.
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                    className="w-4 h-4 text-amber-500 rounded bg-black border-slate-600 focus:ring-amber-500 cursor-pointer"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 rounded-xl transition-all cursor-pointer shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Apresentar Pedido de Oração</span>
                </button>
              </form>
            )}
          </div>

          {/* Right: Public Community Prayer Wall (col-span-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                Mural Congregacional de Intercessão
              </h3>
              <span className="text-xs text-amber-400 font-mono">
                {prayers.length} motivos ativos
              </span>
            </div>

            <div className="space-y-3.5">
              {prayers.map((prayer) => {
                const hasPrayed = prayedIds.includes(prayer.id);
                return (
                  <div
                    key={prayer.id}
                    className="bg-[#12151e] border border-white/[0.08] rounded-xl p-5 hover:border-amber-500/20 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{prayer.authorName}</span>
                          <span aria-hidden="true" className="text-white/20">·</span>
                          <span className="text-slate-400">{prayer.city}</span>
                        </div>
                        <span className="text-slate-500 text-[11px] font-mono">{prayer.date}</span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        "{prayer.request}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                      <span className="text-[11px] text-amber-400/90 font-medium">
                        {prayer.category === 'saude' && 'Cura & Saúde'}
                        {prayer.category === 'familia' && 'Família & Casamento'}
                        {prayer.category === 'espiritual' && 'Vida Espiritual'}
                        {prayer.category === 'financeiro' && 'Finanças & Trabalho'}
                        {prayer.category === 'urgente' && 'Causa Urgente'}
                      </span>

                      <button
                        onClick={() => handlePrayFor(prayer.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
                          hasPrayed
                            ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                            : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${hasPrayed ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                        <span>
                          {hasPrayed ? 'Orando junto 🙏' : 'Estou orando'} ({prayer.prayersCount})
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
