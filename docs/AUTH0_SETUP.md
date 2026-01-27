# 🔐 Configuración de Auth0 - Guía Completa

## ⚠️ Errores Comunes y Soluciones

### Error: "secret" is required

**Causa:** Falta la variable `AUTH0_SECRET` en `.env.local`

**Solución:**

1. El `AUTH0_SECRET` ya ha sido generado automáticamente en `.env.local`
2. Si necesitas generar uno nuevo, ejecuta:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

### Error: Route "/api/auth/[auth0]" used `params.auth0`. `params` should be awaited

**Causa:** Incompatibilidad con Next.js 15 donde los params son asíncronos

**Solución:**
✅ Ya corregido en `app/api/auth/[auth0]/route.ts` - el código ahora hace `await params` antes de usar.

## 📋 Pasos para Configurar Auth0

### 1. Crear Aplicación en Auth0 Dashboard

1. Ve a [Auth0 Dashboard](https://manage.auth0.com)
2. Inicia sesión o crea una cuenta
3. Ve a **Applications** > **Applications**
4. Haz clic en **Create Application**
5. Configura:
   - **Name:** `We Tech Landing` (o el nombre que prefieras)
   - **Type:** Selecciona **Regular Web Application**
   - Haz clic en **Create**

### 2. Configurar URLs de Callback y Logout

En la página de configuración de tu aplicación:

1. **Allowed Callback URLs:**

   ```
   http://localhost:3000/api/auth/callback, https://tu-dominio.com/api/auth/callback
   ```

2. **Allowed Logout URLs:**

   ```
   http://localhost:3000, https://tu-dominio.com
   ```

3. **Allowed Web Origins:**

   ```
   http://localhost:3000, https://tu-dominio.com
   ```

4. Haz clic en **Save Changes**

### 3. Obtener Credenciales

En la misma página de configuración, encontrarás:

- **Domain:** (ejemplo: `tu-tenant.auth0.com`)
- **Client ID:** (una cadena larga)
- **Client Secret:** (haz clic en "Show" para verlo)

### 4. Configurar Variables de Entorno

Edita tu archivo `.env.local` y completa:

```env
AUTH0_SECRET=GH7B/5sIl3UMyJSdYUc2TomIueRz702mA6lOYE/1ZMo=
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://tu-tenant.auth0.com  # Reemplaza con tu Domain
AUTH0_CLIENT_ID=tu-client-id                        # Reemplaza con tu Client ID
AUTH0_CLIENT_SECRET=tu-client-secret                # Reemplaza con tu Client Secret
```

**⚠️ IMPORTANTE:** Reemplaza los valores de ejemplo con los valores reales de tu aplicación Auth0.

### 5. Configurar Roles de Usuario (Opcional pero Recomendado)

Para usar el sistema RBAC (Role-Based Access Control), necesitas configurar roles en Auth0:

1. Ve a **User Management** > **Users**
2. Selecciona un usuario
3. Ve a la pestaña **Metadata**
4. En **app_metadata**, agrega:

   ```json
   {
     "https://antigravity.app/role": "ADMIN"
   }
   ```

   O para otros roles:
   - `"ADMIN"` - Acceso completo
   - `"SELLER"` - Acceso a dashboard de vendedor
   - `"CUSTOMER"` - Usuario regular (por defecto)

5. Haz clic en **Save**

### 6. Configurar Webhook (Opcional)

Para sincronizar usuarios automáticamente cuando se registran en Auth0:

1. Ve a **Actions** > **Flows** > **Post Login**
2. Crea una nueva Action o edita una existente
3. O mejor aún, configura un webhook en **Actions** > **Hooks**
4. Endpoint: `https://tu-dominio.com/api/webhooks/auth0`
5. Eventos: `user_created`, `user_updated`
6. Agrega el header de autorización con `AUTH0_WEBHOOK_SECRET`

## 🧪 Probar la Configuración

1. Reinicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

2. Visita `http://localhost:3000/api/auth/login`
3. Deberías ser redirigido a Auth0 para iniciar sesión
4. Después del login, serás redirigido de vuelta a tu aplicación

## 🔍 Verificar que Funciona

### Verificar Variables de Entorno

Asegúrate de que todas las variables estén configuradas:

```bash
# En PowerShell (Windows)
$env:AUTH0_SECRET
$env:AUTH0_BASE_URL
$env:AUTH0_ISSUER_BASE_URL
$env:AUTH0_CLIENT_ID
$env:AUTH0_CLIENT_SECRET
```

### Verificar en el Código

El middleware en `middleware.ts` debería poder obtener la sesión correctamente.

## 🚨 Troubleshooting

### Error: "Profile handler failed"

- Verifica que `AUTH0_SECRET` esté configurado
- Verifica que `AUTH0_ISSUER_BASE_URL` tenga el formato correcto: `https://tu-tenant.auth0.com`
- Asegúrate de que no haya espacios extra en las variables de entorno

### Error: "Login handler failed"

- Verifica las Callback URLs en Auth0 Dashboard
- Asegúrate de que `AUTH0_BASE_URL` coincida con la URL de tu aplicación

### Error: "Invalid client"

- Verifica que `AUTH0_CLIENT_ID` y `AUTH0_CLIENT_SECRET` sean correctos
- Asegúrate de copiar los valores completos sin espacios

### Error: Redirect URI mismatch

- Verifica que la URL en `AUTH0_BASE_URL` esté en las Callback URLs de Auth0
- Asegúrate de incluir tanto `http://localhost:3000` como `https://tu-dominio.com`

## 📚 Recursos Adicionales

- [Documentación de Auth0 para Next.js](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Documentación de @auth0/nextjs-auth0](https://github.com/auth0/nextjs-auth0)
- [Next.js 15 Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

## ✅ Checklist de Configuración

- [ ] Aplicación creada en Auth0 Dashboard
- [ ] Callback URLs configuradas
- [ ] Logout URLs configuradas
- [ ] `AUTH0_SECRET` configurado en `.env.local`
- [ ] `AUTH0_BASE_URL` configurado en `.env.local`
- [ ] `AUTH0_ISSUER_BASE_URL` configurado en `.env.local`
- [ ] `AUTH0_CLIENT_ID` configurado en `.env.local`
- [ ] `AUTH0_CLIENT_SECRET` configurado en `.env.local`
- [ ] Servidor reiniciado después de cambios
- [ ] Login funciona correctamente
- [ ] Logout funciona correctamente
- [ ] Roles configurados en `app_metadata` (opcional)
