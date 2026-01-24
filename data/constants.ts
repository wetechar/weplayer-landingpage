import { 
  MonitorPlay, 
  Network, 
  Headset, 
  Home, 
  Building2, 
  Handshake,
  Cpu,
  Mic,
  Video
} from 'lucide-react';
import { ServiceItem, VerticalItem, NavItem, PartnerLogo } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Servicios', href: '#services' },
  // { label: 'Soluciones', href: '#verticals' },
  // { label: 'Demos', href: '#demos' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Contacto', href: '#contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'workspace',
    title: 'Workspace Collaboration',
    description: 'Realizamos el diseño y la concepción de espacios open office, huddle rooms, soundmasking, adaptación acústica de ambientes, que maximizan la eficiencia, interacción y productividad de tus equipos de trabajo.',
    icon: Handshake,
    imageUrl: '/images/services/workspace.webp', // Hands typing on laptop keyboard
  },
  {
    id: 'unified-it',
    title: 'Unified IT & Cloud',
    description: 'Consultoría en inversiones tecnológicas para Conectividad, Comunicaciones unificadas, Cloud, IoT, cableado estructurado, seguridad. Sea una oficina grande o pequeña, aseguramos el planeamiento correcto para un entorno eficiente y seguro.',
    icon: Network,
    imageUrl: '/images/services/cloud.webp', // Person looking at computer screen
  },
  {
    id: 'managed-services',
    title: 'Managed Services Provider',
    description: 'Acuerdos de soporte personalizados, medición y analíticas de uso, cursos y capacitación on demand, mesas de ayuda, AVNoc, gestión de activos y otros tipos de outsourcing a medida.',
    icon: Headset,
    imageUrl: '/images/services/msp.webp', // Data center/server room
  },
  {
    id: 'entertainment',
    title: 'Home Entertainment Gear',
    description: 'El máximo entretenimiento en tu hogar a través del cine en casa, música en todos tus ambientes, control automatizado (domótica compatible con Google Home y Amazon Alexa), gaming, HiFi Stereo, WiFi, alarmas y más.',
    icon: Home,
    imageUrl: '/images/services/home.webp', // Home theater/living room
  },
  {
    id: 'verticals',
    title: 'Vertical Market Solutions',
    description: 'Consultoría por mercado vertical, escalable según rubro e industria: Casinos, shoppings, desarrolladores, laboratorios, salud, educación, energía, corporativo, estudios arquitectura, banca/finanzas, gobierno y otros.',
    icon: Building2,
    imageUrl: '/images/services/vertical.webp', // Blueprints/architectural plans
  },
  {
    id: 'partnership',
    title: 'Professional Partnership',
    description: 'Colaboramos junto a estudios y profesionales del diseño y la construcción desde la concepción del proyecto arquitectónico. -Open Work Space collaborations, Biophilic Design, Sound Masking, sistemas CCTV, control de acceso, música funcional.',
    icon: Cpu,
    imageUrl: '/images/services/partnership.webp', // Aerial office view
  },
];

export const VERTICALS: VerticalItem[] = [
  {
    id: 'corp',
    title: 'Corporativo & Oficinas',
    description: 'Transformamos espacios de trabajo en hubs de colaboración híbrida con tecnología de videoconferencia fluida.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
    features: ['Salas de Zoom/Teams', 'Reserva de salas', 'Acústica arquitectónica']
  },
  {
    id: 'hospitality',
    title: 'Hotelería & Turismo',
    description: 'Experiencias inmersivas para huéspedes, desde el lobby hasta la habitación, con control integrado.',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    features: ['Digital Signage', 'Audio distribuido', 'Control de iluminación']
  },
  {
    id: 'entertainment',
    title: 'Casinos & Bingos',
    description: 'Soluciones de alto impacto visual y sonoro para mantener la energía y el engagement del cliente.',
    imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=1200&auto=format&fit=crop',
    features: ['Video Walls gigantes', 'Audio de alta fidelidad', 'Sistemas de seguridad CCTV']
  },
];

export const PARTNERS: PartnerLogo[] = [
  {
    name: 'CATCH-BOX',
    url: 'https://catchbox.com',
    subtitle: 'El Micrófono Móvil',
    description: 'Interactuá y colaborá con este sistema ágil, móvil, customizable, liviano',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1200&auto=format&fit=crop', // Microphone/hands holding device
  },
  {
    name: 'JABRA',
    url: 'https://www.jabra.com',
    subtitle: 'Altavoces, auriculares y cámaras PRO',
    description: 'Viví la mejor experiencia de comunicación con sonido claro, móvil',
    imageUrl: 'https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=1200&auto=format&fit=crop', // Speaker/audio device
  },
  {
    name: 'CASIO',
    url: 'https://www.casio.com',
    subtitle: 'Proyector LED-Lamp FREE',
    description: 'Sustentable, libre de mantenimiento, sin ruido, bajo consumo, gran potencia luminica',
    imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200&auto=format&fit=crop', // Projector
  },
  {
    name: 'LOGITECH',
    url: 'https://www.logitech.com',
    subtitle: 'Videoconferencia simplificada',
    description: 'Videoconferencia que se adecúa a todos tus espacios, salas, espacios abiertos',
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1200&auto=format&fit=crop', // Video conferencing camera
  },
  {
    name: 'Crestron',
    url: 'https://www.crestron.com',
    subtitle: 'Control y Automatización',
    description: 'Sistemas de control unificado para espacios inteligentes y automatizados',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop', // Control system
  },
  {
    name: 'Zoom',
    url: 'https://zoom.us',
    subtitle: 'Comunicación Unificada',
    description: 'Plataforma de videoconferencia líder para colaboración empresarial',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop', // Video conference room
  },
];