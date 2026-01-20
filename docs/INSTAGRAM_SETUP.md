# Configuración de Instagram en el Hero

## Opción 1: URLs Manuales (Recomendado - Más Simple)

Para mostrar tus publicaciones de Instagram en el Hero, actualiza el array `INSTAGRAM_POSTS` en `components/Hero.tsx`:

```typescript
const INSTAGRAM_POSTS = [
  {
    imageUrl: 'URL_DIRECTA_DE_LA_IMAGEN',
    permalink: 'https://www.instagram.com/p/CODIGO_DEL_POST/',
    videoUrl: undefined, // Solo si es video
  },
];
```

### Cómo obtener la URL directa de la imagen:

1. **Método 1 - Desde el navegador:**
   - Abre tu publicación en Instagram
   - Click derecho en la imagen → "Abrir imagen en nueva pestaña"
   - Copia la URL (debería verse algo como: `https://instagram.com/p/XXXXX/media/?size=l`)

2. **Método 2 - Usando herramientas online:**
   - Usa servicios como `https://www.instadp.com/` o `https://downloadgram.org/`
   - Ingresa la URL de tu post
   - Obtén la URL directa de la imagen

3. **Método 3 - Desde el código fuente:**
   - Abre tu publicación en Instagram en el navegador
   - Inspecciona el elemento (F12)
   - Busca el tag `<img>` y copia el atributo `src`

### Ejemplo de configuración:

```typescript
const INSTAGRAM_POSTS = [
  {
    imageUrl: 'https://scontent.cdninstagram.com/v/t51.2885-15/...',
    permalink: 'https://www.instagram.com/p/DMX6m7IsL_K/',
  },
  {
    imageUrl: 'https://scontent.cdninstagram.com/v/t51.2885-15/...',
    permalink: 'https://www.instagram.com/p/OTRO_POST/',
    videoUrl: 'https://scontent.cdninstagram.com/v/t51.2885-15/...', // Si es video
  },
];
```

## Opción 2: Usar Instagram API (Avanzado)

Si quieres obtener las publicaciones automáticamente, necesitas:

1. **Crear una App en Facebook Developers:**
   - Ve a https://developers.facebook.com/
   - Crea una nueva app
   - Agrega el producto "Instagram Basic Display"

2. **Obtener un Access Token:**
   - Sigue la guía de Instagram Basic Display API
   - Obtén un token de acceso de larga duración

3. **Actualizar el componente:**
   - Descomenta el código de la API en `components/InstagramFeed.tsx`
   - Agrega tu token de acceso

## Notas Importantes:

- Las URLs de Instagram pueden cambiar, así que es mejor usar la Opción 1 para mayor control
- Para videos, asegúrate de usar la URL del video, no la thumbnail
- El componente muestra solo la última publicación del array
- Las imágenes se cargan de forma lazy para mejor rendimiento
