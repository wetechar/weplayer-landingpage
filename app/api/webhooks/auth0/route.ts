import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Webhook de Auth0 para sincronizar usuarios en la base de datos
 * Configurar en Auth0 Dashboard: https://manage.auth0.com/dashboard
 * 
 * Eventos a escuchar:
 * - user_created: Cuando se crea un nuevo usuario
 * - user_updated: Cuando se actualiza un usuario
 */
export async function POST(request: NextRequest) {
  try {
    // Verificar el secret del webhook
    const authHeader = request.headers.get('authorization');
    const webhookSecret = process.env.AUTH0_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn('AUTH0_WEBHOOK_SECRET no configurado');
    } else if (authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const payload = await request.json();
    const { event, user } = payload;

    if (!event || !user) {
      return NextResponse.json(
        { error: 'Payload inválido' },
        { status: 400 }
      );
    }

    // Obtener el rol desde app_metadata
    const role = (user.app_metadata?.['https://antigravity.app/role'] as string) || 'CUSTOMER';

    // Mapear roles de Auth0 a roles de Prisma
    const prismaRole = role.toUpperCase() as 'ADMIN' | 'SELLER' | 'CUSTOMER';

    if (event === 'user_created') {
      // Crear usuario en la base de datos
      await prisma.user.upsert({
        where: {
          id: user.user_id,
        },
        update: {
          email: user.email,
          name: user.name || user.email.split('@')[0],
          role: prismaRole,
        },
        create: {
          id: user.user_id,
          email: user.email,
          name: user.name || user.email.split('@')[0],
          role: prismaRole,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Usuario sincronizado correctamente',
      });
    }

    if (event === 'user_updated') {
      // Actualizar usuario en la base de datos
      await prisma.user.update({
        where: {
          id: user.user_id,
        },
        data: {
          email: user.email,
          name: user.name || undefined,
          role: prismaRole,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Usuario actualizado correctamente',
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Evento procesado (no requiere acción)',
    });
  } catch (error) {
    console.error('Error en webhook de Auth0:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
