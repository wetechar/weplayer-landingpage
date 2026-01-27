import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0/edge';

// Roles permitidos para cada ruta
const routePermissions: Record<string, string[]> = {
  '/admin': ['ADMIN'],
  '/seller': ['ADMIN', 'SELLER'],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si la ruta requiere protección
  const requiresAuth = Object.keys(routePermissions).some((route) =>
    pathname.startsWith(route)
  );

  // Si no requiere autenticación, permitir acceso
  if (!requiresAuth) {
    return NextResponse.next();
  }

  try {
    // Obtener sesión de Auth0 (versión Edge-compatible)
    const res = NextResponse.next();
    const session = await getSession(request, res);

    // Si no hay sesión, redirigir a login
    if (!session || !session.user) {
      const loginUrl = new URL('/api/auth/login', request.url);
      loginUrl.searchParams.set('returnTo', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Obtener el rol del usuario desde app_metadata de Auth0
    // El namespace personalizado debe configurarse en Auth0 Dashboard
    const userRole = (session.user as any)['https://antigravity.app/role'] as
      | string
      | undefined;

    // Si no tiene rol, asignar CUSTOMER por defecto
    const role = userRole || 'CUSTOMER';

    // Verificar permisos para la ruta
    const matchedRoute = Object.keys(routePermissions).find((route) =>
      pathname.startsWith(route)
    );
    
    if (!matchedRoute) {
      return NextResponse.next();
    }

    const allowedRoles = routePermissions[matchedRoute];

    if (!allowedRoles || !allowedRoles.includes(role)) {
      // Usuario no tiene permisos, redirigir a página de acceso denegado
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // Usuario autenticado y con permisos, permitir acceso
    return res;
  } catch (error) {
    console.error('Error en middleware:', error);
    // En caso de error, redirigir a login
    const loginUrl = new URL('/api/auth/login', request.url);
    loginUrl.searchParams.set('returnTo', pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Configuración de matcher para Edge Runtime
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Auth0 routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
