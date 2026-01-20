# 📧 Opciones de Integración de Email para Formularios de Contacto

## 🎯 Propósito

Esta documentación describe las opciones disponibles para implementar el envío de emails desde formularios de contacto en landing pages. Útil como referencia para cualquier proyecto que requiera funcionalidad de formularios.

## 🚀 Soluciones Disponibles

### 1. 📧 Resend (RECOMENDADO - Actualmente Implementado)

**Ventajas:**

- ✅ **3,000 emails/mes gratis** (100 emails/día)
- ✅ Configuración rápida y simple
- ✅ API moderna y fácil de usar
- ✅ Plantillas HTML profesionales
- ✅ Tracking completo de emails
- ✅ Excelente documentación
- ✅ Integración nativa con Next.js/Vercel
- ✅ Sin verificación de dominio inicial (usa dominio de prueba)

**Desventajas:**

- ⚠️ Requiere servidor (API route)
- ⚠️ Plan gratuito limitado a 1 dominio por equipo

**Pasos:**

1. Crear cuenta en [Resend](https://resend.com/)
2. Obtener API key desde el dashboard
3. Configurar variable de entorno `RESEND_API_KEY`
4. Integrar en API route de Next.js

**Ideal para:** Proyectos con Next.js/Vercel que necesitan envío confiable de emails.

### 2. 📧 EmailJS (Cliente-Side, Sin Servidor)

**Ventajas:**

- ✅ Configuración rápida
- ✅ **No requiere servidor** (funciona desde el cliente)
- ✅ Gratis hasta 200 emails/mes
- ✅ Plantillas personalizables
- ✅ Ideal para sitios estáticos

**Desventajas:**

- ⚠️ Límite muy bajo en plan gratuito (200/mes)
- ⚠️ Credenciales expuestas en el cliente (aunque son públicas)
- ⚠️ Menos control sobre el proceso de envío

**Pasos:**

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Configurar servicio de email (Gmail, Outlook, etc.)
3. Crear plantilla de email
4. Obtener credenciales (Service ID, Template ID, Public Key)
5. Integrar en el código del cliente

**Ideal para:** Sitios estáticos o proyectos sin backend.

### 3. 📧 SendGrid (Para Mayor Volumen - Plan de Pago)

**⚠️ IMPORTANTE:** SendGrid **eliminó su plan gratuito** en mayo 2025. Ahora solo ofrece planes de pago.

**Ventajas:**

- ✅ API robusta y confiable
- ✅ Analytics detallados
- ✅ Plantillas profesionales
- ✅ Escalable para alto volumen
- ✅ Soporte empresarial

**Desventajas:**

- ❌ **Sin plan gratuito** (desde julio 2025)
- ⚠️ Plan más económico: ~$19.95/mes (Essentials)
- ⚠️ Requiere verificación de dominio para producción

**Pasos:**

1. Crear cuenta en [SendGrid](https://sendgrid.com/)
2. Verificar dominio (recomendado)
3. Obtener API key
4. Integrar en el código

**Ideal para:** Proyectos empresariales con alto volumen de emails.

### 4. 📧 Formspree (Sin Configuración de Servidor)

**Ventajas:**

- ✅ Sin configuración de servidor
- ✅ Solo cambiar el endpoint
- ✅ Dashboard para ver mensajes
- ✅ Spam protection integrado
- ✅ Gratis hasta 50 submissions/mes

**Desventajas:**

- ⚠️ Límite muy bajo en plan gratuito (50/mes)
- ⚠️ Menos control sobre el formato de emails
- ⚠️ Dependencia de servicio externo

**Pasos:**

1. Crear cuenta en [Formspree](https://formspree.io/)
2. Obtener endpoint único
3. Cambiar URL en el formulario

**Ideal para:** Sitios estáticos con bajo volumen de formularios.

### 5. 📧 Netlify Forms (Solo para Netlify)

**Ventajas:**

- ✅ Integrado con Netlify
- ✅ Fácil configuración
- ✅ Spam protection
- ✅ Gratis hasta 100 submissions/mes

**Desventajas:**

- ❌ Solo funciona con Netlify
- ⚠️ Límite bajo en plan gratuito

**Ideal para:** Proyectos desplegados en Netlify.

## 🛠️ Implementación Rápida

### Opción A: Resend (Recomendada - Actualmente Implementada)

```typescript
// 1. Instalar dependencia
npm install resend

// 2. Configurar en src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, mensaje } = body;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    // Enviar email con Resend
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Usar dominio verificado en producción
      to: process.env.EMAIL_DESTINATARIO || 'tu-email@ejemplo.com',
      subject: `Nuevo contacto desde Landing Page - ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            📧 Nuevo Mensaje de Contacto
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Información del Contacto</h3>
            
            <p><strong>👤 Nombre:</strong> ${nombre}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>💬 Mensaje:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
              ${mensaje.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 14px; color: #64748b;">
            <p><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-AR')}</p>
            <p><strong>🔗 Origen:</strong> Landing Page</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Mensaje enviado exitosamente. Te contactaremos pronto.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error en API de contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
```

### Opción B: EmailJS (Cliente-Side)

```typescript
// 1. Instalar dependencia
npm install @emailjs/browser

// 2. Configurar en componente del formulario
import emailjs from '@emailjs/browser';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        from_name: formData.nombre,
        from_email: formData.email,
        message: formData.mensaje,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
    
    console.log('Email enviado:', result);
  } catch (error) {
    console.error('Error al enviar email:', error);
  }
};
```

### Opción C: Formspree (Más Rápida - Sin Servidor)

```typescript
// Solo cambiar la URL en handleSubmit del formulario
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('https://formspree.io/f/TU_FORM_ID', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      mensaje: formData.mensaje.trim(),
    }),
  });

  const result = await response.json();
  
  if (response.ok) {
    console.log('Formulario enviado exitosamente');
  }
};
```

## 🔧 Variables de Entorno Necesarias

### Para Resend (Recomendado):

```bash
# .env.local o variables en Vercel
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINATARIO=tu-email@ejemplo.com
```

### Para EmailJS:

```bash
# Variables públicas (pueden estar en el cliente)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=tu_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=tu_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key
```

### Para SendGrid:

```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=tu@email.com
```

### Para Formspree:

No requiere variables de entorno, solo el endpoint único del formulario.

## 📊 Comparación de Costos y Características (2025)

| Servicio  | Plan Gratuito              | Plan de Pago Inicial | Características Clave                    |
| --------- | -------------------------- | -------------------- | ----------------------------------------- |
| **Resend** | **3,000 emails/mes** (100/día) | $20/mes (50K emails) | ✅ API moderna, tracking completo        |
| EmailJS   | 200 emails/mes             | $9/mes (2K emails)   | ✅ Cliente-side, sin servidor            |
| SendGrid  | ❌ **Sin plan gratuito**   | $19.95/mes (50K)     | ✅ Escalable, enterprise                  |
| Formspree | 50 submissions/mes         | $10/mes (1K)         | ✅ Sin configuración                     |
| Netlify   | 100 submissions/mes        | $19/mes              | ✅ Solo para Netlify                     |

### 📈 Límites del Plan Gratuito:

- **Resend**: 3,000 emails/mes, 100/día, 1 dominio
- **EmailJS**: 200 emails/mes, 2 plantillas
- **SendGrid**: ❌ No disponible (eliminado en mayo 2025)
- **Formspree**: 50 submissions/mes, 2 emails de destino
- **Netlify**: 100 submissions/mes (solo con Netlify)

## 🎯 Recomendaciones por Caso de Uso

### **Para empezar rápido (sin servidor):**
- **Formspree** - Solo cambiar endpoint, sin configuración
- **EmailJS** - Si necesitas más control sobre plantillas

### **Para solución completa (con servidor):**
- **Resend** ⭐ - Mejor relación precio/rendimiento, fácil integración
- **SendGrid** - Si necesitas escalabilidad empresarial (requiere pago)

### **Para escala empresarial:**
- **SendGrid** - Planes empresariales con soporte dedicado
- **Resend** - Opción moderna y competitiva

### **Para sitios estáticos:**
- **Formspree** - La opción más simple
- **EmailJS** - Si necesitas personalización de plantillas
- **Netlify Forms** - Si estás en Netlify

## 📝 Notas Importantes

### ⚠️ SendGrid - Cambio Importante
SendGrid **eliminó su plan gratuito** en mayo 2025. Los usuarios con cuentas gratuitas tuvieron un período de gracia hasta julio 2025, pero ahora solo ofrecen planes de pago. Considera esto al elegir un servicio.

### ✅ Resend - Recomendación Actual
Resend es la opción recomendada para proyectos con Next.js/Vercel porque:
- Plan gratuito generoso (3,000 emails/mes)
- API moderna y fácil de usar
- Excelente integración con Vercel
- Tracking completo incluido
- Documentación excelente

### 🔒 Seguridad
- **Resend/SendGrid**: Las API keys deben estar en variables de entorno del servidor
- **EmailJS**: Las keys públicas pueden estar en el cliente (están diseñadas para eso)
- **Formspree**: No requiere keys, solo el endpoint único

## 🚀 Pasos para Implementar en Nueva Landing Page

1. **Elegir servicio** según necesidades (recomendado: Resend)
2. **Crear cuenta** en el servicio elegido
3. **Obtener credenciales** (API key, endpoint, etc.)
4. **Configurar variables de entorno** en Vercel/local
5. **Crear API route** (`/api/contact/route.ts`) o integrar en cliente
6. **Implementar formulario** con validación
7. **Probar envío** de emails
8. **Configurar dominio** (opcional, para producción)

## 📚 Documentación Adicional

- [Resend Docs](https://resend.com/docs)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [SendGrid Docs](https://docs.sendgrid.com/)
- [Formspree Docs](https://help.formspree.io/)

---

**Última actualización:** Enero 2025  
**Estado:** Documentación actualizada y lista para usar como referencia
