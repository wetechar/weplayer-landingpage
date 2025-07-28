// Configuración de EmailJS
// Para configurar EmailJS:
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta gratuita
// 3. Crea un nuevo servicio (Gmail, Outlook, etc.)
// 4. Crea una nueva plantilla de email
// 5. Obtén las credenciales y reemplázalas aquí

export const EMAILJS_CONFIG = {
  SERVICE_ID:
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_weplayer_landing',
  TEMPLATE_ID:
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_weplayer_contact',
  PUBLIC_KEY:
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY',
};

// Plantilla sugerida para EmailJS:
/*
Asunto: Nuevo contacto desde Landing Page - {{from_name}}

Hola {{to_name}},

Has recibido un nuevo mensaje desde la Landing Page de We Player:

Nombre: {{from_name}}
Email: {{from_email}}
Mensaje: {{message}}

Fecha: {{fecha}}
Origen: {{origen}}

Este email fue enviado automáticamente desde el formulario de contacto de la Landing Page.

Saludos,
Sistema We Player
*/
