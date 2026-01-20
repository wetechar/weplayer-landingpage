# Configuración de EmailJS para el Formulario de Contacto

## 📧 ¿Qué es EmailJS?

EmailJS permite enviar correos electrónicos directamente desde el frontend sin necesidad de un servidor backend. Es gratuito hasta 200 emails/mes.

## 🚀 Configuración Rápida

### Paso 1: Crear cuenta en EmailJS

1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Crear un Servicio de Email

1. En el dashboard, ve a **Email Services**
2. Click en **Add New Service**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Conecta tu cuenta de email
5. Copia el **Service ID** (ej: `service_xxxxx`)

### Paso 3: Crear una Plantilla de Email

1. Ve a **Email Templates**
2. Click en **Create New Template**
3. Configura la plantilla con estos campos:

**Subject:**
```
Contacto desde Web - {{from_name}}
```

**Content:**
```
Nuevo mensaje de contacto desde la web:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
Empresa: {{company}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de wetechar.com.ar
```

4. En **To Email**, ingresa: `ingenieria@wetechar.com`
5. En **From Name**, usa: `{{from_name}}`
6. En **Reply To**, usa: `{{from_email}}`
7. Guarda y copia el **Template ID** (ej: `template_xxxxx`)

### Paso 4: Obtener Public Key

1. Ve a **Account** → **General**
2. Copia tu **Public Key** (ej: `xxxxxxxxxxxxx`)

### Paso 5: Configurar Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto (si no existe)
2. Agrega estas variables:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

3. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## ✅ Verificación

Una vez configurado, el formulario enviará correos automáticamente a `ingenieria@wetechar.com`.

## 🔄 Modo Fallback

Si no configuras EmailJS, el formulario usará automáticamente `mailto:` como fallback, abriendo el cliente de correo del usuario.

## 📝 Notas Importantes

- **Límite gratuito**: 200 emails/mes
- **Seguridad**: El Public Key es seguro de exponer en el frontend
- **Spam**: EmailJS tiene protección anti-spam integrada
- **Privacidad**: Los datos se envían directamente a tu email, no se almacenan en EmailJS

## 🐛 Solución de Problemas

### Error: "Service ID is required"
- Verifica que `VITE_EMAILJS_SERVICE_ID` esté configurado en `.env`
- Reinicia el servidor después de agregar variables de entorno

### Error: "Template ID is required"
- Verifica que `VITE_EMAILJS_TEMPLATE_ID` esté configurado
- Asegúrate de que la plantilla esté publicada en EmailJS

### Los correos no llegan
- Verifica que el servicio de email esté conectado correctamente
- Revisa la carpeta de spam
- Verifica que el "To Email" en la plantilla sea `ingenieria@wetechar.com`

## 🔗 Recursos

- [Documentación de EmailJS](https://www.emailjs.com/docs/)
- [Guía de Integración React](https://www.emailjs.com/docs/examples/reactjs/)
