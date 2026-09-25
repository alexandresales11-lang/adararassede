import React from 'react';
import { ChurchLogo } from './ChurchLogo';
import { MapPin, Phone, Instagram, Youtube, HeartHandshake, Calendar, ArrowUp } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080c] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Identity (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <ChurchLogo size={48} />
              <div>
                <span className="text-base font-bold text-white block">
                  AD Araras Sede
                </span>
                <span className="text-xs text-amber-500 font-medium">
                  Ministério Araras
                </span>
              </div>
            </div>

            <p className="text-slate-400 max-w-sm leading-relaxed">
              Igreja Evangélica Assembleia de Deus — Ministério Araras Sede. Proclamando o Evangelho de Jesus Cristo com cura, salvação e libertação para todas as famílias de Araras e região.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={CHURCH_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-amber-500/20 hover:text-amber-400 text-slate-300 flex items-center justify-center transition-colors border border-white/[0.08]"
                aria-label="Instagram da AD Araras Sede"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={CHURCH_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-amber-500/20 hover:text-amber-400 text-slate-300 flex items-center justify-center transition-colors border border-white/[0.08]"
                aria-label="YouTube da AD Araras Sede"
              >
                <Youtube className="w-4 h-4" />
              </a>

              <span className="text-xs text-slate-500 pl-1">
                Siga-nos: <strong className="text-slate-300">{CHURCH_INFO.instagramHandle}</strong>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Acesso Rápido
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate('transmissao')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Transmissão Ao Vivo dos Cultos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('agenda')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Agenda de Eventos e Congressos
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ministerios')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Departamentos e Ministérios
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('oracao')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Mural de Pedidos de Oração
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dizimos')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Dízimos e Ofertas via PIX
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('localizacao')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Como Chegar ao Templo Sede
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Times & Address (col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Templo Sede & Horários
            </h4>
            
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{CHURCH_INFO.address}, Araras - SP</span>
              </div>

              <div className="pt-2 text-[11px] space-y-1">
                <div className="text-slate-300 font-semibold">Cultos Semanais:</div>
                <div>Terça e Quinta-feira: 19:30H</div>
                <div>Sábado (Jovens): 19:30H</div>
                <div>Domingo (Família): 19:00H</div>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 text-amber-500" />
                <span>Voltar ao topo da página</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Assembleia de Deus — Ministério Araras Sede. CNPJ: {CHURCH_INFO.cnpj}. Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Jesus é Bom ❤️ Cura, Salvação e Libertação</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
