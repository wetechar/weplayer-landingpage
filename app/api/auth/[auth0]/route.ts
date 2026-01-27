import { handleAuth, handleLogin, handleCallback } from '@auth0/nextjs-auth0';

// Configuración de rutas de Auth0
// Nota: En Next.js 15, los params son asíncronos, pero handleAuth de Auth0
// maneja esto internamente. Si hay problemas, puede requerir actualización de la librería.
const authHandler = handleAuth({
  login: handleLogin({
    returnTo: '/',
  }),
  callback: handleCallback({
    afterCallback: async (req, res, session) => {
      // Aquí puedes sincronizar el usuario con la base de datos
      // usando un webhook o directamente aquí
      return session;
    },
  }),
});

// Wrapper para Next.js 15 que hace await de params antes de pasar el request
export async function GET(
  request: Request,
  { params }: { params: Promise<{ auth0: string }> },
) {
  // Await params para cumplir con Next.js 15 (aunque handleAuth no lo use directamente)
  await params;

  // Pasar el request al handler de Auth0
  return authHandler(request);
}
