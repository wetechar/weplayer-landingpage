import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_S7xCwayp_8R6a98tmUSbBPN3XWS8UFKH2');

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

    // Datos del mensaje
    const messageData = {
      nombre: nombre.trim(),
      email: email.trim(),
      mensaje: mensaje.trim(),
      fecha: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      timestamp: Date.now(),
    };

    // Log del mensaje
    console.log('📧 NUEVO MENSAJE DE CONTACTO:', messageData);

    // Enviar email con Resend
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'tecnopulsar@gmail.com',
        subject: `Nuevo contacto desde We Player - ${messageData.nombre}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
              📧 Nuevo Mensaje de Contacto
            </h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1e293b; margin-top: 0;">Información del Contacto</h3>
              
              <p><strong>👤 Nombre:</strong> ${messageData.nombre}</p>
              <p><strong>📧 Email:</strong> ${messageData.email}</p>
              <p><strong>💬 Mensaje:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
                ${messageData.mensaje.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; font-size: 14px; color: #64748b;">
              <p><strong>📅 Fecha:</strong> ${new Date(messageData.fecha).toLocaleString('es-AR')}</p>
              <p><strong>🌐 IP:</strong> ${messageData.ip || 'No disponible'}</p>
              <p><strong>🔗 Origen:</strong> Landing Page We Player</p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center; color: #64748b;">
              <p>Este email fue enviado automáticamente desde el formulario de contacto de We Player.</p>
              <p style="font-size: 12px;">© 2025 We Tech. Todos los derechos reservados.</p>
            </div>
          </div>
        `
      });

      console.log('✅ Email enviado exitosamente con Resend');
    } catch (emailError) {
      console.error('❌ Error al enviar email con Resend:', emailError);
      // Continuar sin fallar el formulario si el email falla
    }

    // Simular delay para que parezca real
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
