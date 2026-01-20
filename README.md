<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 We Tech - Landing Page 2026

Landing page moderna para We Tech, empresa de integración audiovisual.

## 🛠️ Tecnologías

- **React 19** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS v4** - Estilos
- **Framer Motion** - Animaciones
- **Resend** - Servicio de envío de emails
- **Express** - Servidor API

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

# Puerto del servidor API (opcional, por defecto 3001)
PORT=3001

# URL de la API para el frontend (opcional, por defecto http://localhost:3001)
VITE_API_URL=http://localhost:3001
```

**Obtén tu API key de Resend:**
1. Crea una cuenta en [resend.com](https://resend.com/)
2. Ve a **API Keys** en el dashboard
3. Crea una nueva API key y cópiala en `.env`

### 3. Ejecutar el Proyecto

**⚠️ Nota**: Los scripts de desarrollo verifican automáticamente que los puertos 3000 y 3001 estén libres antes de iniciar. Si están en uso, intentarán liberarlos automáticamente.

**Opción 1: Ejecutar todo junto (Recomendado para desarrollo)**
```bash
npm run dev:all
```

Esto iniciará:
- **Frontend**: `http://localhost:3000` (Vite)
- **API Server**: `http://localhost:3001` (Express)

**Opción 2: Ejecutar por separado**

En una terminal:
```bash
npm run dev        # Frontend solamente
```

En otra terminal:
```bash
npm run dev:server # Servidor API solamente
```

**Verificar/Liberar puertos manualmente:**
```bash
npm run check-ports    # Solo verificar
npm run kill-ports     # Verificar y liberar automáticamente
```

📖 **Más información**: Ver [`scripts/README.md`](scripts/README.md) para detalles sobre los scripts de verificación de puertos.

## 📧 Configuración de Email (Resend)

El formulario de contacto utiliza **Resend** para enviar emails de forma segura. 

📖 **Ver documentación completa:** [`docs/RESEND_SETUP.md`](docs/RESEND_SETUP.md)

### Características:
- ✅ 3,000 emails/mes gratis
- ✅ API key segura en el servidor (no expuesta al cliente)
- ✅ Plantillas HTML profesionales
- ✅ Tracking completo

## 🏗️ Estructura del Proyecto

```
├── api/
│   └── server.ts          # Servidor Express con API de Resend
├── components/            # Componentes React
│   ├── ContactForm.tsx    # Formulario de contacto
│   ├── Hero.tsx           # Sección hero
│   └── ...
├── docs/                  # Documentación
│   ├── RESEND_SETUP.md    # Guía de configuración de Resend
│   └── EMAIL_INTEGRATION_OPTIONS.md
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

### GET `/api/health`
Verifica el estado del servidor.

## 🚀 Build para Producción

```bash
npm run build
```

Los archivos se generarán en la carpeta `dist/`.

## 📚 Documentación Adicional

- [`docs/RESEND_SETUP.md`](docs/RESEND_SETUP.md) - Configuración detallada de Resend
- [`docs/EMAIL_INTEGRATION_OPTIONS.md`](docs/EMAIL_INTEGRATION_OPTIONS.md) - Opciones de integración de email

## 🔒 Seguridad

- ✅ API keys nunca expuestas al cliente
- ✅ Validación en servidor
- ✅ CORS configurado
- ✅ Variables de entorno para configuración sensible
