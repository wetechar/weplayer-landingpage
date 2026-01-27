# 📦 Guía de Deploy del Sitemap

Esta guía te explica dónde están los archivos del sitemap y cómo asegurarte de que estén incluidos en tu deploy.

## 📁 Ubicación de los Archivos

Los archivos del sitemap están ubicados en:

```
app/
├── sitemap.ts    ← Archivo principal del sitemap
└── robots.ts     ← Archivo robots.txt
```

**Rutas completas:**

- `d:\Wetechar-Quimera\home-Page\Wetech_latam\2026\Landigpage2026\app\sitemap.ts`
- `d:\Wetechar-Quimera\home-Page\Wetech_latam\2026\Landigpage2026\app\robots.ts`

## ✅ Verificación de Archivos

### 1. Verificar que los archivos existen

Asegúrate de que estos archivos estén en tu proyecto:

```bash
# Desde la raíz del proyecto
ls app/sitemap.ts
ls app/robots.ts
```

### 2. Verificar que están en Git (si usas Git)

```bash
git status app/sitemap.ts app/robots.ts
```

Si no están en Git, agrégalos:

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "Add sitemap and robots.txt for SEO"
```

## 🚀 Deploy Automático (Recomendado)

### Si usas Vercel, Netlify u otro servicio similar:

**Los archivos se incluyen automáticamente** cuando haces push a tu repositorio. Solo necesitas:

1. **Hacer commit de los archivos** (si aún no lo has hecho):

   ```bash
   git add app/sitemap.ts app/robots.ts
   git commit -m "Add sitemap configuration"
   git push
   ```

2. **El deploy se ejecutará automáticamente** y Next.js generará:
   - `https://tu-dominio.com/sitemap.xml` (desde `app/sitemap.ts`)
   - `https://tu-dominio.com/robots.txt` (desde `app/robots.ts`)

### Configurar Variables de Entorno

**IMPORTANTE:** Asegúrate de configurar esta variable en tu plataforma de deploy:

**Variable de Entorno:**

```
NEXT_PUBLIC_BASE_URL=https://wetechlatam.com
```

**Cómo configurarla:**

#### En Vercel:

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Settings → Environment Variables
3. Agrega:
   - **Name:** `NEXT_PUBLIC_BASE_URL`
   - **Value:** `https://wetechlatam.com`
   - **Environment:** Production (y Preview si quieres)
4. Guarda y redeploya

#### En Netlify:

1. Ve a tu sitio en [Netlify Dashboard](https://app.netlify.com)
2. Site settings → Environment variables
3. Agrega la variable y guarda

#### En otros servicios:

Busca la sección de "Environment Variables" o "Config" en el panel de control.

## 🔍 Verificar después del Deploy

Después de hacer deploy, verifica que todo funcione:

### 1. Verificar Sitemap

Abre en tu navegador:

```
https://wetechlatam.com/sitemap.xml
```

Deberías ver un XML con todas las URLs del sitio.

### 2. Verificar Robots.txt

Abre en tu navegador:

```
https://wetechlatam.com/robots.txt
```

Deberías ver:

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
...

Sitemap: https://wetechlatam.com/sitemap.xml
```

### 3. Verificar en Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Inspección de URLs → Ingresa `https://wetechlatam.com/sitemap.xml`
3. Verifica que Google pueda acceder al sitemap

## 📋 Checklist de Deploy

Antes de hacer deploy, verifica:

- [ ] Archivo `app/sitemap.ts` existe en el proyecto
- [ ] Archivo `app/robots.ts` existe en el proyecto
- [ ] Archivos están en Git (si usas control de versiones)
- [ ] Variable `NEXT_PUBLIC_BASE_URL` configurada en producción
- [ ] Variable apunta a la URL correcta (ej: `https://wetechlatam.com`)
- [ ] Deploy completado exitosamente
- [ ] `/sitemap.xml` accesible en producción
- [ ] `/robots.txt` accesible en producción
- [ ] Sitemap agregado en Google Search Console

## 🐛 Solución de Problemas

### El sitemap no se genera

**Causa:** Next.js no encuentra los archivos o hay un error de sintaxis.

**Solución:**

1. Verifica que los archivos estén en `app/sitemap.ts` y `app/robots.ts`
2. Verifica que no haya errores de sintaxis:
   ```bash
   npm run build
   ```
3. Revisa los logs del deploy para ver errores

### El sitemap muestra URLs incorrectas

**Causa:** `NEXT_PUBLIC_BASE_URL` no está configurada o tiene un valor incorrecto.

**Solución:**

1. Verifica la variable de entorno en tu plataforma de deploy
2. Asegúrate de que sea `https://wetechlatam.com` (sin barra final)
3. Reinicia/redeploya después de cambiar la variable

### El sitemap está vacío (solo rutas estáticas)

**Causa:** La base de datos no está configurada o no hay productos.

**Solución:**

1. Verifica que `DATABASE_URL` esté configurada en producción
2. Verifica que la base de datos tenga productos activos
3. El sitemap funcionará con solo las rutas estáticas si no hay BD

## 📝 Notas Importantes

1. **Next.js genera automáticamente** las rutas `/sitemap.xml` y `/robots.txt` cuando los archivos están en `app/`
2. **No necesitas copiar archivos manualmente** si usas un sistema de deploy automático
3. **Las variables de entorno** son críticas para que el sitemap use las URLs correctas
4. **El sitemap se regenera** en cada build, incluyendo productos dinámicos de la BD

## 🔗 Archivos Relacionados

- `app/sitemap.ts` - Genera el sitemap XML
- `app/robots.ts` - Genera el robots.txt
- `lib/prisma.ts` - Cliente de Prisma (necesario para productos dinámicos)
- `docs/GOOGLE_SEARCH_CONSOLE_SETUP.md` - Guía para configurar en Google Search Console

---

**Última actualización:** Enero 2026
