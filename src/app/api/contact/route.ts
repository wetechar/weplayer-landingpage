import { NextRequest, NextResponse } from 'next/server';

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

    // Por ahora, simulamos el envío exitoso y guardamos en logs
    // Esto te permitirá ver los mensajes en los logs de Vercel
    console.log('📧 NUEVO MENSAJE DE CONTACTO:', {
      nombre: nombre.trim(),
      email: email.trim(),
      mensaje: mensaje.trim(),
      fecha: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      ip:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip'),
      timestamp: Date.now(),
    });

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
