# 📚 Documentación del Proyecto

Índice completo de toda la documentación disponible para este proyecto.

---

## 🚀 Guías de Inicio Rápido

### Configuración y Despliegue
- **[VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)** - Guía completa de despliegue en Vercel
- **[VERCEL_SETUP_GUIDE.md](./VERCEL_SETUP_GUIDE.md)** - Configuración inicial de Vercel
- **[VERCEL_BUILD_TROUBLESHOOTING.md](./VERCEL_BUILD_TROUBLESHOOTING.md)** - Solución de problemas de build en Vercel

### Configuración de Servicios
- **[RESEND_SETUP.md](./RESEND_SETUP.md)** - Configuración de Resend para emails (actualmente en uso)
- **[RESEND_COMPONENT_GUIDE.md](./RESEND_COMPONENT_GUIDE.md)** - Guía para reutilizar el componente de formulario con Resend
- **[EMAIL_INTEGRATION_OPTIONS.md](./EMAIL_INTEGRATION_OPTIONS.md)** - Comparación de opciones de integración de email

---

## 📧 Integración de Email

### Resend (Recomendado - Actualmente en Uso)
- **[RESEND_SETUP.md](./RESEND_SETUP.md)** - Configuración completa de Resend
- **[RESEND_COMPONENT_GUIDE.md](./RESEND_COMPONENT_GUIDE.md)** - Guía de reutilización del componente

### Otras Opciones (Referencia)
- **[EMAIL_INTEGRATION_OPTIONS.md](./EMAIL_INTEGRATION_OPTIONS.md)** - Comparación de servicios de email (Resend, SendGrid, EmailJS)

---

## 🔧 Configuración y Desarrollo

### GitHub
- **[GITHUB_CONFIGURATION.md](./GITHUB_CONFIGURATION.md)** - Configuración de GitHub y CI/CD
- **[GITHUB_CONNECTION_STATUS.md](./GITHUB_CONNECTION_STATUS.md)** - Estado de conexión con GitHub

### Instagram
- **[INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md)** - Configuración básica de Instagram API
- **[INSTAGRAM_API_SETUP.md](./INSTAGRAM_API_SETUP.md)** - Configuración avanzada de Instagram API

### Analíticas
- **[VERCEL_ANALYTICS_SETUP.md](./VERCEL_ANALYTICS_SETUP.md)** - Configuración de Vercel Analytics
- **[ANALYTICS_IMPLEMENTATION_SUMMARY.md](./ANALYTICS_IMPLEMENTATION_SUMMARY.md)** - Resumen de implementación de analíticas

### SEO
- **[SEO_IMPLEMENTATION.md](./SEO_IMPLEMENTATION.md)** - Implementación de SEO y meta tags

---

## 📊 Resúmenes y Reportes

### Implementaciones
- **[ANALYTICS_IMPLEMENTATION_SUMMARY.md](./ANALYTICS_IMPLEMENTATION_SUMMARY.md)** - Resumen de analíticas implementadas
- **[DEPLOY_SUCCESS_SUMMARY.md](./DEPLOY_SUCCESS_SUMMARY.md)** - Resumen de despliegue exitoso

### Organización
- **[CLEANUP_SUMMARY.md](./CLEANUP_SUMMARY.md)** - Resumen de limpieza del proyecto (migración Vite → Next.js)
- **[DOCUMENTATION_ORGANIZATION_SUMMARY.md](./DOCUMENTATION_ORGANIZATION_SUMMARY.md)** - Resumen de organización de documentación
- **[SCRIPTS_ORGANIZATION_SUMMARY.md](./SCRIPTS_ORGANIZATION_SUMMARY.md)** - Resumen de organización de scripts

---

## 🗂️ Estructura de Documentación

```
docs/
├── README.md                          # Este archivo (índice)
│
├── 🚀 Inicio Rápido
│   ├── VERCEL_DEPLOY.md
│   ├── VERCEL_SETUP_GUIDE.md
│   └── VERCEL_BUILD_TROUBLESHOOTING.md
│
├── 📧 Email
│   ├── RESEND_SETUP.md               # ⭐ Actualmente en uso
│   ├── RESEND_COMPONENT_GUIDE.md
│   └── EMAIL_INTEGRATION_OPTIONS.md
│
├── 🔧 Configuración
│   ├── GITHUB_CONFIGURATION.md
│   ├── GITHUB_CONNECTION_STATUS.md
│   ├── INSTAGRAM_SETUP.md
│   ├── INSTAGRAM_API_SETUP.md
│   ├── VERCEL_ANALYTICS_SETUP.md
│   └── SEO_IMPLEMENTATION.md
│
└── 📊 Resúmenes
    ├── ANALYTICS_IMPLEMENTATION_SUMMARY.md
    ├── DEPLOY_SUCCESS_SUMMARY.md
    ├── CLEANUP_SUMMARY.md
    ├── DOCUMENTATION_ORGANIZATION_SUMMARY.md
    └── SCRIPTS_ORGANIZATION_SUMMARY.md
```

---

## 🔍 Búsqueda Rápida

### Por Tema

**Email:**
- Resend: `RESEND_SETUP.md`, `RESEND_COMPONENT_GUIDE.md`
- Comparación: `EMAIL_INTEGRATION_OPTIONS.md`

**Despliegue:**
- Vercel: `VERCEL_DEPLOY.md`, `VERCEL_SETUP_GUIDE.md`
- Troubleshooting: `VERCEL_BUILD_TROUBLESHOOTING.md`

**Integraciones:**
- Instagram: `INSTAGRAM_SETUP.md`, `INSTAGRAM_API_SETUP.md`
- GitHub: `GITHUB_CONFIGURATION.md`
- Analíticas: `VERCEL_ANALYTICS_SETUP.md`

**SEO y Optimización:**
- SEO: `SEO_IMPLEMENTATION.md`
- Analíticas: `ANALYTICS_IMPLEMENTATION_SUMMARY.md`

---

## 📝 Notas Importantes

### ⚠️ Documentación Obsoleta Eliminada

Los siguientes archivos fueron eliminados por estar obsoletos:
- ❌ `EMAILJS_SETUP.md` - Reemplazado por Resend
- ❌ `SENDGRID_SETUP.md` - Reemplazado por Resend
- ❌ `CONTACT_FORM_SETUP.md` - Reemplazado por `RESEND_SETUP.md`

### ✅ Documentación Actual

- **Email:** Usa **Resend** (ver `RESEND_SETUP.md`)
- **Framework:** **Next.js 15** con App Router
- **Deploy:** **Vercel**

---

## 🆘 ¿Necesitas Ayuda?

1. **Configuración inicial:** Consulta `VERCEL_SETUP_GUIDE.md`
2. **Problemas de build:** Consulta `VERCEL_BUILD_TROUBLESHOOTING.md`
3. **Configurar email:** Consulta `RESEND_SETUP.md`
4. **Reutilizar componentes:** Consulta `RESEND_COMPONENT_GUIDE.md`

---

**Última actualización:** 20 de Enero, 2026
