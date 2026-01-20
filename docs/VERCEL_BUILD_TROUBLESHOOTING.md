# 🔧 Solución de Problemas de Build en Vercel

## ❌ Error: "Command 'npm run build' exited with 1"

### Posibles Causas y Soluciones

#### 1. **Variables de Entorno Faltantes**

**Problema**: El build puede fallar si faltan variables de entorno requeridas.

**Solución**: En Vercel Dashboard > Settings > Environment Variables, asegúrate de tener:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINATARIO=ingenieria@wetechar.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Nota**: Las variables `GEMINI_API_KEY` son opcionales y no deberían causar fallos.

#### 2. **Configuración de Framework Incorrecta**

**Problema**: Vercel puede estar detectando Next.js en lugar de Vite.

**Solución**: En Vercel Dashboard > Settings > General:

- **Framework Preset**: `Other` (NO Next.js)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Root Directory**: `.` (raíz del proyecto)

#### 3. **Dependencias Faltantes**

**Problema**: Algunas dependencias pueden no instalarse correctamente.

**Solución**: Verifica que `package.json` tenga todas las dependencias necesarias:

```json
{
  "dependencies": {
    "@vercel/node": "^5.5.24",
    "resend": "^6.8.0",
    ...
  }
}
```

#### 4. **Scripts de Build**

**Problema**: El script `check-ports` podría estar ejecutándose durante el build.

**Solución**: El script `build` solo ejecuta `vite build`, no `check-ports`. Si hay problemas, verifica que no haya hooks de npm ejecutándose.

#### 5. **Archivos de Next.js Confundiendo a Vercel**

**Problema**: Archivos de Next.js del merge anterior pueden confundir a Vercel.

**Solución**: Asegúrate de que `.vercelignore` excluya:
- `next.config.js`
- `src/app/`
- `postcss.config.mjs`

## 🔍 Pasos de Diagnóstico

### 1. Verificar Logs de Build en Vercel

En el dashboard de Vercel, ve a **Deployments** > [Último deploy] > **Build Logs** para ver el error específico.

### 2. Probar Build Localmente

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install

# Probar build
npm run build
```

### 3. Verificar Configuración de Vercel

```bash
# Ver configuración actual
cat vercel.json

# Verificar que el build funciona
npm run build
```

### 4. Verificar Variables de Entorno

En Vercel Dashboard, verifica que todas las variables de entorno estén configuradas correctamente y sin espacios adicionales.

## ✅ Configuración Correcta

### `vercel.json`

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

### `package.json` - Scripts

```json
{
  "scripts": {
    "build": "vite build",
    "dev": "npm run check-ports && vite"
  }
}
```

### Variables de Entorno en Vercel

**Production, Preview, Development:**
- `RESEND_API_KEY`
- `EMAIL_DESTINATARIO`
- `RESEND_FROM_EMAIL`

## 🚀 Solución Rápida

1. **Limpiar y Reinstalar**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Verificar Build Local**:
   ```bash
   npm run build
   ```

3. **Push a GitHub**:
   ```bash
   git add .
   git commit -m "fix: actualizar configuración de build"
   git push origin main
   ```

4. **En Vercel Dashboard**:
   - Ve a **Settings > General**
   - Verifica Framework Preset: `Other`
   - Verifica Build Command: `npm run build`
   - Verifica Output Directory: `dist`
   - Guarda cambios

5. **Redesplegar**:
   - Ve a **Deployments**
   - Click en "Redeploy" del último deploy

## 📝 Checklist de Verificación

- [ ] `vercel.json` configurado correctamente
- [ ] Framework Preset en Vercel: `Other`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Variables de entorno configuradas en Vercel
- [ ] Build funciona localmente (`npm run build`)
- [ ] No hay errores de TypeScript (`npm run build`)
- [ ] `.vercelignore` excluye archivos de Next.js

## 🔗 Recursos

- [Documentación de Vercel - Builds](https://vercel.com/docs/build-step)
- [Documentación de Vite - Deploy](https://vitejs.dev/guide/static-deploy.html#vercel)

---

**Si el problema persiste**, comparte los logs de build de Vercel para diagnóstico más específico.
