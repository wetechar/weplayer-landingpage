# Configuración de Instagram API - Guía Profesional

Esta guía te ayudará a configurar la integración automática con Instagram para mostrar tus últimas publicaciones en el Hero.

## 🎯 Opciones Disponibles

### Opción 1: Posts Manuales (Sin API) - ✅ Funciona Ahora

Si no quieres configurar la API, el sistema usa automáticamente los posts de fallback configurados en `utils/instagramConfig.ts`. Solo necesitas actualizar las URLs de las imágenes allí.

**Ventajas:**
- ✅ Funciona inmediatamente
- ✅ No requiere configuración
- ✅ Sin límites de API

**Desventajas:**
- ❌ Debes actualizar manualmente cuando publiques algo nuevo

---

### Opción 2: Instagram Graph API (Automático) - 🚀 Recomendado

Obtiene automáticamente tus últimas publicaciones desde Instagram.

**Ventajas:**
- ✅ Automático - se actualiza solo
- ✅ Siempre muestra la última publicación
- ✅ Soporta imágenes y videos
- ✅ Profesional y escalable

**Desventajas:**
- ⚠️ Requiere configuración inicial
- ⚠️ Necesitas una cuenta de negocio/creador en Instagram

---

## 📋 Pasos para Configurar Instagram Graph API

### Paso 1: Convertir tu cuenta a Negocio o Creador

1. Abre Instagram en tu móvil
2. Ve a **Configuración** → **Cuenta**
3. Selecciona **Cambiar a cuenta profesional**
4. Elige **Negocio** o **Creador**
5. Conecta con tu página de Facebook (si no tienes, créala)

### Paso 2: Crear una App en Facebook Developers

1. Ve a https://developers.facebook.com/
2. Inicia sesión con tu cuenta de Facebook
3. Click en **Mis Apps** → **Crear App**
4. Selecciona **Negocio** como tipo de app
5. Completa el formulario:
   - **Nombre de la app**: We Tech Landing
   - **Email de contacto**: tu email
   - **Propósito de la app**: Mostrar publicaciones en sitio web

### Paso 3: Agregar Instagram Graph API

1. En el dashboard de tu app, busca **Instagram Graph API**
2. Click en **Configurar**
3. Agrega el producto **Instagram Graph API**

### Paso 4: Obtener Access Token

1. Ve a **Herramientas** → **Explorador de Graph API**
2. En la parte superior, selecciona tu app
3. Click en **Generar Token de Acceso**
4. Selecciona los permisos:
   - `instagram_basic`
   - `pages_read_engagement`
   - `pages_show_list`
5. Copia el token generado

### Paso 5: Obtener Instagram User ID

**Método 1 - Usando Graph API Explorer:**
1. En Graph API Explorer, usa el endpoint: `me/accounts`
2. Esto te dará las páginas conectadas
3. Para cada página, usa: `{page-id}?fields=instagram_business_account`
4. El `id` que obtengas es tu Instagram User ID

**Método 2 - Usando herramienta online:**
1. Ve a https://www.instagram.com/{tu-usuario}/?__a=1&__d=dis
2. Busca el campo `id` en la respuesta JSON

**Método 3 - Usando código:**
```javascript
// En la consola del navegador en instagram.com
fetch('https://www.instagram.com/api/v1/users/web_profile_info/?username=wetech_ar', {
  headers: {
    'X-IG-App-ID': '936619743392459'
  }
})
.then(r => r.json())
.then(data => console.log(data.data.user.id));
```

### Paso 6: Generar Token de Larga Duración

Los tokens generados en el paso 4 expiran en 1 hora. Necesitas un token de larga duración:

1. Ve a Graph API Explorer
2. Usa el endpoint: `oauth/access_token`
3. Parámetros:
   - `grant_type`: `fb_exchange_token`
   - `client_id`: Tu App ID
   - `client_secret`: Tu App Secret
   - `fb_exchange_token`: El token del paso 4
4. El token que recibas dura 60 días

### Paso 7: Configurar Variables de Entorno

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y agrega tus valores:
   ```env
   VITE_INSTAGRAM_ACCESS_TOKEN=tu_token_aqui
   VITE_INSTAGRAM_USER_ID=tu_user_id_aqui
   ```

3. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

---

## 🔄 Renovación Automática del Token

Los tokens de Instagram expiran cada 60 días. Para automatizar la renovación:

### Opción A: Usar un servicio backend

Crea un endpoint en tu backend que renueve el token automáticamente usando el App Secret.

### Opción B: Renovación manual

Cada 60 días, genera un nuevo token siguiendo el Paso 6.

---

## 🧪 Probar la Configuración

Una vez configurado, puedes probar la API directamente:

```bash
curl "https://graph.instagram.com/{USER_ID}/media?fields=id,media_type,media_url,permalink&access_token={ACCESS_TOKEN}"
```

Deberías recibir un JSON con tus publicaciones.

---

## 🐛 Solución de Problemas

### Error: "Invalid OAuth access token"
- Verifica que el token no haya expirado
- Asegúrate de haber copiado el token completo

### Error: "User not found"
- Verifica que el User ID sea correcto
- Asegúrate de que la cuenta esté conectada a una página de Facebook

### No se muestran posts
- Revisa la consola del navegador para errores
- Verifica que las variables de entorno estén configuradas correctamente
- El sistema usará automáticamente los posts de fallback si hay error

---

## 📚 Recursos Adicionales

- [Documentación de Instagram Graph API](https://developers.facebook.com/docs/instagram-api/)
- [Guía de Autenticación](https://developers.facebook.com/docs/instagram-api/getting-started)
- [Límites de Rate](https://developers.facebook.com/docs/graph-api/overview/rate-limiting)

---

## ✅ Checklist de Configuración

- [ ] Cuenta convertida a Negocio/Creador
- [ ] App creada en Facebook Developers
- [ ] Instagram Graph API agregado
- [ ] Access Token obtenido
- [ ] User ID obtenido
- [ ] Token de larga duración generado
- [ ] Variables de entorno configuradas
- [ ] Servidor reiniciado
- [ ] Posts apareciendo en el Hero

---

**Nota:** Si prefieres no configurar la API, el sistema funciona perfectamente con los posts manuales configurados en `utils/instagramConfig.ts`.
