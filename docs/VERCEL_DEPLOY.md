# 🚀 Guía de Deploy en Vercel - Proyecto Vite

## ⚠️ Configuración Importante

Este proyecto usa **Vite**, NO Next.js. Vercel puede detectar incorrectamente Next.js si hay archivos de Next.js en el proyecto (del merge anterior).

## ✅ Configuración en Vercel Dashboard

### 1. Configuración del Proyecto

En el dashboard de Vercel, ve a **Settings > General** y configura:

- **Framework Preset**: `Other` o `Vite` (si está disponible)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `.` (raíz del proyecto)

### 2. Variables de Entorno

En **Settings > Environment Variables**, agrega:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINATARIO=ingenieria@wetechar.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 3. Verificar vercel.json

El archivo `vercel.json` está configurado correctamente para:
- ✅ Build con Vite (`npm run build`)
- ✅ Output en `dist/`
- ✅ Serverless function en `api/contact.ts`
- ✅ Rewrites para SPA (todas las rutas a `/index.html`)

## 🔧 Archivos Importantes

### `vercel.json`
Configuración principal de Vercel para proyecto Vite + serverless functions.

### `api/contact.ts`
Función serverless de Vercel que reemplaza al servidor Express en producción.

### `.vercelignore`
Excluye archivos de Next.js y otros archivos innecesarios del deploy.

## 🐛 Solución de Problemas

### Error: "No Next.js version detected"

**Causa**: Vercel está detectando archivos de Next.js en el proyecto.

**Solución**:
1. Verifica que `vercel.json` tenga `"framework": null`
2. Asegúrate de que `.vercelignore` excluya `next.config.js` y `src/app/`
3. En el dashboard de Vercel, configura manualmente:
   - Framework Preset: `Other`
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Error: "Build failed"

**Verifica**:
1. Que `package.json` tenga el script `"build": "vite build"`
2. Que todas las dependencias estén instaladas
3. Los logs de build en Vercel para más detalles

### API no funciona en producción

**Verifica**:
1. Que `api/contact.ts` existe y está correctamente configurado
2. Que las variables de entorno estén configuradas en Vercel
3. Que `RESEND_API_KEY` esté configurada correctamente

## 📝 Notas

- El servidor Express (`api/server.ts`) solo se usa en desarrollo local
- En producción, Vercel usa la función serverless `api/contact.ts`
- El frontend se construye con Vite y se sirve como SPA estática
- Todas las rutas se reescriben a `/index.html` para el routing del cliente

## 🔄 Flujo de Deploy

1. **Push a GitHub**: Los cambios se despliegan automáticamente
2. **Build**: Vercel ejecuta `npm run build` (Vite)
3. **Deploy**: Los archivos en `dist/` se despliegan
4. **API**: La función `api/contact.ts` está disponible en `/api/contact`

---

**Última actualización**: Enero 2026
