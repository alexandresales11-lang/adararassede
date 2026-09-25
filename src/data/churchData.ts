import { ChurchEvent, LiveBroadcast, Ministry, PrayerRequest } from '../types/church';

export const CHURCH_INFO = {
  name: 'AD Araras Sede',
  fullName: 'Assembleia de Deus — Ministério Araras Sede',
  motto: 'Jesus é Bom ❤️ Cura, Salvação e Libertação',
  address: 'Rua Santos Dumont, 492',
  neighborhood: 'Centro / Bairro Belver',
  city: 'Araras',
  state: 'SP',
  cep: '13600-077',
  instagram: 'https://instagram.com/adararassede',
  instagramHandle: '@adararassede',
  phone: '(19) 3541-0000',
  whatsapp: '(19) 99876-5432',
  youtube: 'https://youtube.com/@adararassede',
  pixKey: 'pix@adararassede.org.br',
  pixKeyType: 'Chave E-mail',
  cnpj: '48.912.345/0001-89',
  bankInfo: {
    bank: 'Banco Bradesco (237)',
    agency: '0289',
    account: '12345-6',
    favored: 'Igreja Evangélica Assembleia de Deus Min. Araras Sede'
  }
};

export const WEEKLY_SCHEDULE = [
  {
    day: 'Terça-feira',
    dayShort: 'TER',
    time: '19:30H',
    name: 'Culto de Ensino & Doutrina',
    description: 'Estudo aprofundado da Palavra de Deus para edificação e fortalecimento espiritual da igreja.',
    pastor: 'Pastores da Sede'
  },
  {
    day: 'Quinta-feira',
    dayShort: 'QUI',
    time: '19:30H',
    name: 'Culto da Vitória, Cura e Libertação',
    description: 'Momento de clamor, oração fervorosa, imposição de mãos e testemunhos do agir de Deus.',
    pastor: 'Equipe de Intercessão & Ministério'
  },
  {
    day: 'Sábado',
    dayShort: 'SÁB',
    time: '19:30H',
    name: 'Culto da Juventude (Conectados)',
    description: 'Encontro dinâmico dos jovens e adolescentes com louvor contemporâneo e palavra contextual.',
    pastor: 'Liderança UMADA'
  },
  {
    day: 'Domingo',
    dayShort: 'DOM',
    time: '19:00H',
    name: 'Culto da Família & Celebração',
    description: 'A grande reunião dominical de celebração, louvor congregacional e ministração com toda a família.',
    pastor: 'Pastor Presidente'
  }
];

export const INITIAL_BROADCASTS: LiveBroadcast[] = [
  {
    id: 'live-now',
    title: 'Culto da Família — O Deus que Restaura Todas as Coisas',
    preacher: 'Pr. Presidente',
    theme: 'Cura, Salvação e Esperança Renovada',
    status: 'live',
    thumbnail: '/src/assets/images/hero_church_worship_1790360423474.jpg',
    date: 'Hoje',
    views: 342,
    duration: 'Ao Vivo',
    bibleVerse: {
      passage: 'Isaías 40:29-31',
      text: 'Dá vigor ao cansado e multiplica as forças ao que não tem nenhum vigor... os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.'
    },
    sermonPoints: [
      '1. O cansaço da caminhada não anula a promessa de Deus',
      '2. Esperar no Senhor é um ato ativo de confiança e oração',
      '3. Renovo sobrenatural para as famílias de Araras'
    ]
  },
  {
    id: 'stream-2',
    title: 'Culto da Vitória — Quando Deus Abre Portas Onde Não Há Caminho',
    preacher: 'Pr. Convidado',
    theme: 'Milagres e Livramento',
    status: 'recorded',
    thumbnail: '/src/assets/images/sanctuary_altar_bible_1790360454640.jpg',
    date: 'Quinta-feira passada',
    views: 1140,
    duration: '1h 38m',
    bibleVerse: {
      passage: 'Apocalipse 3:8',
      text: 'Conheço as tuas obras; eis que diante de ti pus uma porta aberta, a qual ninguém pode fechar.'
    },
    sermonPoints: [
      '1. Portas que os homens fecham, Deus abre com poder',
      '2. Guardando a fé em meio à pressão',
      '3. A fidelidade que move os céus'
    ]
  },
  {
    id: 'stream-3',
    title: 'Juventude Conectados — Avivamento na Nossa Geração',
    preacher: 'Líder dos Jovens',
    theme: 'Chamados para Fazer a Diferença',
    status: 'recorded',
    thumbnail: '/src/assets/images/youth_worship_night_1790360444403.jpg',
    date: 'Sábado passado',
    views: 980,
    duration: '1h 45m',
    bibleVerse: {
      passage: '1 Timóteo 4:12',
      text: 'Ninguém despreze a tua mocidade; pelo contrário, torna-te padrão dos fiéis, na palavra, no procedimento, no amor, na fé, na pureza.'
    },
    sermonPoints: [
      '1. Viver com propósito além do superficial',
      '2. A pureza como armadura no mundo digital',
      '3. Um coração inflamado pelo Espírito Santo'
    ]
  },
  {
    id: 'stream-4',
    title: 'Culto de Ensino — As Doutrinas Bíblicas e a Firmeza da Fé',
    preacher: 'Pastor de Ensino',
    theme: 'A Doutrina dos Apóstolos',
    status: 'recorded',
    thumbnail: '/src/assets/images/event_family_service_1790360435338.jpg',
    date: 'Terça-feira passada',
    views: 760,
    duration: '1h 22m',
    bibleVerse: {
      passage: 'Atos 2:42',
      text: 'E perseveravam na doutrina dos apóstolos, e na comunhão, e no partir do pão, e nas orações.'
    },
    sermonPoints: [
      '1. O fundamento inabalável das Sagradas Escrituras',
      '2. Comunhão fraterna que acolhe o necessitado',
      '3. Oração perseverante na vida diária'
    ]
  }
];

