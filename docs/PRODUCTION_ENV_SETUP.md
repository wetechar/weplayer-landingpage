# 🚀 Configuración de Variables de Entorno en Producción

Esta guía te ayuda a configurar las variables de entorno necesarias para PostgreSQL y Auth0 en producción.

## 📋 Variables Requeridas

### 1. Configuración del Sitio Web

```env
NEXT_PUBLIC_BASE_URL=https://wetechlatam.com
```

### 2. Base de Datos PostgreSQL

```env
DATABASE_URL=postgres://usuario:password@host:puerto/database?sslmode=require
```

**O si usas Prisma Accelerate (recomendado para producción):**

```env
PRISMA_DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=tu-api-key
DATABASE_URL=postgres://usuario:password@host:puerto/database?sslmode=require
```

### 3. Auth0

```env
AUTH0_SECRET=tu-secret-key-generado-aleatoriamente-minimo-32-caracteres
AUTH0_BASE_URL=https://wetechlatam.com
AUTH0_ISSUER_BASE_URL=https://tu-tenant.auth0.com
AUTH0_CLIENT_ID=tu-client-id
AUTH0_CLIENT_SECRET=tu-client-secret
```

### 4. Opcionales

```env
# Resend (para emails)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINATARIO=tu-email@ejemplo.com

# Webhook de Auth0 (opcional)
AUTH0_WEBHOOK_SECRET=tu-webhook-secret
```

## 🔧 Configuración por Plataforma

### Vercel

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega cada variable:
   - **Key:** Nombre de la variable (ej: `DATABASE_URL`)
   - **Value:** Valor de la variable
   - **Environment:** Selecciona **Production** (y **Preview** si quieres)
5. Haz clic en **Save**
6. **Redeploya** tu aplicación para que los cambios surtan efecto

**Nota:** En Vercel, las variables que empiezan con `NEXT_PUBLIC_` se exponen al cliente automáticamente.

### Netlify

