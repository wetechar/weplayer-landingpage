# Configuración de EmailJS para el Formulario de Contacto

## 📧 **Configuración de EmailJS**

### **1. Crear cuenta en EmailJS**

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Confirma tu email

### **2. Crear un Servicio de Email**

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Configura la autenticación según tu proveedor
5. Guarda el servicio con el nombre: `service_weplayer_landing`

### **3. Crear una Plantilla de Email**

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Usa el siguiente contenido:

**Asunto:**

```
Nuevo contacto desde Landing Page - {{from_name}}
```

**Contenido del Email:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Nuevo Contacto - We Player</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #1498D5;">Nuevo Contacto desde Landing Page</h2>

      <p>Hola {{to_name}},</p>

      <p>Has recibido un nuevo mensaje desde la Landing Page de We Player:</p>

      <div
        style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;"
      >
        <h3 style="margin-top: 0; color: #1498D5;">
          Información del Contacto:
        </h3>
        <p><strong>Nombre:</strong> {{from_name}}</p>
        <p><strong>Email:</strong> {{from_email}}</p>
        <p><strong>Mensaje:</strong></p>
        <div
          style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #1498D5;"
        >
          {{message}}
        </div>
      </div>

      <div
        style="background-color: #e9ecef; padding: 15px; border-radius: 5px; font-size: 14px;"
      >
        <p><strong>Fecha:</strong> {{fecha}}</p>
        <p><strong>Origen:</strong> {{origen}}</p>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #666;">
        Este email fue enviado automáticamente desde el formulario de contacto
        de la Landing Page de We Player.
      </p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

      <p style="text-align: center; font-size: 12px; color: #999;">
        Sistema We Player - We Tech
      </p>
    </div>
  </body>
</html>
```

4. Guarda la plantilla con el nombre: `template_weplayer_contact`

### **4. Obtener las Credenciales**

1. Ve a **"Account"** → **"API Keys"**
2. Copia tu **Public Key**
3. Anota tu **Service ID** y **Template ID**

### **5. Configurar las Variables de Entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_weplayer_landing
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_weplayer_contact
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

### **6. Probar el Formulario**

1. Ejecuta el proyecto: `npm run dev`
2. Ve a `http://localhost:3003`
3. Llena el formulario de contacto
4. Verifica que recibas el email en `ingenieria@wetechar.com`

## 🔧 **Solución de Problemas**

### **Error: "Service not found"**

- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo en EmailJS

### **Error: "Template not found"**

- Verifica que el Template ID sea correcto
- Asegúrate de que la plantilla esté publicada

### **Error: "Invalid API key"**

- Verifica que la Public Key sea correcta
- Asegúrate de que la clave esté activa

### **No se reciben emails**

- Verifica la configuración del servicio de email
- Revisa la carpeta de spam
- Confirma que el email de destino sea correcto

## 📋 **Datos que se Envían**

El formulario envía los siguientes datos:

```javascript
{
  to_name: 'Equipo de Ingeniería We Tech',
  from_name: 'Nombre del usuario',
  from_email: 'email@usuario.com',
  message: 'Mensaje del usuario',
  reply_to: 'email@usuario.com',
  subject: 'Nuevo contacto desde Landing Page - Nombre',
  fecha: '2025-01-27T...',
  origen: 'Landing Page We Player'
}
```

## 🎯 **Destinatario Final**

**Email de destino:** `ingenieria@wetechar.com`

El formulario está configurado para enviar todos los mensajes de contacto a este email, que es el email principal de la empresa We Tech.

## 📞 **Soporte**

Si tienes problemas con la configuración:

1. Revisa la documentación de EmailJS
2. Verifica las credenciales
3. Contacta al equipo de desarrollo