export const UPCOMING_EVENTS: ChurchEvent[] = [
  {
    id: 'evt-1',
    title: 'Grande Congresso de Missões & Avivamento 2026',
    category: 'missoes',
    date: '2026-10-16',
    time: '19:30',
    dayOfWeek: 'Sexta a Domingo',
    description: 'Três dias de profunda conscientização missionária, testemunhos de campos no Brasil e no mundo, e ministração especial do Espírito Santo.',
    location: 'Templo Sede — Rua Santos Dumont, 492, Araras - SP',
    speaker: 'Preletores Nacionais e Missionários de Campo',
    theme: 'Até aos Confins da Terra (Atos 1:8)',
    bannerImage: '/src/assets/images/hero_church_worship_1790360423474.jpg',
    isSpecial: true,
    requiresRegistration: true
  },
  {
    id: 'evt-2',
    title: 'Conferência de Jovens — Conectados com o Céu',
    category: 'juventude',
    date: '2026-10-24',
    time: '19:00',
    dayOfWeek: 'Sábado',
    description: 'A maior noite de louvor, adoração e comunhão para a juventude de Araras e região. Banda ao vivo, dinâmica e palavra de impacto.',
    location: 'Templo Sede — Nave Principal',
    speaker: 'Liderança Conectados & Banda Convidada',
    theme: 'Inabaláveis',
    bannerImage: '/src/assets/images/youth_worship_night_1790360444403.jpg',
    isSpecial: true,
    requiresRegistration: true
  },
  {
    id: 'evt-3',
    title: 'Chá de Mulheres Vitoriosas — Edificadas na Graça',
    category: 'mulheres',
    date: '2026-11-07',
    time: '16:00',
    dayOfWeek: 'Sábado',
    description: 'Uma tarde especial de acolhimento, ministração para mulheres, louvor intimista, testemunhos e delicioso coquetel de comunhão.',
    location: 'Salão Social AD Araras Sede',
    speaker: 'Missionária Convidada',
    theme: 'Mulheres que Oram, Casas que Prosperam',
    bannerImage: '/src/assets/images/event_family_service_1790360435338.jpg',
    isSpecial: false,
    requiresRegistration: true
  },
  {
    id: 'evt-4',
    title: 'Vigília da Vitória & Clamor pela Cidade de Araras',
    category: 'especial',
    date: '2026-10-30',
    time: '23:00',
    dayOfWeek: 'Sexta-feira',
    description: 'Madrugada inteira de adoração, jejum e oração clamando por salvação, cura para enfermos e bênção sobre as famílias da nossa cidade.',
    location: 'Templo Sede — Rua Santos Dumont, 492',
    speaker: 'Corpo Pastoral AD Araras Sede',
    theme: 'Vigiai e Orai',
    bannerImage: '/src/assets/images/sanctuary_altar_bible_1790360454640.jpg',
    isSpecial: true,
    requiresRegistration: false
  },
  {
    id: 'evt-5',
    title: 'Culto Especial de Batismo nas Águas & Santa Ceia',
    category: 'culto',
    date: '2026-11-15',
    time: '09:00',
    dayOfWeek: 'Domingo Manhã',
    description: 'Cerimônia solene de batismo nas águas para novos membros, seguida da celebração da Ceia do Senhor com toda a congregação reunida.',
    location: 'Batistério do Templo Sede',
    speaker: 'Pr. Presidente',
    theme: 'Nova Vida em Cristo',
    bannerImage: '/src/assets/images/hero_church_worship_1790360423474.jpg',
    isSpecial: true,
    requiresRegistration: false
  },
  {
    id: 'evt-6',
    title: 'EBD Especial — Confraternização do Depto. Infantil',
    category: 'criancas',
    date: '2026-10-11',
    time: '09:00',
    dayOfWeek: 'Domingo',
    description: 'Manhã lúdica para as crianças com teatro bíblico, fantoches, gincana com temas das escrituras e lanche especial para os pequeninos.',
    location: 'Espaço Kids AD Araras',
    speaker: 'Tias do Departamento Infantil',
    theme: 'Crianças aos Pés de Jesus',
    bannerImage: '/src/assets/images/event_family_service_1790360435338.jpg',
    isSpecial: false,
    requiresRegistration: true
  }
];