1. Ve a tu sitio en [Netlify Dashboard](https://app.netlify.com)
2. Ve a **Site settings** → **Environment variables**
3. Haz clic en **Add a variable**
4. Agrega cada variable y su valor
5. Selecciona el entorno (Production/Deploy preview)
6. Guarda y redeploya

### Otros Servicios (Railway, Render, etc.)

Busca la sección de **Environment Variables** o **Config** en el panel de control de tu servicio y agrega las variables allí.

## 📝 Obtener Valores de Producción

### PostgreSQL (Vercel)

1. Ve a tu proyecto en Vercel Dashboard
2. Ve a **Storage** → **Create Database** → **Postgres**
3. O usa una base de datos existente
4. Copia la **Connection String** que aparece
5. Úsala como `DATABASE_URL`

### PostgreSQL (Otros Servicios)

1. Crea una base de datos PostgreSQL en tu proveedor (AWS RDS, DigitalOcean, etc.)
2. Obtén la connection string con formato:
   ```
   postgres://usuario:password@host:puerto/database?sslmode=require
   ```
3. Úsala como `DATABASE_URL`

### Auth0

1. Ve a [Auth0 Dashboard](https://manage.auth0.com)
2. Ve a **Applications** → Tu aplicación
3. En la pestaña **Settings**, encontrarás:
   - **Domain:** Úsalo para `AUTH0_ISSUER_BASE_URL` (formato: `https://tu-tenant.auth0.com`)
   - **Client ID:** Úsalo para `AUTH0_CLIENT_ID`
   - **Client Secret:** Haz clic en "Show" y copia para `AUTH0_CLIENT_SECRET`

4. Para `AUTH0_SECRET`, genera uno nuevo:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

5. Para `AUTH0_BASE_URL`, usa tu dominio de producción:
   ```
   https://wetechlatam.com
   ```

### Configurar Callback URLs en Auth0

**IMPORTANTE:** Después de configurar las variables, actualiza las URLs en Auth0:

1. Ve a tu aplicación en Auth0 Dashboard
2. En **Allowed Callback URLs**, agrega:

   ```
   https://wetechlatam.com/api/auth/callback
   ```

3. En **Allowed Logout URLs**, agrega:

   ```
   https://wetechlatam.com
   ```

4. En **Allowed Web Origins**, agrega:

   ```
   https://wetechlatam.com
   ```

5. Haz clic en **Save Changes**

## ✅ Checklist de Configuración

### Variables de Entorno

- [ ] `NEXT_PUBLIC_BASE_URL` configurada con URL de producción
- [ ] `DATABASE_URL` configurada con connection string de producción
- [ ] `AUTH0_SECRET` generado y configurado
- [ ] `AUTH0_BASE_URL` configurada con URL de producción
- [ ] `AUTH0_ISSUER_BASE_URL` configurada con tu tenant de Auth0
- [ ] `AUTH0_CLIENT_ID` configurado
- [ ] `AUTH0_CLIENT_SECRET` configurado
- [ ] Variables opcionales configuradas si las necesitas

### Auth0 Dashboard

- [ ] Callback URL de producción agregada
- [ ] Logout URL de producción agregada
- [ ] Web Origins de producción agregada

### Verificación

- [ ] Aplicación redeployada después de agregar variables
- [ ] Build exitoso sin errores
- [ ] Login funciona en producción
- [ ] Logout funciona en producción
- [ ] Base de datos conectada correctamente

## 🐛 Solución de Problemas

### Error: "secret" is required

**Causa:** `AUTH0_SECRET` no está configurada en producción.

**Solución:**

1. Genera un nuevo secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
2. Agrégalo como variable de entorno en tu plataforma
3. Redeploya

### Error: "Invalid client"

**Causa:** `AUTH0_CLIENT_ID` o `AUTH0_CLIENT_SECRET` incorrectos.

**Solución:**

1. Verifica que copiaste los valores completos desde Auth0 Dashboard
2. Asegúrate de que no haya espacios extra
3. Verifica que estén en el entorno correcto (Production)

### Error: "Redirect URI mismatch"

**Causa:** La URL en `AUTH0_BASE_URL` no está en las Callback URLs de Auth0.

**Solución:**

1. Verifica que `AUTH0_BASE_URL` sea `https://wetechlatam.com`
2. Agrega `https://wetechlatam.com/api/auth/callback` en Auth0 Dashboard
3. Guarda cambios en Auth0

### Error de conexión a base de datos

**Causa:** `DATABASE_URL` incorrecta o base de datos no accesible.

**Solución:**

1. Verifica el formato de la connection string
2. Asegúrate de que incluya `?sslmode=require` para producción
3. Verifica que la base de datos esté accesible desde internet
4. Verifica credenciales (usuario, contraseña)

### Build falla con error de TypeScript

**Causa:** Error de tipos en el código (como el que acabamos de corregir).

**Solución:**

1. Verifica que todos los errores de TypeScript estén resueltos localmente
2. Ejecuta `npm run build` localmente antes de hacer deploy
3. Si el error persiste, verifica que el código esté actualizado en el repositorio

## 🔒 Seguridad

### Buenas Prácticas

1. **Nunca** subas `.env.local` o `.env` al repositorio
2. **Siempre** usa variables de entorno en producción
3. **Genera** nuevos secrets para producción (no reutilices los de desarrollo)
4. **Rota** los secrets periódicamente
5. **Usa** diferentes aplicaciones de Auth0 para desarrollo y producción

### Variables Sensibles

Estas variables **NUNCA** deben estar en el código:

- `AUTH0_SECRET`
- `AUTH0_CLIENT_SECRET`
- `DATABASE_URL` (con credenciales)
- `RESEND_API_KEY`
- `AUTH0_WEBHOOK_SECRET`

## 📚 Recursos Adicionales

- [Documentación de Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Documentación de Auth0 para Next.js](https://auth0.com/docs/quickstart/webapp/nextjs)
- [Documentación de Prisma](https://www.prisma.io/docs)

---

**Última actualización:** Enero 2026
