import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Radio, Share2, 
  Heart, Flame, Send, MessageSquare, BookOpen, Download, 
  Check, Users, Headphones, Copy, ExternalLink, Sparkles,
  Youtube, Settings, X, Video, Info
} from 'lucide-react';
import { INITIAL_BROADCASTS, CHURCH_INFO } from '../data/churchData';
import { LiveBroadcast, LiveChatMessage } from '../types/church';

interface FloatingReaction {
  id: number;
  emoji: string;
  left: number;
  bottom: number;
}

export interface YouTubeConfig {
  type: 'channel' | 'video' | 'none';
  id: string;
}

function parseYouTubeConfig(input: string): YouTubeConfig {
  if (!input) return { type: 'none', id: '' };
  const trimmed = input.trim();

  // Channel link: youtube.com/channel/UC...
  const channelUrlMatch = trimmed.match(/youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{20,24})/);
  if (channelUrlMatch) {
    return { type: 'channel', id: channelUrlMatch[1] };
  }

  // Direct channel ID (starts with UC and is usually 22-24 chars)
  if (/^UC[a-zA-Z0-9_-]{20,24}$/.test(trimmed)) {
    return { type: 'channel', id: trimmed };
  }

  // Video ID (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return { type: 'video', id: trimmed };
  }

  // Video Link: youtube.com/watch?v=... or youtu.be/... or youtube.com/live/...
  const videoMatch = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/))([a-zA-Z0-9_-]{11})/);
  if (videoMatch) {
    return { type: 'video', id: videoMatch[1] };
  }

  return { type: 'none', id: '' };
}

