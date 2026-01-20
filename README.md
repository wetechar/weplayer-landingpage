# 🎯 We Player Landing Page



Landing page moderna y responsiva para We Player, la solución completa de cartelería digital.

## 🚀 Características

- **Diseño Moderno**: UI/UX profesional con gradientes y animaciones
- **Totalmente Responsivo**: Optimizado para móviles, tablets y desktop
- **Analytics Integrado**: Google Analytics 4 con tracking personalizado
- **Formulario de Contacto**: Con validaciones y feedback visual
- **Performance Optimizada**: Next.js 14 con optimizaciones
- **SEO Ready**: Meta tags y estructura optimizada

## 🎨 Colores de Marca

- **Rojo We Player**: `#ED4E4E`
- **Azul We Player**: `#1498D5`
- **Amarillo We Player**: `#FFD700`

## 📊 Analytics Implementado

- ✅ **Google Analytics 4**
- ✅ **Tracking de eventos** (clicks, scroll, formularios)
- ✅ **Métricas de engagement**
- ✅ **Fuentes de tráfico**
- ✅ **Conversiones**

## 🛠️ Tecnologías

- **Next.js 14** - Framework React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos
- **Google Analytics 4** - Analytics

## 📚 Documentación

### **📁 Estructura Organizada:**

Toda la documentación técnica está organizada en la carpeta `docs/`:

- **🎨 `/docs/overlay-effects/`** - Efectos de overlay y hover
- **🎬 `/docs/video-optimization/`** - Optimización de videos
- **🚀 `/docs/deployment/`** - Despliegue y GitHub
- **📊 `/docs/analytics/`** - Google Analytics 4
- **⚙️ `/docs/setup/`** - Configuración inicial

### **📖 Guías Principales:**

- [Configuración de Despliegue](./docs/deployment/DEPLOY_INSTRUCTIONS.md)
- [Efectos de Overlay](./docs/overlay-effects/CORRECT_OVERLAY_AND_SECTION_CONFIGURATION.md)
- [Optimización de Video](./docs/video-optimization/QUICK_START_VIDEO.md)
- [Analytics Setup](./docs/analytics/ANALYTICS_SETUP.md)

## 🎬 Scripts de Video

### **📁 Scripts Organizados:**

Todos los scripts de optimización de video están en la carpeta `scripts/`:

- **📦 `optimize-video.js`** - Script principal de Node.js
- **🪟 `setup-video-complete.bat`** - Setup completo de video
- **🪟 `copy-to-display.bat`** - Copiar archivos optimizados
- **🪟 `optimize-video-simple.bat`** - Optimización rápida
- **💻 `optimize-video.ps1`** - Script PowerShell avanzado
- **💻 `copy-to-display.ps1`** - Copiar con PowerShell

### **🚀 Comandos NPM Disponibles:**

```bash
npm run video:optimize      # Optimización con Node.js
npm run video:setup         # Setup completo
npm run video:copy          # Copiar a display
npm run video:optimize-simple # Optimización simple
```

### **📖 Documentación de Scripts:**

- [Guía Completa de Scripts](./scripts/README.md)

## 🚀 Deploy en Vercel

### Opción 1: Deploy Automático (Recomendado)

1. **Conecta tu repositorio a Vercel:**

   ```bash
   # Instala Vercel CLI
   npm i -g vercel

   # Login en Vercel
   vercel login

   # Deploy
   vercel
   ```

2. **O conecta desde GitHub:**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub
   - Importa el repositorio
   - Configura las variables de entorno

### Opción 2: Deploy Manual

1. **Prepara el repositorio:**

   ```bash
   # Asegúrate de tener todos los cambios committeados
   git add .
   git commit -m "Ready for deploy"
   ```

2. **Sube a GitHub:**

   ```bash
   # Crea un repositorio en GitHub y conecta
   git remote add origin https://github.com/tu-usuario/weplayer-landing.git
   git push -u origin main
   ```

3. **Deploy en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa el repositorio desde GitHub
   - Vercel detectará automáticamente que es Next.js

## ⚙️ Configuración de Variables de Entorno

### En Vercel Dashboard:

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# EmailJS (opcional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_weplayer_landing
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_weplayer_contact
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
```

### Localmente:

Crea un archivo `.env.local`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📦 Instalación Local

```bash
# Clona el repositorio
git clone https://github.com/tu-usuario/weplayer-landing.git
cd weplayer-landing

# Instala dependencias
npm install

# Configura variables de entorno
cp .env.example .env.local
# Edita .env.local con tus valores

# Ejecuta en desarrollo
npm run dev

# Build para producción
npm run build
```

## 🎯 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting
```

## 📊 Analytics Setup

Ver [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) para configuración detallada de Google Analytics.

## 🎨 Personalización

### Colores

Los colores están definidos en `tailwind.config.js` y `globals.css`:

```css
--weplayer-red: #ED4E4E
--weplayer-blue: #1498D5
--weplayer-yellow: #FFD700
```

### Contenido

- **Hero Section**: `src/app/page.tsx` líneas 150-200
- **Características**: `src/app/page.tsx` líneas 250-300
- **Formulario**: `src/app/page.tsx` líneas 500-600

## 🔧 Estructura del Proyecto

```
weplayer-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout principal
│   │   ├── page.tsx        # Página principal
│   │   └── globals.css     # Estilos globales
│   ├── components/
│   │   ├── Analytics.tsx   # Componente de analytics
│   │   └── WeplayerLogo.tsx # Logo SVG
│   └── config/
│       └── emailjs.ts      # Configuración EmailJS
├── public/
│   ├── images/             # Imágenes y logos
│   └── videos/             # Videos demo
├── vercel.json             # Configuración Vercel
└── package.json
```

## 🚀 URLs de Deploy

Una vez deployado, tendrás:

- **URL de producción**: `https://weplayer-landing.vercel.app`
- **URL de preview**: `https://weplayer-landing-git-main.vercel.app`

## 📈 Métricas de Performance

- **Lighthouse Score**: 95+ en todas las categorías
- **Core Web Vitals**: Optimizados
- **SEO Score**: 100/100
- **Accessibility**: 95+

## 🔒 Seguridad

- Headers de seguridad configurados
- CSP (Content Security Policy)
- HTTPS forzado
- Protección XSS

## 📞 Soporte

Para soporte técnico o preguntas:

- **Email**: ingenieria@wetechar.com
- **Documentación**: [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md)

---

**Desarrollado por We Tech** 🚀
