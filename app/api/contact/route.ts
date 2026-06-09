import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Los campos nombre, email y mensaje son requeridos',
        },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email inválido',
        },
        { status: 400 }
      );
    }

    const resend = getResend();
    if (!resend) {
      return NextResponse.json(
        {
          success: false,
          error: 'Servicio de email no configurado. Por favor configure RESEND_API_KEY en las variables de entorno.',
        },
        { status: 500 }
      );
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
      return NextResponse.json(
        {
          success: false,
          error: 'Error al enviar el email. Por favor intenta nuevamente.',
        },
        { status: 500 }
      );
    }

    console.log('✅ Email enviado exitosamente:', data);

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado exitosamente. Te contactaremos pronto.',
      data,
    });
  } catch (error) {
    console.error('❌ Error en API de contacto:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}
