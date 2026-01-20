# 🔧 Configuración de GitHub - We Player Landing

## 📋 Índice

1. [Información del Repositorio](#información-del-repositorio)
2. [Ramas y Estrategia de Git](#ramas-y-estrategia-de-git)
3. [Configuración de Git](#configuración-de-git)
4. [Git Ignore](#git-ignore)
5. [Workflows y Automatización](#workflows-y-automatización)
6. [Seguridad y Buenas Prácticas](#seguridad-y-buenas-prácticas)
7. [Integración con Vercel](#integración-con-vercel)
8. [Guía de Contribución](#guía-de-contribución)

---

## 📦 Información del Repositorio

### **Repositorio Principal**

- **URL**: `https://github.com/wetechar/weplayer-landingpage.git`
- **Organización**: `wetechar`
- **Nombre**: `weplayer-landingpage`
- **Tipo**: Privado
- **Framework**: Next.js 14.2.5
- **Lenguaje Principal**: TypeScript

### **Estado Actual**

- **Rama Principal**: `main`
- **Rama de Desarrollo 2026**: `we-player-2026`
- **Versión**: `0.1.0`
- **Última Actualización**: Enero 2025

---

## 🌿 Ramas y Estrategia de Git

### **Ramas Existentes**

#### **1. `main` (Producción)**
- **Propósito**: Código estable y desplegado en producción
- **Protección**: Requiere Pull Request y revisión
- **Estado**: Estable y actualizado

#### **2. `we-player-2026` (Desarrollo 2026)**
- **Propósito**: Nueva versión para 2026 con todas las actualizaciones
- **Estado**: Activa, contiene última versión de la aplicación
- **Base**: Creada desde `main`
- **Incluye**:
  - ✅ Corrección de seguridad (API keys)
  - ✅ Variables de entorno actualizadas
  - ✅ Documentación actualizada
  - ✅ Validaciones mejoradas

#### **3. `wetechar-weplayer-v1.0.0` (Release)**
- **Propósito**: Versión estable v1.0.0
- **Tipo**: Tag/Release branch

### **Estrategia de Ramas**

```
main (producción)
  ├── we-player-2026 (desarrollo activo)
  └── wetechar-weplayer-v1.0.0 (release)
```

### **Flujo de Trabajo Recomendado**

1. **Crear feature branch desde `we-player-2026`**:
   ```bash
   git checkout we-player-2026
   git pull origin we-player-2026
   git checkout -b feature/nombre-feature
   ```

2. **Desarrollar y commitear**:
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   ```

3. **Push y crear Pull Request**:
   ```bash
   git push origin feature/nombre-feature
   # Crear PR hacia we-player-2026
   ```

4. **Merge a `we-player-2026`** después de revisión

5. **Deploy a producción** desde `main` cuando esté listo

---

## ⚙️ Configuración de Git

### **Remote Configurado**

```bash
origin  https://github.com/wetechar/weplayer-landingpage.git
```

### **Configuración Local Recomendada**

```bash
# Configurar usuario (si no está configurado)
git config user.name "Tu Nombre"
git config user.email "tu-email@wetechar.com"

# Configurar editor preferido
git config core.editor "code --wait"  # VS Code
# o
git config core.editor "notepad"  # Notepad

# Configurar línea de comandos (Windows)
git config core.autocrlf true

# Configurar alias útiles
git config alias.st status
git config alias.co checkout
git config alias.br branch
git config alias.cm commit
```

### **Verificar Configuración**

```bash
# Ver configuración actual
git config --list

# Ver configuración específica
git config user.name
git config user.email
```

---

## 🚫 Git Ignore

### **Archivos Ignorados**

El archivo `.gitignore` está configurado para ignorar:

#### **Dependencias**
```
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz
```

#### **Build y Producción**
```
/.next/
/out/
/build
*.tsbuildinfo
next-env.d.ts
```

#### **Variables de Entorno**
```
.env*.local
.env
# Pero permite .env.example
!.env.example
```

#### **Vercel**
```
.vercel
```

#### **IDE y Editores**
```
.vscode/
.idea/
```

#### **Sistema Operativo**
```
.DS_Store
Thumbs.db
*.pem
```

#### **Logs y Debug**
```
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log
```

#### **Videos y Archivos Grandes**
```
public/videos/original/
public/videos/optimized/
*.mp4
*.mov
*.avi
*.mkv
*.webm
```

#### **Documentación y Scripts (para Vercel)**
```
/docs/
/scripts/
```

### **Archivos Permitidos**

- ✅ `.env.example` - Plantilla de variables de entorno
- ✅ Archivos de configuración públicos
- ✅ Código fuente
- ✅ Documentación principal (README.md)

---

## 🔄 Workflows y Automatización

### **GitHub Actions (Recomendado)**

Crear `.github/workflows/` para automatización:

#### **1. CI/CD Pipeline**

Crear `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, we-player-2026 ]
  pull_request:
    branches: [ main, we-player-2026 ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Build
      run: npm run build
      env:
        RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
        EMAIL_DESTINATARIO: ${{ secrets.EMAIL_DESTINATARIO }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

#### **2. Code Quality**

Crear `.github/workflows/quality.yml`:

```yaml
name: Code Quality

on:
  pull_request:
    branches: [ main, we-player-2026 ]

jobs:
  quality:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run ESLint
      run: npm run lint
    
    - name: Type Check
      run: npx tsc --noEmit
```

### **Secrets Necesarios en GitHub**

Configurar en: `Settings > Secrets and variables > Actions`

```
RESEND_API_KEY          # API key de Resend
EMAIL_DESTINATARIO      # Email destinatario
VERCEL_TOKEN            # Token de Vercel
VERCEL_ORG_ID           # ID de organización Vercel
VERCEL_PROJECT_ID       # ID del proyecto Vercel
```

---

## 🔒 Seguridad y Buenas Prácticas

### **⚠️ Problema de Seguridad Detectado**

**Token de GitHub en Remote URL**

El remote actual contiene un token hardcodeado:
```
origin  https://ghp_...@github.com/wetechar/weplayer-landingpage.git
```

### **✅ Solución Recomendada**

1. **Revocar el token actual**:
   - Ve a GitHub > Settings > Developer settings > Personal access tokens
   - Revoca el token expuesto

2. **Configurar remote sin token**:
   ```bash
   git remote set-url origin https://github.com/wetechar/weplayer-landingpage.git
   ```

3. **Usar autenticación segura**:
   - **Opción A**: SSH Keys (Recomendado)
     ```bash
     git remote set-url origin git@github.com:wetechar/weplayer-landingpage.git
     ```
   
   - **Opción B**: GitHub CLI
     ```bash
     gh auth login
     ```
   
   - **Opción C**: Credential Manager
     ```bash
     git config --global credential.helper manager-core
     ```

### **Buenas Prácticas de Seguridad**

1. **Nunca commitear**:
   - ❌ API keys
   - ❌ Tokens de acceso
   - ❌ Credenciales
   - ❌ Archivos `.env.local`

2. **Siempre usar**:
   - ✅ Variables de entorno
   - ✅ GitHub Secrets
   - ✅ `.env.example` como plantilla

3. **Proteger ramas importantes**:
   - Configurar branch protection en GitHub
   - Requerir PR y revisión para `main`
   - Requerir status checks

4. **Usar tokens con permisos mínimos**:
   - Solo permisos necesarios
   - Expiración configurada
   - Rotación regular

---

## 🚀 Integración con Vercel

### **Configuración Actual**

- **Plataforma**: Vercel
- **Deploy Automático**: Habilitado desde GitHub
- **Ramas Desplegadas**:
  - `main` → Producción
  - `we-player-2026` → Preview

### **Variables de Entorno en Vercel**

Configurar en: `Vercel Dashboard > Project Settings > Environment Variables`

```env
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_DESTINATARIO=tu-email@ejemplo.com

# Google Analytics (si aplica)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### **Configuración de Deploy**

El archivo `.vercelignore` excluye:
- Documentación (`docs/`)
- Scripts (`scripts/`)
- Videos originales y optimizados
- Archivos de desarrollo

---

## 📝 Guía de Contribución

### **Convención de Commits**

Usar [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: nueva funcionalidad
fix: corrección de bug
docs: cambios en documentación
style: formato, punto y coma faltante, etc.
refactor: refactorización de código
test: agregar tests
chore: cambios en build, dependencias, etc.
```

### **Ejemplos**

```bash
git commit -m "feat: agregar formulario de contacto con Resend"
git commit -m "fix: corregir validación de email en formulario"
git commit -m "docs: actualizar configuración de GitHub"
git commit -m "refactor: mejorar estructura de componentes"
```

### **Proceso de Pull Request**

1. **Crear branch desde `we-player-2026`**:
   ```bash
   git checkout we-player-2026
   git pull origin we-player-2026
   git checkout -b feature/mi-feature
   ```

2. **Desarrollar y commitear**:
   ```bash
   # Hacer cambios
   git add .
   git commit -m "feat: descripción clara del cambio"
   ```

3. **Push y crear PR**:
   ```bash
   git push origin feature/mi-feature
   # Ir a GitHub y crear Pull Request hacia we-player-2026
   ```

4. **Revisión**:
   - Esperar revisión de código
   - Hacer cambios si se solicitan
   - Resolver conflictos si existen

5. **Merge**:
   - Después de aprobación, merge a `we-player-2026`
   - Eliminar branch después del merge

### **Checklist antes de PR**

- [ ] Código sigue las convenciones del proyecto
- [ ] Tests pasan (si existen)
- [ ] Linter sin errores (`npm run lint`)
- [ ] Build exitoso (`npm run build`)
- [ ] Documentación actualizada si es necesario
- [ ] Sin console.logs de debug
- [ ] Variables de entorno documentadas
- [ ] Commits con mensajes descriptivos

---

## 📊 Estadísticas del Repositorio

### **Commits Recientes**

```
b023f2d - fix: reload env
eb289f9 - creacion env
c605052 - actualizacion de la landingpage
19d4cd7 - actualizacion de la landingpage
bf86624 - feat: Add WeTech LatAm integration page
```

### **Estructura de Archivos**

```
weplayer-landing/
├── .github/              # (Recomendado crear)
│   └── workflows/        # GitHub Actions
├── docs/                 # Documentación
├── src/                  # Código fuente
├── public/               # Archivos públicos
├── .gitignore           # Archivos ignorados
├── .env.example         # Plantilla de variables
└── README.md            # Documentación principal
```

---

## 🔧 Comandos Útiles

### **Gestión de Ramas**

```bash
# Ver todas las ramas
git branch -a

# Crear nueva rama
git checkout -b nombre-rama

# Cambiar de rama
git checkout nombre-rama

# Eliminar rama local
git branch -d nombre-rama

# Eliminar rama remota
git push origin --delete nombre-rama
```

### **Sincronización**

```bash
# Actualizar rama desde remoto
git fetch origin
git pull origin nombre-rama

# Push a remoto
git push origin nombre-rama

# Push y crear upstream
git push -u origin nombre-rama
```

### **Historial**

```bash
# Ver commits recientes
git log --oneline -10

# Ver cambios en archivo
git log --follow archivo.ts

# Ver diferencias
git diff
git diff nombre-rama
```

### **Limpieza**

```bash
# Limpiar archivos no rastreados
git clean -fd

# Resetear cambios locales
git reset --hard HEAD

# Descartar cambios en archivo
git checkout -- archivo.ts
```

---

## 📚 Recursos Adicionales

### **Documentación Oficial**

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs](https://docs.github.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Conventional Commits](https://www.conventionalcommits.org/)

### **Documentación del Proyecto**

- [README.md](../README.md) - Documentación principal
- [EMAIL_INTEGRATION_OPTIONS.md](./EMAIL_INTEGRATION_OPTIONS.md) - Configuración de email
- [VERCEL_SETUP_GUIDE.md](../VERCEL_SETUP_GUIDE.md) - Guía de Vercel

---

## ✅ Checklist de Configuración

### **Configuración Inicial**

- [ ] Remote configurado correctamente (sin tokens)
- [ ] Autenticación SSH o GitHub CLI configurada
- [ ] `.gitignore` actualizado
- [ ] `.env.example` creado
- [ ] Branch protection configurado en GitHub
- [ ] Secrets configurados en GitHub Actions
- [ ] Variables de entorno configuradas en Vercel

### **Seguridad**

- [ ] Token de GitHub revocado si estaba expuesto
- [ ] Remote sin credenciales hardcodeadas
- [ ] Branch protection activado
- [ ] Secrets configurados correctamente
- [ ] `.env.local` en `.gitignore`

### **Automatización**

- [ ] GitHub Actions configurado (opcional)
- [ ] CI/CD pipeline funcionando
- [ ] Deploy automático desde GitHub a Vercel
- [ ] Tests automatizados (si aplica)

---

**Última actualización:** Enero 2025  
**Mantenido por:** We Tech Team  
**Contacto:** ingenieria@wetechar.com