export const MINISTRIES_DATA: Ministry[] = [
  {
    id: 'juventude',
    name: 'Juventude Conectados (UMADA)',
    subtitle: 'Jovens e Adolescentes Firmes na Palavra',
    description: 'Movimento focado em integrar os jovens através do discipulado bíblico, cultos dinâmicos aos sábados, conferências e projetos de impacto social em Araras.',
    leader: 'Coordenação da Juventude',
    meetingTime: 'Todo Sábado às 19:30H',
    image: '/src/assets/images/youth_worship_night_1790360444403.jpg',
    color: '#f59e0b'
  },
  {
    id: 'familia',
    name: 'Ministério da Família & Casais',
    subtitle: 'Fortalecendo os Lares segundo o Evangelho',
    description: 'Apoio aos casais, pais e filhos com palestras, jantares temáticos, aconselhamento conjugal e o grande Culto da Família aos domingos.',
    leader: 'Pr. e Pastora da Família',
    meetingTime: 'Culto da Família todo Domingo às 19:00H',
    image: '/src/assets/images/event_family_service_1790360435338.jpg',
    color: '#d97706'
  },
  {
    id: 'louvor',
    name: 'Louvor & Artes Sacras',
    subtitle: 'Adoração em Espírito e em Verdade',
    description: 'Equipe de músicos, cantores, sonoplastas e operadores de transmissão ao vivo que conduzem a igreja em atmosfera de adoração profunda.',
    leader: 'Ministério de Música AD Araras',
    meetingTime: 'Ensaios aos Sábados 16:30H',
    image: '/src/assets/images/hero_church_worship_1790360423474.jpg',
    color: '#ea580c'
  },
  {
    id: 'infantil',
    name: 'Departamento Infantil (Herdeiros do Reino)',
    subtitle: 'Ensinando o Caminho aos Pequeninos',
    description: 'Salas climatizadas, monitoria dedicada durante todos os cultos oficiais e Escola Bíblica Dominical adaptada para cada faixa etária.',
    leader: 'Coordenação Pedagógica Kids',
    meetingTime: 'Durante todos os cultos oficiais e Domingo 09:00H',
    image: '/src/assets/images/sanctuary_altar_bible_1790360454640.jpg',
    color: '#f97316'
  }
];

export const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'pr-1',
    authorName: 'Irmã Maria C.',
    city: 'Araras (Jardim Cândida)',
    category: 'saude',
    request: 'Peço oração pela cirurgia e recuperação completa da minha mãe neste próximo mês. Cremos que para Deus não há impossíveis!',
    date: 'Hoje às 10:20',
    prayersCount: 47,
    isPrivate: false
  },
  {
    id: 'pr-2',
    authorName: 'Irmão Carlos Eduardo',
    city: 'Araras (Centro)',
    category: 'familia',
    request: 'Pela restauração do meu casamento e salvação dos meus filhos. Que o Senhor traga paz e união ao nosso lar.',
    date: 'Ontem',
    prayersCount: 62,
    isPrivate: false
  },
  {
    id: 'pr-3',
    authorName: 'Lucas Ferreira',
    city: 'Araras (Parque das Árvores)',
    category: 'financeiro',
    request: 'Oração por uma porta de emprego aberta e direcionamento profissional para poder sustentar minha família com dignidade.',
    date: 'Há 2 dias',
    prayersCount: 38,
    isPrivate: false
  },
  {
    id: 'pr-4',
    authorName: 'Jovem Amanda',
    city: 'Araras (Jardim Alvorada)',
    category: 'espiritual',
    request: 'Clamor por renovo espiritual, batismo com o Espírito Santo e firmeza nos caminhos do Senhor.',
    date: 'Há 3 dias',
    prayersCount: 51,
    isPrivate: false
  }
];
