# Cómo Obtener la URL Real del Video de Instagram

## ⚠️ Por qué NO usar URLs blob:

Las URLs `blob:` que ves en el inspector son:
- **Temporales**: Expiran cuando cierras la página
- **Contexto-específicas**: Solo funcionan en el navegador donde se generaron  
- **No accesibles**: No puedes usarlas en tu código

## ✅ Métodos para Obtener la URL Real del Video:

### Método 1: Desde Network Tab (Más Confiable)

1. Abre tu publicación de Instagram en el navegador
2. Abre las **DevTools** (F12)
3. Ve a la pestaña **Network**
4. Filtra por `mp4` o `video`
5. Reproduce el video en la página
6. Busca la petición que descarga el video (generalmente la más grande)
7. Copia la **URL completa** del Request URL
   - Debería verse como: `https://scontent.cdninstagram.com/v/t51.2885-15/...`

### Método 2: Desde el Código Fuente (View Source)

1. Abre tu publicación: `https://www.instagram.com/p/{POST_ID}/`
2. Click derecho → **Ver código fuente de la página**
3. Busca `video_url` o `video_versions` en el JSON embebido
4. Copia la URL del video (generalmente la de mayor resolución)

### Método 3: Usando Instagram Graph API (Automático)

Si configuras la API, obtienes automáticamente:
- `media_url`: URL del video
- `thumbnail_url`: Imagen de portada del video

```json
{
  "media_type": "VIDEO",
  "media_url": "https://scontent.cdninstagram.com/v/t51.2885-15/...",
  "thumbnail_url": "https://scontent.cdninstagram.com/v/t51.2885-15/..."
}
```

### Método 4: Herramientas Online

- https://www.instadp.com/
- https://downloadgram.org/
- https://instasave.ink/

Pega la URL de tu post y obtén la URL directa del video.

---

## 🎬 Configurar el Video en tu Código

Una vez que tengas la URL real, actualiza `utils/instagramConfig.ts`:

```typescript
fallbackPosts: [
  {
    imageUrl: 'https://scontent.cdninstagram.com/...', // Thumbnail/portada
    permalink: 'https://www.instagram.com/p/DMX6m7IsL_K/',
    videoUrl: 'https://scontent.cdninstagram.com/v/t51.2885-15/...', // URL real del video
  },
],
```

El componente detectará automáticamente que es video y lo reproducirá.
