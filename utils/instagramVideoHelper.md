# Cómo Obtener URLs de Videos de Instagram

## ❌ Por qué NO usar URLs blob:

Las URLs `blob:` que ves en el inspector son:
- **Temporales**: Expiran cuando cierras la página
- **Contexto-específicas**: Solo funcionan en el navegador donde se generaron
- **No accesibles**: No puedes usarlas en tu código

## ✅ Soluciones Correctas:

### Opción 1: Usar Instagram Graph API (Recomendado)

La API de Instagram devuelve la URL real del video en el campo `media_url`:

```json
{
  "id": "123456789",
  "media_type": "VIDEO",
  "media_url": "https://scontent.cdninstagram.com/v/t51.2885-15/...",
  "thumbnail_url": "https://scontent.cdninstagram.com/v/t51.2885-15/...",
  "permalink": "https://www.instagram.com/p/XXXXX/"
}
```

**Ventajas:**
- ✅ URL permanente y accesible
- ✅ Funciona desde cualquier lugar
- ✅ Incluye thumbnail para el poster
- ✅ Automático con cada nueva publicación

### Opción 2: Obtener URL Manualmente (Para posts específicos)

Si necesitas la URL de un video específico:

1. **Método 1 - Desde el código fuente:**
   - Abre tu publicación de Instagram en el navegador
   - Presiona `Ctrl+Shift+I` (o `Cmd+Option+I` en Mac)
   - Ve a la pestaña **Network**
   - Filtra por "video" o "mp4"
   - Reproduce el video en la página
   - Busca la petición que descarga el video
   - Copia la URL completa (debería ser algo como `https://scontent.cdninstagram.com/v/t51.2885-15/...`)

2. **Método 2 - Usando herramientas online:**
   - Ve a https://www.instadp.com/ o https://downloadgram.org/
   - Pega la URL de tu post de Instagram
   - Descarga el video o copia la URL directa

3. **Método 3 - Desde la respuesta JSON de Instagram:**
   - Abre: `https://www.instagram.com/p/{POST_ID}/?__a=1&__d=dis`
   - Busca en el JSON el campo `video_url` o `video_versions`
   - Copia la URL más grande (mejor calidad)

### Opción 3: Usar oEmbed de Instagram

```javascript
const response = await fetch(
  `https://api.instagram.com/oembed/?url=https://www.instagram.com/p/{POST_ID}/`
);
const data = await response.json();
// data.thumbnail_url contiene la imagen/video thumbnail
```

---

## 🎬 Configurar Video en tu Código

Una vez que tengas la URL real del video, actualiza `utils/instagramConfig.ts`:

```typescript
fallbackPosts: [
  {
    imageUrl: 'https://scontent.cdninstagram.com/...', // Thumbnail del video
    permalink: 'https://www.instagram.com/p/DMX6m7IsL_K/',
    videoUrl: 'https://scontent.cdninstagram.com/v/t51.2885-15/...', // URL real del video
  },
],
```

El componente Hero detectará automáticamente si es video y lo reproducirá.
