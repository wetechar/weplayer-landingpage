import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';
import type { Session } from '@auth0/nextjs-auth0';
import type { IncomingMessage, ServerResponse } from 'http';

// Configuración de rutas de Auth0
const authHandler = handleAuth({
  login: handleLogin({
    returnTo: '/',
  }),
  callback: handleCallback({
    afterCallback: async (
      req: IncomingMessage,
      res: ServerResponse,
      session: Session,
    ) => {
      // Aquí puedes sincronizar el usuario con la base de datos
      // usando un webhook o directamente aquí
      return session;
    },
  }),
});

// Wrapper para Next.js 15 App Router
// handleAuth necesita acceso a params.auth0 para determinar qué handler usar
export async function GET(
  request: Request,
  ctx: { params: Promise<{ auth0: string }> },
) {
  // Resolver params para cumplir con Next.js 15
  const resolvedParams = await ctx.params;

  // Crear un objeto de contexto que handleAuth espera
  // handleAuth internamente hace destructuring de ctx.params, por eso necesita esta estructura
  const context = {
    params: {
      auth0: resolvedParams.auth0,
    },
  };

  // handleAuth espera recibir (request, context) donde context tiene { params: { auth0: string } }
  // La librería @auth0/nextjs-auth0 v3.4.0 no tiene tipos actualizados para Next.js 15,
  // pero funciona correctamente cuando se pasa el contexto de esta manera
  return (authHandler as any)(request, context);
}
