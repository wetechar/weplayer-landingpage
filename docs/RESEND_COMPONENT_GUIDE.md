# 📧 Guía de Uso del Componente de Formulario con Resend

## 🎯 Descripción

Esta guía explica cómo usar el componente de formulario de contacto con Resend que funciona perfectamente en este proyecto, para implementarlo en otras páginas web o proyectos Next.js.

## 📦 Componentes Incluidos

El sistema de formulario consta de dos partes principales:

1. **Componente Frontend** (`components/ContactForm.tsx`) - Formulario React con validación
2. **API Route Backend** (`app/api/contact/route.ts`) - Endpoint Next.js que maneja el envío con Resend

---

## 🚀 Instalación Rápida

### Paso 1: Instalar Dependencias

```bash
npm install resend framer-motion lucide-react
```

O si usas TypeScript:

```bash
npm install resend framer-motion lucide-react
npm install -D @types/react @types/react-dom
```

### Paso 2: Copiar los Archivos

**1. Copiar el componente del formulario:**

Copia `components/ContactForm.tsx` a tu proyecto. Este componente incluye:
- ✅ Validación completa de formularios
- ✅ Manejo de estados (loading, success, error)
- ✅ Animaciones con Framer Motion
- ✅ Diseño responsive y moderno
- ✅ Integración con la API de Resend

**2. Copiar la API Route:**

Copia `app/api/contact/route.ts` a `app/api/contact/route.ts` en tu proyecto Next.js.

---

## ⚙️ Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz de tu proyecto:

```env
# Resend API Key (OBLIGATORIO)
# Obtén tu API key desde: https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email destinatario (opcional, por defecto: ingenieria@wetechar.com)
EMAIL_DESTINATARIO=tu-email@ejemplo.com

# Email remitente (opcional, por defecto: onboarding@resend.dev)
# Para producción, usa un dominio verificado en Resend
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 2. Obtener API Key de Resend

1. Ve a [resend.com](https://resend.com/) y crea una cuenta gratuita
2. Navega a **API Keys** en el dashboard
3. Crea una nueva API key
4. Copia la clave (comienza con `re_`)
5. Pégala en tu archivo `.env.local` como `RESEND_API_KEY`

### 3. Configurar Dominio (Opcional para Producción)

Para producción, es recomendable verificar tu dominio:

1. Ve a **Domains** en el dashboard de Resend
2. Agrega tu dominio (ej: `tudominio.com`)
3. Configura los registros DNS según las instrucciones
4. Una vez verificado, actualiza `RESEND_FROM_EMAIL` en `.env.local` con tu dominio

---

## 💻 Uso del Componente

### Uso Básico en Next.js

```tsx
// app/page.tsx o cualquier página
import ContactForm from '@/components/ContactForm';

export default function HomePage() {
  return (
    <div>
      <h1>Mi Página</h1>
      <ContactForm />
    </div>
  );
}
```

### Uso en Componente con Layout Personalizado

```tsx
// app/contact/page.tsx
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Contáctanos
        </h1>
        <ContactForm />
      </div>
    </div>
  );
}
```

### Uso en Página con Secciones

```tsx
// app/page.tsx
import ContactForm from '@/components/ContactForm';

export default function LandingPage() {
  return (
    <>
      <section id="hero">
        {/* Tu contenido hero */}
      </section>
      
      <section id="services">
        {/* Tu contenido de servicios */}
      </section>
      
      <section id="contact">
        <ContactForm />
      </section>
    </>
  );
}
```

---

## 🎨 Personalización del Componente

### Cambiar Estilos

El componente usa clases de Tailwind CSS. Puedes personalizar los colores modificando las clases en `ContactForm.tsx`:

```tsx
// Busca y reemplaza estas clases según tu diseño:
// bg-brand-primary → tu-color-primario
// text-brand-primary → tu-color-texto-primario
// bg-brand-accent → tu-color-secundario
```

### Cambiar Campos del Formulario

Para agregar o quitar campos, edita el componente `ContactForm.tsx`:

```tsx
// 1. Actualiza la interfaz FormData
interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  // Agrega nuevos campos aquí
  subject?: string;
}

// 2. Agrega el campo en el estado inicial
const [formData, setFormData] = useState<FormData>({
  // ... campos existentes
  subject: '',
});

// 3. Agrega el input en el JSX
<input
  type="text"
  name="subject"
  value={formData.subject}
  onChange={handleChange}
  placeholder="Asunto"
/>

// 4. Actualiza el body del fetch para incluir el nuevo campo
body: JSON.stringify({
  // ... campos existentes
  subject: formData.subject,
});
```

### Cambiar Mensajes de Validación

Edita la función `validateForm()` en `ContactForm.tsx`:

```tsx
const validateForm = (): boolean => {
  const newErrors: FormErrors = {};
  
  // Personaliza los mensajes de error aquí
  if (!formData.name.trim()) {
    newErrors.name = 'Tu mensaje personalizado';
  }
  
  // ... más validaciones
};
```

---

## 🔧 Personalización de la API Route

### Cambiar el Email Destinatario

Edita `app/api/contact/route.ts`:

```typescript
// Opción 1: Usar variable de entorno (recomendado)
const toEmail = process.env.EMAIL_DESTINATARIO || 'default@ejemplo.com';

// Opción 2: Email fijo
const toEmail = 'contacto@tudominio.com';
```

### Cambiar el Template del Email

Edita la sección `html` en `app/api/contact/route.ts`:

```typescript
html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2>Nuevo Contacto</h2>
    <p><strong>Nombre:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <!-- Personaliza el HTML aquí -->
  </div>
