import React, { useState } from 'react';
import { Copy, Check, QrCode, Building2, ShieldCheck, HeartHandshake, Sparkles, DollarSign } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const DizimosOfertas: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCnpj, setCopiedCnpj] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<'dizimo' | 'oferta' | 'missoes' | 'obra'>('dizimo');
  const [selectedAmount, setSelectedAmount] = useState<number | 'outro'>(50);
  const [customAmount, setCustomAmount] = useState('');

  const handleCopy = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const currentAmountValue = selectedAmount === 'outro' ? (Number(customAmount) || 0) : selectedAmount;

  return (
    <section id="dizimos" className="py-16 sm:py-24 bg-[#0a0c10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
              <span>CONTRIBUIÇÃO DIGITAL SEGURA</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>DÍZIMOS & OFERTAS</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>PIX EM TEMPO REAL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight [text-wrap:balance]">
              Generosidade & Sustento da Obra
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria" (2 Coríntios 9:7).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: PIX Instant Giving Console (col-span-7) */}
          <div className="lg:col-span-7 bg-[#11141c] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Purpose Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Selecione a Finalidade da Contribuição:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { id: 'dizimo', label: 'Dízimo Sagrado' },
                  { id: 'oferta', label: 'Oferta de Amor' },
                  { id: 'missoes', label: 'Missões Globais' },
                  { id: 'obra', label: 'Reforma do Templo' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPurpose(p.id as any)}
                    className={`py-2 px-3 rounded-lg font-medium transition-all text-center cursor-pointer ${
                      selectedPurpose === p.id
                        ? 'bg-amber-500 text-black font-semibold shadow-md'
                        : 'bg-[#181d28] text-slate-300 hover:text-white border border-white/[0.05]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Amount Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">
                Valor Sugerido (ou defina livremente):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[30, 50, 100, 200].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-2.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                      selectedAmount === amt
                        ? 'bg-white text-slate-900 border border-amber-400'
                        : 'bg-[#181d28] text-slate-200 hover:bg-white/[0.08] border border-white/[0.05]'
                    }`}
                  >
                    R$ {amt}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">
                    R$
                  </span>
                  <input
                    type="number"
                    placeholder="Outro valor personalizado"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount('outro');
                    }}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#090b0f] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Main PIX Key Box */}
            <div className="p-4 rounded-xl bg-[#090b0f] border border-amber-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    CHAVE PIX OFICIAL ({CHURCH_INFO.pixKeyType})
                  </span>
                </div>
                <span className="text-[11px] text-amber-400 font-medium">Instantâneo</span>
              </div>

              <div className="flex items-center justify-between gap-2 p-3 bg-[#11141c] rounded-lg border border-white/[0.08]">
                <code className="text-xs sm:text-sm text-amber-300 font-mono truncate select-all">
                  {CHURCH_INFO.pixKey}
                </code>
                <button
                  onClick={() => handleCopy(CHURCH_INFO.pixKey, setCopiedKey)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-md transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow"
                >
                  {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 space-y-0.5">
                <div>Favorecido: <strong className="text-slate-200">{CHURCH_INFO.bankInfo.favored}</strong></div>
                <div>CNPJ: <span className="font-mono text-slate-300">{CHURCH_INFO.cnpj}</span></div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Ambiente bancário verificado. O comprovante é gerado diretamente no aplicativo do seu banco.</span>
            </div>

          </div>

          {/* Right: Bank Transfer & Transparency (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bank Deposit Card */}
            <div className="bg-[#11141c] border border-white/[0.08] rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Transferência Bancária (TED / DOC)
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#090b0f] border border-white/[0.05] flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Instituição Financeira</span>
                    <span className="font-semibold text-white">{CHURCH_INFO.bankInfo.bank}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#090b0f] border border-white/[0.05]">
                    <span className="text-slate-400 block text-[10px] uppercase">Agência</span>
                    <span className="font-mono font-bold text-white text-sm">{CHURCH_INFO.bankInfo.agency}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#090b0f] border border-white/[0.05]">
                    <span className="text-slate-400 block text-[10px] uppercase">Conta Corrente</span>
                    <span className="font-mono font-bold text-white text-sm">{CHURCH_INFO.bankInfo.account}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#090b0f] border border-white/[0.05] flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <span className="text-slate-400 block text-[10px] uppercase">CNPJ da Igreja</span>
                    <span className="font-mono font-semibold text-white truncate block">{CHURCH_INFO.cnpj}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(CHURCH_INFO.cnpj, setCopiedCnpj)}
                    className="p-1.5 text-slate-300 hover:text-white bg-white/[0.08] rounded-md transition-colors cursor-pointer"
                    title="Copiar CNPJ"
                  >
                    {copiedCnpj ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Accountability Card */}
            <div className="p-5 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 space-y-2.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                O Destino dos Recursos
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Todas as contribuições são destinadas integralmente à manutenção dos templos, assistência social com cestas básicas a famílias carentes de Araras, suporte a missionários no campo e evangelização de crianças e jovens.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
