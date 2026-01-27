# 🔧 Solución de Problemas de Build en Vercel

## ❌ Error: PrismaClientInitializationError - Prisma Client no generado

### Problema

```
Error [PrismaClientInitializationError]: Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered.
```

**Causa**: Vercel cachea las dependencias de `node_modules`, lo que impide que Prisma Client se genere automáticamente durante el build.

### Solución ✅

El script de build ha sido actualizado para incluir `prisma generate`:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

**Cambios realizados:**

1. ✅ `prisma generate` agregado al script `build` (se ejecuta antes de `next build`)
2. ✅ Script `postinstall` agregado (se ejecuta automáticamente después de `npm install`)

### Verificación

1. **Verifica que los cambios estén en `package.json`**:

   ```bash
   cat package.json | grep -A 2 '"build"'
   ```

2. **Prueba el build localmente**:

   ```bash
   npm run build
   ```

3. **Haz commit y push**:

   ```bash
   git add package.json
   git commit -m "fix: agregar prisma generate al build para Vercel"
   git push
   ```

4. **Vercel automáticamente**:
   - Detectará los cambios
   - Ejecutará `npm install` (que ejecutará `postinstall` → `prisma generate`)
   - Ejecutará `npm run build` (que ejecutará `prisma generate && next build`)
   - El build debería completarse exitosamente

### Referencias

- [Documentación de Prisma - Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Prisma Client Generation](https://www.prisma.io/docs/concepts/components/prisma-client/generating-prisma-client)

---

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

#### 4. **Error: Cannot find module @rollup/rollup-linux-x64-gnu**

**Problema**: Rollup tiene dependencias opcionales específicas de plataforma que npm a veces no instala correctamente.

**Solución**:

- El archivo `.npmrc` está configurado con `optional=true` para instalar dependencias opcionales
- El `vercel.json` usa `npm install --include=optional` para asegurar la instalación
- Asegúrate de que `package-lock.json` esté commitado en el repositorio

#### 5. **Scripts de Build**

**Problema**: El script `check-ports` podría estar ejecutándose durante el build.

**Solución**: El script `build` solo ejecuta `vite build`, no `check-ports`. Los scripts de verificación de puertos se saltan automáticamente en producción (Vercel detecta `VERCEL=1`).

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
