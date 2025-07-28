# We Player - Landing Page

Landing page promocional profesional para We Player, la solución completa de cartelería digital.

## 🚀 Características

- **Diseño Moderno**: Interfaz atractiva con animaciones suaves
- **Responsive**: Optimizada para móviles, tablets y desktop
- **SEO Optimizado**: Metadatos completos para mejor posicionamiento
- **Performance**: Carga rápida y optimizada
- **Accesibilidad**: Cumple estándares de accesibilidad web

## 🎨 Tecnologías Utilizadas

- **Next.js 14**: Framework React moderno
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework CSS utility-first
- **Framer Motion**: Animaciones fluidas y profesionales
- **Lucide React**: Iconografía moderna

## 📁 Estructura del Proyecto

```
weplayer-landing/
├── public/
│   ├── images/
│   │   ├── logos/
│   │   │   └── WeplayerLogo.svg
│   │   └── screenshots/
│   │       └── [capturas de pantalla]
│   └── videos/
│       └── Demo-App-Weplayer.mp4
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       └── WeplayerLogo.tsx
├── tailwind.config.ts
└── package.json
```

## 🎯 Secciones de la Landing Page

### 1. **Header**

- Logo We Player
- Navegación principal
- Diseño limpio y profesional

### 2. **Hero Section**

- Título impactante
- Descripción del producto
- Call-to-action principal
- Imagen del dashboard

### 3. **Características Principales**

- Gestión de dispositivos
- Programación inteligente
- Gestión de contenido
- Playlists dinámicas
- Organización por grupos
- Sincronización en tiempo real

### 4. **Demo Video**

- Video de demostración
- Controles de reproducción
- Diseño atractivo

### 5. **Casos de Uso**

- Centros comerciales
- Restaurantes y bares
- Oficinas corporativas
- Espacios públicos

### 6. **Contacto**

- Información de la empresa
- Formulario de contacto
- Datos del desarrollador

### 7. **Footer**

- Logo y descripción
- Información de contacto
- Copyright

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Entrar al directorio
cd weplayer-landing

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## 🎨 Personalización

### Colores

Los colores están definidos en `tailwind.config.ts`:

- **Rojo principal**: `#ED4E4E`
- **Azul**: `#1498D5`
- **Amarillo**: `#FFD700`

### Contenido

- Editar `src/app/page.tsx` para modificar el contenido
- Actualizar imágenes en `public/images/`
- Cambiar video en `public/videos/`

### SEO

- Modificar metadatos en `src/app/layout.tsx`
- Actualizar Open Graph y Twitter Cards
- Configurar Google Analytics

## 📱 Responsive Design

La landing page está optimizada para:

- **Móviles**: 320px - 768px
- **Tablets**: 768px - 1024px
- **Desktop**: 1024px+

## ⚡ Performance

- **Lazy Loading**: Imágenes y videos optimizados
- **Code Splitting**: Carga automática de componentes
- **Optimización de imágenes**: Next.js Image optimization
- **Minificación**: CSS y JS optimizados

## 🔧 Configuración de Producción

### Variables de Entorno

```env
NEXT_PUBLIC_SITE_URL=https://weplayer.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Deploy

```bash
# Vercel (recomendado)
vercel --prod

# Netlify
netlify deploy --prod

# Servidor propio
npm run build
npm start
```

## 📊 Analytics y Tracking

### Google Analytics

```javascript
// Agregar en _app.tsx o layout.tsx
import Script from 'next/script';

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
  strategy='afterInteractive'
/>;
```

### Eventos Personalizados

```javascript
// Tracking de formularios y CTAs
gtag('event', 'form_submit', {
  event_category: 'engagement',
  event_label: 'contact_form',
});
```

## 🛠️ Mantenimiento

### Actualizaciones

```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit

# Ejecutar tests
npm test
```

### Backup

- Hacer backup regular del contenido
- Versionar cambios importantes
- Documentar modificaciones

## 📞 Soporte

**Empresa**: Wetechar  
**Email**: ingenieria@wetechar.com  
**Teléfono**: +54 9 11 5823-0996  
**Dirección**: Olleros 3916, CABA, Argentina

**Desarrollador**: Juan Manuel Burdet  
**Email**: tecnopulsar@gmail.com

## 📄 Licencia

© 2025 We Player. Todos los derechos reservados.

---

**We Player** - La solución más avanzada para cartelería digital profesional.
