# 🚀 We Tech - Landing Page 2026

Landing page moderna para We Tech, empresa de integración audiovisual.

## 🛠️ Tecnologías

- **Next.js 15** - Framework React con App Router
- **React 19** + **TypeScript**
- **Tailwind CSS v4** - Estilos
- **Framer Motion** - Animaciones
- **Resend** - Servicio de envío de emails

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 🚀 Instalación y Ejecución

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (basado en `.env.example`):

```env
# Resend API Configuration (Requerido para formulario de contacto)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINATARIO=ingenieria@wetechar.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Obtén tu API key de Resend:**
1. Crea una cuenta en [resend.com](https://resend.com/)
2. Ve a **API Keys** en el dashboard
3. Crea una nueva API key y cópiala en `.env`

### 3. Ejecutar el Proyecto

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo de Next.js en `http://localhost:3000`.

## 📧 Configuración de Email (Resend)

El formulario de contacto utiliza **Resend** para enviar emails de forma segura. 

📖 **Ver documentación completa:** [`docs/RESEND_SETUP.md`](docs/RESEND_SETUP.md)

🔄 **¿Quieres usar este componente en otros proyectos?**  
📘 **Guía de reutilización:** [`docs/RESEND_COMPONENT_GUIDE.md`](docs/RESEND_COMPONENT_GUIDE.md)

### Características:
- ✅ 3,000 emails/mes gratis
- ✅ API key segura en el servidor (no expuesta al cliente)
- ✅ Plantillas HTML profesionales
- ✅ Tracking completo
- ✅ Componente reutilizable para otros proyectos

## 🏗️ Estructura del Proyecto

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Resend)
│   ├── layout.tsx         # Layout raíz
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ContactForm.tsx    # Formulario de contacto
│   ├── Hero.tsx           # Sección hero
│   └── ...
├── docs/                  # Documentación
│   └── README.md          # Índice de documentación
├── hooks/                 # Custom hooks
├── utils/                 # Utilidades
└── public/                # Archivos estáticos
```

## 📡 API Endpoints

### POST `/api/contact`
Envía un email de contacto usando Resend.

**Request:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+54 11 1234-5678",
  "company": "Empresa",
  "message": "Mensaje..."
}
```

📖 **Más información:** Ver [`docs/RESEND_SETUP.md`](docs/RESEND_SETUP.md)

## 🚀 Build para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## 📚 Documentación

Toda la documentación está organizada en la carpeta [`docs/`](docs/). 

📖 **Ver índice completo:** [`docs/README.md`](docs/README.md)

### Guías Principales
- [`docs/RESEND_SETUP.md`](docs/RESEND_SETUP.md) - Configuración de Resend para emails
- [`docs/RESEND_COMPONENT_GUIDE.md`](docs/RESEND_COMPONENT_GUIDE.md) - **Guía para reutilizar el componente en otros proyectos**
- [`docs/VERCEL_DEPLOY.md`](docs/VERCEL_DEPLOY.md) - Guía de despliegue en Vercel
- [`docs/VERCEL_BUILD_TROUBLESHOOTING.md`](docs/VERCEL_BUILD_TROUBLESHOOTING.md) - Solución de problemas de build

## 🔒 Seguridad

- ✅ API keys nunca expuestas al cliente
- ✅ Validación en servidor
- ✅ CORS configurado
- ✅ Variables de entorno para configuración sensible

---

**Desarrollado por We Tech** 🚀