export const TransmissaoHub: React.FC = () => {
  const [selectedBroadcast, setSelectedBroadcast] = useState<LiveBroadcast>(INITIAL_BROADCASTS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [audioOnly, setAudioOnly] = useState(false);
  const [viewerCount, setViewerCount] = useState(348);
  const [activeTab, setActiveTab] = useState<'chat' | 'biblia' | 'gravados'>('chat');
  
  // YouTube Live configuration (supports both automatic Channel ID and single Video ID)
  const [activeYoutubeTarget, setActiveYoutubeTarget] = useState<YouTubeConfig>(() => {
    const raw = localStorage.getItem('ad_araras_youtube_target');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {}
    }
    const legacy = localStorage.getItem('ad_araras_youtube_id');
    if (legacy) return parseYouTubeConfig(legacy);
    return { type: 'none', id: '' };
  });

  const [youtubeInput, setYoutubeInput] = useState(() => {
    const raw = localStorage.getItem('ad_araras_youtube_target');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.id) return parsed.id;
      } catch (e) {}
    }
    return localStorage.getItem('ad_araras_youtube_id') || '';
  });

  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [savedConfigFeedback, setSavedConfigFeedback] = useState(false);

  // Floating reactions
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<LiveChatMessage[]>([
    {
      id: 'msg-1',
      userName: 'Presb. Marcos Silva',
      avatarSeed: 'marcos',
      message: 'A paz do Senhor, meus irmãos! Sejam todos muito bem-vindos ao culto da AD Araras Sede.',
      timestamp: '19:32',
      isPastoral: true,
      city: 'Araras'
    },
    {
      id: 'msg-2',
      userName: 'Eliana Rodrigues',
      avatarSeed: 'eliana',
      message: 'Amém! Assistindo em família aqui no Jardim Cândida. Deus abençoe essa igreja!',
      timestamp: '19:34',
      city: 'Araras'
    },
    {
      id: 'msg-3',
      userName: 'Matheus Santos (Juventude)',
      avatarSeed: 'matheus',
      message: 'Glória a Deus por essa palavra! O Senhor é bom em todo tempo. 🔥🙌',
      timestamp: '19:35',
      city: 'Araras'
    },
    {
      id: 'msg-4',
      userName: 'Pastora Ruth',
      avatarSeed: 'ruth',
      message: 'Declaramos cura e restauração sobre cada família conectada nesta noite!',
      timestamp: '19:36',
      isPastoral: true,
      city: 'Araras'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // User Notes
  const [userNote, setUserNote] = useState(() => {
    return localStorage.getItem('ad_araras_sermon_notes') || '';
  });
  const [noteSaved, setNoteSaved] = useState(false);
  const [verseCopied, setVerseCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  // Fluctuating viewers simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(280, Math.min(450, prev + delta));
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Periodic automatic fellowship messages
  useEffect(() => {
    const incomingSamples = [
      { name: 'Irmão Davi Oliveira', msg: 'Deus seja louvado! Que culto abençoado!', city: 'Araras' },
      { name: 'Sandra Mara', msg: 'Cremos no milagre! Amém pastor!', city: 'Araras' },
      { name: 'Leticia Camargo', msg: 'Jesus é bom! O fogo do Espírito Santo nesta casa! 🔥', city: 'Araras' },
      { name: 'Pastor Roberto', msg: 'Graça e paz a todos que estão nos acompanhando online.', isPastoral: true, city: 'Araras' }
    ];

    const interval = setInterval(() => {
      const sample = incomingSamples[Math.floor(Math.random() * incomingSamples.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newMsg: LiveChatMessage = {
        id: `auto-${Date.now()}`,
        userName: sample.name,
        avatarSeed: sample.name.toLowerCase().replace(/\s+/g, ''),
        message: sample.msg,
        timestamp: timeStr,
        isPastoral: sample.isPastoral,
        city: sample.city
      };

      setChatMessages((prev) => [...prev.slice(-40), newMsg]);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Scroll chat to bottom when message arrives (strictly inside the chat container, never the window)
  useEffect(() => {
    if (activeTab === 'chat' && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, activeTab]);

  // Handle reaction fire
  const triggerReaction = (emoji: string) => {
    const id = Date.now() + Math.random();
    const left = Math.floor(Math.random() * 80) + 10;
    setReactions((prev) => [...prev, { id, emoji, left, bottom: 20 }]);

    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const sender = authorName.trim() || 'Irmão Visitante';
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const msg: LiveChatMessage = {
      id: `user-${Date.now()}`,
      userName: sender,
      avatarSeed: sender.toLowerCase().replace(/\s+/g, ''),
      message: newMessage.trim(),
      timestamp: timeStr,
      city: 'Araras'
    };

    setChatMessages((prev) => [...prev, msg]);
    setNewMessage('');
    triggerReaction('🙏');
  };

  const handleSaveNotes = () => {
    localStorage.setItem('ad_araras_sermon_notes', userNote);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2500);
  };

  const handleCopyVerse = () => {
    if (!selectedBroadcast.bibleVerse) return;
    const textToCopy = `"${selectedBroadcast.bibleVerse.text}" — ${selectedBroadcast.bibleVerse.passage} (AD Araras Sede)`;
    navigator.clipboard.writeText(textToCopy);
    setVerseCopied(true);
    setTimeout(() => setVerseCopied(false), 2000);
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = `Venha cultuar conosco agora na AD Araras Sede! Transmissão ao vivo: ${url}`;
    navigator.clipboard.writeText(text);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  return (
    <section id="transmissao" className="py-16 sm:py-24 bg-[#0a0c10] border-b border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider">
              <span>CANAL DE TRANSMISSÃO DIGITAL</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>HD 1080P</span>
              <span aria-hidden="true" className="text-white/30">·</span>
              <span>TEMPLO SEDE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tracking-tight [text-wrap:balance]">
              Transmissão Ao Vivo & Cultos Online
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Assista aos cultos em tempo real com áudio imersivo, interação pelo chat congregacional e anotações bíblicas sincronizadas.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setIsConfigOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-red-600/90 hover:bg-red-500 rounded-lg transition-colors shadow-md cursor-pointer"
              title="Vincular canal do YouTube ou link do culto"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>
                {activeYoutubeTarget.type === 'channel'
                  ? 'Canal Conectado (Auto Live)'
                  : activeYoutubeTarget.type === 'video'
                  ? 'Vídeo YouTube Conectado'
                  : 'Vincular Canal do YouTube'}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-lg transition-colors cursor-pointer"
            >
              {shareCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Compartilhar Culto</span>
                </>
              )}
            </button>

            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                'Assista agora ao culto ao vivo da AD Araras Sede: ' + window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors shadow-md"
            >
              <span>Convidar no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Main Broadcast Console Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#11141c] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Left: Video Player & Media Controls (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-black relative min-h-[420px] sm:min-h-[500px]">
            
            {/* Live Video Viewport */}
            <div className="relative w-full h-full flex-1 flex items-center justify-center overflow-hidden group select-none">
              
              {/* Real YouTube Live Stream if configured */}
              {activeYoutubeTarget.type !== 'none' ? (
                <div className="absolute inset-0 z-10 bg-black">
                  <iframe
                    src={
                      activeYoutubeTarget.type === 'channel'
                        ? `https://www.youtube.com/embed/live_stream?channel=${activeYoutubeTarget.id}&autoplay=1`
                        : `https://www.youtube.com/embed/${activeYoutubeTarget.id}?autoplay=1&rel=0&modestbranding=1`
                    }
                    title="Transmissão Ao Vivo AD Araras Sede"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                /* Simulated HD Stream Visual */
                <>
                  <div className="absolute inset-0 z-0">
                    <img
                      src={selectedBroadcast.thumbnail}
                      alt={selectedBroadcast.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                    
                    {/* Dynamic stage light sweep simulation */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />
                    
                    {/* Visualizer bars in audio mode */}
                    {audioOnly && (
                      <div className="absolute inset-0 bg-[#0a0d14]/95 flex flex-col items-center justify-center p-6 text-center z-10">
                        <Headphones className="w-12 h-12 text-amber-400 animate-bounce mb-3" />
                        <span className="text-base font-bold text-white">Modo Apenas Áudio Ativado</span>
                        <span className="text-xs text-slate-400 mt-1 max-w-sm">
                          Ideal para quem está no trânsito ou economizando pacote de dados móveis.
                        </span>
                        <div className="flex items-end gap-1.5 h-10 mt-6">
                          {[18, 32, 40, 24, 38, 28, 44, 20, 36, 26, 40].map((h, i) => (
                            <div
                              key={i}
                              className="w-1.5 bg-amber-400 rounded-t"
                              style={{
                                height: isPlaying ? `${h}px` : '6px',
                                transition: 'height 0.2s ease-in-out'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Center Play/Pause Overlay Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="relative z-20 w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-black flex items-center justify-center transition-all transform hover:scale-110 shadow-2xl cursor-pointer"
                    aria-label={isPlaying ? 'Pausar transmissão' : 'Reproduzir transmissão'}
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 fill-black" />
                    ) : (
                      <Play className="w-7 h-7 fill-black translate-x-0.5" />
                    )}
                  </button>

                  {/* Bottom Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-xs text-white">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="hover:text-amber-400 cursor-pointer transition-colors"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="hover:text-amber-400 cursor-pointer transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span className="font-mono text-slate-300">
                          {selectedBroadcast.duration || '00:45:12'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setAudioOnly(!audioOnly)}
                          className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                            audioOnly
                              ? 'bg-amber-500 text-black font-semibold'
                              : 'bg-white/[0.1] hover:bg-white/[0.2] text-slate-200'
                          }`}
                          title="Economizar dados móveis"
                        >
                          <Headphones className="w-3 h-3" />
                          <span>{audioOnly ? 'Áudio Ativado' : 'Apenas Áudio'}</span>
                        </button>

                        <div className="text-[11px] font-mono text-slate-300 bg-white/[0.1] px-2 py-0.5 rounded">
                          1080p 60fps
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Floating Reaction Particles */}
              <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
                {reactions.map((r) => (
                  <div
                    key={r.id}
                    className="absolute text-3xl animate-fade-out"
                    style={{
                      left: `${r.left}%`,
                      bottom: '20%',
                      animation: 'floatUp 1.8s forwards ease-out'
                    }}
                  >
                    {r.emoji}
                  </div>
                ))}
              </div>

              {/* Top Video Status Overlay */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-2.5 py-1 bg-red-600/90 backdrop-blur-md rounded-md text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <span>AO VIVO</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-slate-200 text-xs font-mono tabular-nums">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>{viewerCount} conectados</span>
                  </div>
                </div>

                <div className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-amber-400 text-xs font-medium">
                  {activeYoutubeTarget.type === 'channel'
                    ? 'Canal ao Vivo Automático'
                    : activeYoutubeTarget.type === 'video'
                    ? 'Vídeo YouTube Conectado'
                    : 'AD Araras Sede'}
                </div>
              </div>
            </div>

            {/* Video Meta Info Bar */}
            <div className="p-5 bg-[#0f1219] border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {selectedBroadcast.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span className="text-amber-400 font-medium">{selectedBroadcast.preacher}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedBroadcast.theme}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedBroadcast.date}</span>
                </div>
              </div>

              {/* Quick Praise Reactions Bar */}
              <div className="flex items-center gap-1.5 self-start sm:self-center">
                <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Reações:</span>
                {[
                  { label: 'Amém', emoji: '🙏' },
                  { label: 'Fogo', emoji: '🔥' },
                  { label: 'Amor', emoji: '❤️' },
                  { label: 'Glória', emoji: '🙌' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => triggerReaction(item.emoji)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-amber-500/20 hover:border-amber-500/40 border border-white/[0.08] text-xs font-medium text-slate-200 hover:text-white transition-all transform active:scale-95 cursor-pointer"
                  >
                    <span>{item.emoji}</span>
                    <span className="text-[11px]">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Interactive Tabs - Chat, Bible Notes, Recorded Sermons (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col h-[520px] lg:h-auto bg-[#141822] border-t lg:border-t-0 lg:border-l border-white/[0.08]">
            
            {/* Interactive Tab Navigation */}
            <div className="flex items-center border-b border-white/[0.08] p-2 bg-[#0e1118]">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'chat'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat Ao Vivo</span>
              </button>

              <button
                onClick={() => setActiveTab('biblia')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'biblia'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Bíblia & Esboço</span>
              </button>

              <button
                onClick={() => setActiveTab('gravados')}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeTab === 'gravados'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Gravações</span>
              </button>
            </div>

            {/* Tab 1: Live Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between overflow-hidden">
                {/* Messages Feed */}
                <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3.5 max-h-[380px]">
                  <div className="text-center py-1">
                    <span className="text-[11px] text-slate-400 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
                      Chat da congregação aberto para oração e comunhão
                    </span>
                  </div>

                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="text-xs space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${msg.isPastoral ? 'text-amber-400' : 'text-slate-200'}`}>
                          {msg.userName}
                        </span>
                        {msg.isPastoral && (
                          <span className="text-[9px] uppercase font-bold text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                            Pastoral
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-mono ml-auto">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-300 leading-relaxed pl-1 border-l-2 border-white/[0.08]">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-[#0e1118] border-t border-white/[0.08] space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Seu nome (opcional)"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-1/3 px-2.5 py-1.5 text-xs bg-[#161a24] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Deixe seu Amém ou mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full pl-2.5 pr-8 py-1.5 text-xs bg-[#161a24] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        className="absolute right-1 top-1 bottom-1 px-2 text-amber-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Enviar mensagem"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Tab 2: Bible & Sermon Outline */}
            {activeTab === 'biblia' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-5">
                {selectedBroadcast.bibleVerse && (
                  <div className="bg-[#0e1118] border border-amber-500/30 rounded-xl p-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>TEXTO ÁUREO DA NOITE</span>
                      </div>
                      <button
                        onClick={handleCopyVerse}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {verseCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{verseCopied ? 'Copiado' : 'Copiar'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-200 italic leading-relaxed mb-2 font-serif">
                      "{selectedBroadcast.bibleVerse.text}"
                    </p>
                    <div className="text-right text-xs font-semibold text-amber-400">
                      — {selectedBroadcast.bibleVerse.passage}
                    </div>
                  </div>
                )}

                {/* Sermon Points */}
                {selectedBroadcast.sermonPoints && (
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Pontos da Ministração
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300">
                      {selectedBroadcast.sermonPoints.map((point, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-[#0e1118] border border-white/[0.05]">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personal Notes Notepad */}
                <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Suas Anotações do Culto</span>
                    <button
                      onClick={handleSaveNotes}
                      className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                    >
                      {noteSaved ? 'Salvo no navegador ✓' : 'Salvar Anotação'}
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="Escreva aqui o que Deus falou ao seu coração durante a mensagem..."
                    className="w-full p-2.5 text-xs bg-[#0e1118] border border-white/[0.1] rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                  />
                </div>
              </div>
            )}

            {/* Tab 3: Recorded Broadcasts */}
            {activeTab === 'gravados' && (
              <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
                <div className="text-xs font-semibold text-slate-400 px-1 py-1">
                  Selecione uma ministração para assistir:
                </div>
                {INITIAL_BROADCASTS.map((broadcast) => {
                  const isCurrent = broadcast.id === selectedBroadcast.id;
                  return (
                    <button
                      key={broadcast.id}
                      onClick={() => {
                        setSelectedBroadcast(broadcast);
                        setIsPlaying(true);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-all flex gap-3 cursor-pointer ${
                        isCurrent
                          ? 'bg-amber-500/10 border-amber-500/40'
                          : 'bg-[#0e1118] hover:bg-white/[0.04] border-white/[0.06]'
                      }`}
                    >
                      <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-black">
                        <img
                          src={broadcast.thumbnail}
                          alt={broadcast.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">
                          {broadcast.title}
                        </div>
                        <div className="text-[11px] text-amber-400 font-medium truncate mt-0.5">
                          {broadcast.preacher}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                          <span>{broadcast.date}</span>
                          <span>·</span>
                          <span>{broadcast.duration}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

          </div>
        </div>

      {/* Modal de Configuração do YouTube Live */}
      {isConfigOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#12151e] border border-white/[0.12] rounded-2xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setIsConfigOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white bg-white/[0.05] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-red-500 font-bold text-xs">
              <Youtube className="w-4 h-4 fill-red-500" />
              <span>CONFIGURAÇÃO DE TRANSMISSÃO AO VIVO</span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">
                Transmissão Direta do YouTube
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Você pode conectar o <strong>Canal Oficial da Igreja</strong> para que qualquer culto ao vivo apareça aqui automaticamente, sem precisar de link novo toda semana e sem obrigação de usar OBS!
              </p>
            </div>

            {/* Explanatory cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#090b0f] border border-amber-500/20 space-y-1.5">
                <span className="font-bold text-amber-400 block">Opção 1: Direto pelo Canal (Automático)</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Cadastre o link ou ID do Canal (ex: <code>UC...</code>). O que estiver ao vivo no canal tocará aqui sozinho!
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#090b0f] border border-white/[0.08] space-y-1.5">
                <span className="font-bold text-slate-200 block">Opção 2: Culto Específico</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Cole o link de um vídeo ou live pontual do dia (ex: <code>youtube.com/watch?v=...</code>).
                </p>
              </div>
            </div>

            {/* Answer to OBS question */}
            <div className="p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" />
                Precisa obrigatoriamente do OBS? Não!
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                A igreja pode transmitir <strong>direto do celular</strong> (pelo aplicativo oficial do YouTube), por um <strong>notebook com webcam</strong>, ou pelo <strong>OBS Studio</strong> (se tiver câmeras e mesa de som). O site receberá o sinal do canal de qualquer uma dessas formas!
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-slate-200">
                Link do Canal, ID do Canal (UC...) ou Link do Vídeo:
              </label>
              <input
                type="text"
                value={youtubeInput}
                onChange={(e) => setYoutubeInput(e.target.value)}
                placeholder="Ex: https://youtube.com/channel/UC... ou link do culto"
                className="w-full px-3 py-2 text-xs bg-[#090b0f] border border-white/[0.1] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
              />
              <span className="text-[11px] text-slate-400 block">
                Dica: Para pegar o ID do seu canal, acesse o YouTube Studio &gt; Configurações &gt; Canal &gt; Configurações avançadas.
              </span>
            </div>

            {savedConfigFeedback && (
              <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>
                  {activeYoutubeTarget.type === 'channel'
                    ? 'Canal configurado com sucesso! Qualquer live transmitida tocará automaticamente.'
                    : activeYoutubeTarget.type === 'video'
                    ? 'Vídeo/Culto vinculado com sucesso!'
                    : 'Configuração atualizada!'}
                </span>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              {activeYoutubeTarget.type !== 'none' && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveYoutubeTarget({ type: 'none', id: '' });
                    setYoutubeInput('');
                    localStorage.removeItem('ad_araras_youtube_target');
                    localStorage.removeItem('ad_araras_youtube_id');
                    setSavedConfigFeedback(true);
                    setTimeout(() => {
                      setSavedConfigFeedback(false);
                      setIsConfigOpen(false);
                    }, 1200);
                  }}
                  className="py-2.5 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.08] hover:bg-white/[0.12] rounded-xl transition-colors cursor-pointer"
                >
                  Voltar ao Player Padrão
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  const target = parseYouTubeConfig(youtubeInput);
                  setActiveYoutubeTarget(target);
                  if (target.type !== 'none') {
                    localStorage.setItem('ad_araras_youtube_target', JSON.stringify(target));
                    localStorage.setItem('ad_araras_youtube_id', target.id);
                  } else {
                    localStorage.removeItem('ad_araras_youtube_target');
                    localStorage.removeItem('ad_araras_youtube_id');
                  }
                  setSavedConfigFeedback(true);
                  setTimeout(() => {
                    setSavedConfigFeedback(false);
                    setIsConfigOpen(false);
                  }, 1200);
                }}
                className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Salvar Conexão do YouTube</span>
              </button>
            </div>
          </div>
        </div>
      )}

      </div>

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translateY(-160px) scale(1.3);
          }
        }
      `}</style>
    </section>
  );
};