`,
```

### Agregar Campos Adicionales

1. Actualiza el destructuring en la API route:

```typescript
const { name, email, phone, company, message, subject } = body;
```

2. Incluye el nuevo campo en el template HTML:

```typescript
${subject ? `<p><strong>Asunto:</strong> ${subject}</p>` : ''}
```

---

## 📡 Estructura de la API

### Endpoint: `POST /api/contact`

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
  "data": {
    "id": "email-id-from-resend"
  }
}
```

**Response Error (400):**
```json
{
  "success": false,
  "error": "Los campos nombre, email y mensaje son requeridos"
}
```

**Response Error (500):**
```json
{
  "success": false,
  "error": "Error al enviar el email. Por favor intenta nuevamente."
}
```

---

## 🌐 Uso en Otros Frameworks

### React (sin Next.js)

Si usas React puro (Create React App, Vite, etc.), necesitas crear un backend separado:

**Opción 1: Usar Express.js**

Crea un servidor Express con el mismo código de la API route:

```javascript
// server.js
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  // Copia el código de app/api/contact/route.ts aquí
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

Luego actualiza el componente para usar la URL completa:

```typescript
const response = await fetch('http://localhost:3001/api/contact', {
  // ... resto del código
});
```

**Opción 2: Usar Vercel Serverless Functions**

Si despliegas en Vercel, crea `api/contact.ts`:

```typescript
import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Copia el código de app/api/contact/route.ts aquí
  // Adaptando NextRequest/NextResponse a VercelRequest/VercelResponse
}
```

---

## ✅ Características del Componente

### Validación Completa
- ✅ Validación de campos requeridos
- ✅ Validación de formato de email
- ✅ Validación de longitud mínima de mensaje
- ✅ Mensajes de error claros y específicos

### UX/UI
- ✅ Estados de carga (loading)
- ✅ Mensaje de éxito animado
- ✅ Manejo de errores con mensajes claros
- ✅ Diseño responsive (móvil y desktop)
- ✅ Animaciones suaves con Framer Motion
- ✅ Iconos descriptivos con Lucide React

### Seguridad
- ✅ Validación en el servidor
- ✅ API key nunca expuesta al cliente
- ✅ Sanitización de datos
- ✅ Protección contra spam básica

---

## 🐛 Solución de Problemas

### Error: "Cannot find module 'resend'"

```bash
npm install resend
```

### Error: "RESEND_API_KEY no está configurada"

1. Verifica que el archivo `.env.local` existe en la raíz del proyecto
2. Asegúrate de que `RESEND_API_KEY` esté configurada correctamente
3. Reinicia el servidor de desarrollo (`npm run dev`)

### Error: "Error al enviar el email"

1. Verifica que tu API key sea válida en [Resend Dashboard](https://resend.com/emails)
2. Revisa los logs del servidor para más detalles
3. Asegúrate de que el dominio remitente esté verificado (si usas uno personalizado)

### El formulario no se envía

1. Verifica que la ruta `/api/contact` existe en tu proyecto
2. Abre las herramientas de desarrollador (F12) y revisa la consola
3. Verifica que no haya errores de CORS
4. Asegúrate de que el servidor esté corriendo

### Campos no se validan correctamente

1. Verifica que los nombres de los campos en el formulario coincidan con los nombres en `formData`
2. Revisa la función `validateForm()` para asegurarte de que las validaciones sean correctas

---

## 📊 Límites del Plan Gratuito de Resend

- ✅ **3,000 emails/mes** (100 emails/día)
- ✅ Sin límite de tiempo
- ✅ Tracking completo
- ✅ API moderna y rápida
- ✅ Dashboard con métricas

Para más información, visita: [Resend Pricing](https://resend.com/pricing)

---

## 📚 Recursos Adicionales

- [Documentación de Resend](https://resend.com/docs)
- [API Reference de Resend](https://resend.com/docs/api-reference/emails/send-email)
- [Dashboard de Resend](https://resend.com/emails)
- [Documentación de Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

---

## 📝 Ejemplo Completo de Implementación

### Estructura de Archivos

```
tu-proyecto/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API Route de Resend
│   └── page.tsx                  # Tu página principal
├── components/
│   └── ContactForm.tsx          # Componente del formulario
├── .env.local                    # Variables de entorno
└── package.json
```

### Código Mínimo Funcional

**1. `app/api/contact/route.ts`** (ya incluido, solo copiar)

**2. `components/ContactForm.tsx`** (ya incluido, solo copiar)

**3. `app/page.tsx`**
```tsx
import ContactForm from '@/components/ContactForm';

export default function Home() {
  return (
    <main>
      <h1>Mi Sitio Web</h1>
      <ContactForm />
    </main>
  );
}
```

**4. `.env.local`**
```env
RESEND_API_KEY=re_tu_api_key_aqui
EMAIL_DESTINATARIO=tu-email@ejemplo.com
```

**5. `package.json`** (dependencias mínimas)
```json
{
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "resend": "^6.8.0",
    "framer-motion": "^12.27.1",
    "lucide-react": "^0.562.0"
  }
}
```

---

## 🎉 ¡Listo!

Con estos pasos, tendrás un formulario de contacto completamente funcional con Resend que puedes usar en cualquier proyecto Next.js o adaptar a otros frameworks.

Si tienes preguntas o necesitas ayuda, revisa la documentación oficial de Resend o los recursos adicionales mencionados arriba.
