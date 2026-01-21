# 📧 Configuración de Resend para Formulario de Contacto

## 🚀 Resend - Implementación Actual

Este proyecto utiliza **Resend** como servicio de envío de emails para el formulario de contacto, siguiendo las mejores prácticas de seguridad al mantener la API key en el servidor.

> 📖 **¿Quieres usar este componente en otros proyectos?**  
> Consulta la **[Guía Completa de Reutilización del Componente](./RESEND_COMPONENT_GUIDE.md)** para instrucciones detalladas sobre cómo implementar este formulario en otras páginas web o proyectos Next.js.

## 📋 Requisitos Previos

1. **Cuenta en Resend**: Crea una cuenta gratuita en [resend.com](https://resend.com/)
2. **API Key**: Obtén tu API key desde el dashboard de Resend

## ⚙️ Configuración

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (basado en `.env.example`):

```env
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email de destino (opcional, por defecto usa ingenieria@wetechar.com)
EMAIL_DESTINATARIO=ingenieria@wetechar.com

# Email remitente (opcional, por defecto usa onboarding@resend.dev)
# Para producción, usa un dominio verificado en Resend
RESEND_FROM_EMAIL=onboarding@resend.dev

# Puerto del servidor Express (opcional, por defecto 3001)
PORT=3001
```

### 2. Obtener API Key de Resend

1. Ve a [resend.com](https://resend.com/) y crea una cuenta
2. Navega a **API Keys** en el dashboard
3. Crea una nueva API key
4. Copia la clave (comienza con `re_`)
5. Pégala en tu archivo `.env` como `RESEND_API_KEY`

### 3. Configurar Dominio (Opcional para Producción)

Para producción, es recomendable verificar tu dominio:

1. Ve a **Domains** en el dashboard de Resend
2. Agrega tu dominio (ej: `wetechar.com`)
3. Configura los registros DNS según las instrucciones
4. Una vez verificado, actualiza `RESEND_FROM_EMAIL` en `.env` con tu dominio

## 🏃 Ejecutar el Proyecto

### Desarrollo

Para ejecutar tanto el frontend (Vite) como el servidor de la API:

```bash
npm run dev:all
```

Esto iniciará:
- **Frontend**: `http://localhost:3000` (Vite)
- **API Server**: `http://localhost:3001` (Express)

### Ejecutar por Separado

**Solo Frontend:**
```bash
npm run dev
```

**Solo Servidor API:**
```bash
npm run dev:server
```

**Servidor en Producción:**
```bash
npm run server
```

## 📡 Endpoints de la API

### POST `/api/contact`

Envía un email de contacto usando Resend.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+54 11 1234-5678",
  "company": "Empresa Ejemplo",
  "message": "Mensaje de contacto..."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Mensaje enviado exitosamente. Te contactaremos pronto.",
  "data": { ... }
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "error": "Mensaje de error descriptivo"
}
```

### GET `/api/health`

Verifica que el servidor esté funcionando correctamente.

**Response:**
```json
{
  "status": "ok",
  "message": "API de contacto funcionando correctamente"
}
```

## 🔧 Configuración del Frontend

El componente `ContactForm` está configurado para usar la API por defecto en `http://localhost:3001`. 

Para cambiar la URL de la API en producción, configura la variable de entorno:

```env
VITE_API_URL=https://tu-api.com
```

## 🚀 Despliegue

### Opción 1: Desplegar Servidor Separado

Puedes desplegar el servidor Express en servicios como:
- **Railway**: [railway.app](https://railway.app/)
- **Render**: [render.com](https://render.com/)
- **Fly.io**: [fly.io](https://fly.io/)
- **Heroku**: [heroku.com](https://www.heroku.com/)

Asegúrate de configurar las variables de entorno en la plataforma de despliegue.

### Opción 2: Usar Vercel/Netlify Functions

Puedes convertir el servidor Express en funciones serverless:

**Vercel:**
- Crear `api/contact.ts` como función serverless
- Configurar variables de entorno en Vercel

**Netlify:**
- Crear `netlify/functions/contact.ts`
- Configurar variables de entorno en Netlify

## 📊 Límites del Plan Gratuito

- ✅ **3,000 emails/mes** (100 emails/día)
- ✅ Sin límite de tiempo
- ✅ Tracking completo
- ✅ API moderna

## 🔒 Seguridad

- ✅ La API key de Resend **nunca** se expone al cliente
- ✅ Todas las validaciones se realizan en el servidor
- ✅ CORS configurado para permitir solo el frontend autorizado
- ✅ Validación de email en el servidor

## 🐛 Solución de Problemas

### Error: "RESEND_API_KEY no está configurada"

- Verifica que el archivo `.env` existe en la raíz del proyecto
- Asegúrate de que `RESEND_API_KEY` esté configurada correctamente
- Reinicia el servidor después de agregar/modificar variables de entorno

### Error: "Error al enviar el email"

- Verifica que tu API key sea válida
- Revisa los logs del servidor para más detalles
- Asegúrate de que el dominio remitente esté verificado (si usas uno personalizado)

### CORS Error

- Verifica que el frontend esté haciendo peticiones al puerto correcto (3001)
- Asegúrate de que `VITE_API_URL` esté configurada correctamente en producción

## 📚 Recursos Adicionales

- [Documentación de Resend](https://resend.com/docs)
- [API Reference](https://resend.com/docs/api-reference/emails/send-email)
- [Dashboard de Resend](https://resend.com/emails)
