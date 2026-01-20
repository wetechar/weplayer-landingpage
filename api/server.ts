import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// Cargar variables de entorno
// Cargar primero .env, luego .env.local (tiene mayor prioridad y sobrescribe .env)
dotenv.config(); // Carga .env por defecto
dotenv.config({ path: '.env.local', override: true }); // .env.local sobrescribe .env si existe

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Ruta para enviar emails
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Los campos nombre, email y mensaje son requeridos',
      });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido',
      });
    }

    // Si Resend no está configurado, retornar error
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        success: false,
        error: 'Servicio de email no configurado. Por favor configure RESEND_API_KEY en las variables de entorno.',
      });
    }

    // Email de destino (puede ser configurado en .env o usar el por defecto)
    const toEmail = process.env.EMAIL_DESTINATARIO || 'ingenieria@wetechar.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    // Enviar email con Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `Nuevo contacto desde Landing Page - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0891b2; border-bottom: 2px solid #0891b2; padding-bottom: 10px;">
            📧 Nuevo Mensaje de Contacto
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-top: 0;">Información del Contacto</h3>
            
            <p style="margin: 10px 0;"><strong>👤 Nombre:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p style="margin: 10px 0;"><strong>📱 Teléfono:</strong> ${phone}</p>` : ''}
            ${company ? `<p style="margin: 10px 0;"><strong>🏢 Empresa:</strong> ${company}</p>` : ''}
            
            <p style="margin: 15px 0 5px 0;"><strong>💬 Mensaje:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0891b2; white-space: pre-wrap;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 14px; color: #64748b; margin-top: 20px;">
            <p style="margin: 5px 0;"><strong>📅 Fecha:</strong> ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>
            <p style="margin: 5px 0;"><strong>🔗 Origen:</strong> Landing Page - We Tech</p>
          </div>
        </div>
      `,
      text: `
Nuevo Mensaje de Contacto

Información del Contacto:
👤 Nombre: ${name}
📧 Email: ${email}
${phone ? `📱 Teléfono: ${phone}` : ''}
${company ? `🏢 Empresa: ${company}` : ''}

💬 Mensaje:
${message}

---
📅 Fecha: ${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}
🔗 Origen: Landing Page - We Tech
      `.trim(),
    });

    if (error) {
      console.error('❌ Error al enviar email con Resend:', error);
      return res.status(500).json({
        success: false,
        error: 'Error al enviar el email. Por favor intenta nuevamente.',
      });
    }

    console.log('✅ Email enviado exitosamente:', data);

    return res.status(200).json({
      success: true,
      message: 'Mensaje enviado exitosamente. Te contactaremos pronto.',
      data,
    });
  } catch (error) {
    console.error('❌ Error en API de contacto:', error);
    return res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
    });
  }
});

// Ruta de salud para verificar que el servidor está funcionando
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API de contacto funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en http://localhost:${PORT}`);
  console.log(`📧 API de contacto disponible en http://localhost:${PORT}/api/contact`);
  if (process.env.RESEND_API_KEY) {
    const apiKeyPreview = process.env.RESEND_API_KEY.substring(0, 10) + '...';
    console.log(`✅ RESEND_API_KEY cargada correctamente: ${apiKeyPreview}`);
  } else {
    console.warn('⚠️  ADVERTENCIA: RESEND_API_KEY no está configurada. El servicio de email no funcionará.');
    console.warn('   Verifica que el archivo .env.local contenga RESEND_API_KEY=tu_api_key');
  }
});
