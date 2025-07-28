# 🚀 Guía de Deploy - We Player Landing

## 📋 Pasos para Deploy en Vercel

### 1. Preparar el Repositorio

```bash
# Verificar que todo esté committeado
git status

# Si hay cambios, agregarlos
git add .
git commit -m "Ready for deploy"
```

### 2. Opción A: Deploy con Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login en Vercel
vercel login

# Deploy (seguir las instrucciones)
vercel

# Para deploy en producción
vercel --prod
```

### 3. Opción B: Deploy desde GitHub

1. **Crear repositorio en GitHub:**

   - Ve a [github.com](https://github.com)
   - Crea un nuevo repositorio: `weplayer-landing`
   - No inicialices con README (ya tenemos uno)

2. **Conectar repositorio local:**

   ```bash
   git remote add origin https://github.com/TU-USUARIO/weplayer-landing.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Login con tu cuenta
   - Click en "New Project"
   - Importa el repositorio desde GitHub
   - Vercel detectará automáticamente Next.js

### 4. Configurar Variables de Entorno

En el dashboard de Vercel:

1. Ve a tu proyecto
2. Settings > Environment Variables
3. Agrega las siguientes variables:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# EmailJS (opcional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_weplayer_landing
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_weplayer_contact
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
```

### 5. Configurar Dominio Personalizado (Opcional)

1. En Vercel Dashboard > Settings > Domains
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones

## 🔧 Configuración de Google Analytics

### 1. Crear cuenta en Google Analytics

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Crea una nueva cuenta para "We Tech"
3. Crea una nueva propiedad para "We Player Landing"
4. Selecciona "Web" como plataforma

### 2. Obtener Measurement ID

1. En la configuración de la propiedad
2. Data Streams > Web stream
3. Copia el Measurement ID (formato: G-XXXXXXXXXX)

### 3. Configurar en Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

## 📊 Verificar Analytics

### 1. Verificar en Google Analytics

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Realtime > Overview
3. Visita tu sitio y verifica que aparezcan las visitas

### 2. Verificar en Consola del Navegador

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña Console
3. Deberías ver logs de analytics

## 🎯 URLs de Deploy

Una vez deployado:

- **URL de producción**: `https://weplayer-landing.vercel.app`
- **URL de preview**: `https://weplayer-landing-git-main.vercel.app`
- **URL personalizada**: `https://tu-dominio.com` (si configuraste dominio)

## 🔄 Actualizaciones

### Para actualizar el sitio:

```bash
# Hacer cambios en el código
git add .
git commit -m "Update landing page"
git push origin main

# Vercel automáticamente hará deploy
```

### Para rollback:

1. Ve a Vercel Dashboard
2. Deployments
3. Selecciona una versión anterior
4. Click en "Promote to Production"

## 🛠️ Troubleshooting

### Problema: Build falla

```bash
# Verificar logs en Vercel Dashboard
# Verificar que todas las dependencias estén en package.json
npm install
npm run build
```

### Problema: Analytics no funciona

1. Verificar que la variable de entorno esté configurada
2. Verificar que el Measurement ID sea correcto
3. Esperar 24-48 horas para que aparezcan los datos

### Problema: Formulario no funciona

1. Verificar configuración de EmailJS
2. Verificar variables de entorno
3. Revisar logs en consola del navegador

## 📈 Monitoreo

### Métricas a monitorear:

1. **Performance**:

   - Lighthouse Score
   - Core Web Vitals
   - Tiempo de carga

2. **Analytics**:

   - Visitas únicas
   - Tasa de conversión
   - Fuentes de tráfico

3. **Errores**:
   - Logs de Vercel
   - Console errors
   - Build failures

## 🔒 Seguridad

El proyecto incluye:

- ✅ Headers de seguridad
- ✅ HTTPS forzado
- ✅ CSP (Content Security Policy)
- ✅ Protección XSS
- ✅ Validación de formularios

## 📞 Soporte

Si tienes problemas:

1. **Revisar logs** en Vercel Dashboard
2. **Verificar variables** de entorno
3. **Contactar soporte**: ingenieria@wetechar.com

---

**¡Tu landing page estará lista para producción!** 🚀
