# 🔍 Configuración de Google Search Console y Sitemap

Esta guía te ayudará a configurar el sitemap en Google Search Console para mejorar la indexación de tu sitio web.

## 📋 Requisitos Previos

1. Tu sitio debe estar desplegado en producción (ej: `https://wetechlatam.com`)
2. Debes tener acceso a Google Search Console
3. La propiedad del sitio debe estar verificada en Google Search Console

## ✅ Verificar que el Sitemap Funciona

Antes de agregarlo a Google Search Console, verifica que el sitemap sea accesible:

### 1. Verificar URL del Sitemap

El sitemap estará disponible en:

```
https://wetechlatam.com/sitemap.xml
```

### 2. Probar en el Navegador

Abre la URL del sitemap en tu navegador. Deberías ver un XML con todas las URLs del sitio.

### 3. Verificar robots.txt

El archivo `robots.txt` ya está configurado y apunta al sitemap:

```
https://wetechlatam.com/robots.txt
```

Deberías ver:

```
Sitemap: https://wetechlatam.com/sitemap.xml
```

## 🚀 Configurar en Google Search Console

### Paso 1: Acceder a Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Selecciona tu propiedad (`wetechlatam.com`)

### Paso 2: Navegar a la Sección de Sitemaps

1. En el menú lateral izquierdo, busca la sección **"Indexación"** (Indexing)
2. Haz clic en **"Sitemaps"** (Sitemaps)

### Paso 3: Agregar el Sitemap

1. En la sección **"Añadir un sitemap"** (Add a sitemap), verás un campo de texto
2. Ingresa la URL del sitemap:

   ```
   https://wetechlatam.com/sitemap.xml
   ```

   **Nota:** Solo necesitas ingresar la parte relativa del sitemap:

   ```
   sitemap.xml
   ```

   Google automáticamente agregará el dominio de tu propiedad.

3. Haz clic en **"Enviar"** (Submit)

### Paso 4: Verificar el Estado

Después de enviar el sitemap:

1. Aparecerá en la lista de **"Sitemaps enviados"** (Submitted sitemaps)
2. El estado inicial será **"Pendiente"** (Pending)
3. Google procesará el sitemap en las próximas horas/días
4. Una vez procesado, verás:
   - **Estado:** "Correcto" (Success) o "Error" (Error)
   - **URLs descubiertas:** Número de URLs encontradas en el sitemap
   - **Última lectura:** Fecha de la última vez que Google leyó el sitemap

## 📊 Contenido del Sitemap

El sitemap generado incluye:

### Rutas Estáticas

- **Página principal** (`/`) - Prioridad: 1.0, Frecuencia: diaria
- **Página de tienda** (`/shop`) - Prioridad: 0.9, Frecuencia: diaria

### Rutas Dinámicas

- **Productos** (`/product/[slug]`) - Prioridad: 0.8, Frecuencia: semanal
  - Se generan automáticamente desde la base de datos
  - Solo incluye productos activos (`isActive: true`)
  - Límite: hasta 10,000 productos

- **Tiendas** (`/store/[slug]`) - Prioridad: 0.7, Frecuencia: semanal
  - Se generan automáticamente desde la base de datos
  - Límite: hasta 5,000 tiendas

## 🔧 Configuración de Variables de Entorno

Asegúrate de tener configurada la variable de entorno en producción:

```env
NEXT_PUBLIC_BASE_URL=https://wetechlatam.com
```

**Importante:** Esta variable debe estar configurada correctamente para que el sitemap use las URLs correctas.

## 🔄 Actualización Automática

El sitemap se actualiza automáticamente:

- **Rutas estáticas:** Se regeneran en cada build
- **Rutas dinámicas:** Se generan desde la base de datos en tiempo de ejecución
- **Productos nuevos:** Se incluyen automáticamente cuando se crean
- **Productos actualizados:** Se reflejan con su fecha de última modificación

## 📝 Buenas Prácticas

### 1. Reenviar el Sitemap Después de Cambios Importantes

Si agregas muchos productos nuevos o cambias la estructura del sitio:

1. Ve a Google Search Console
2. Navega a **Sitemaps**
3. Haz clic en el sitemap existente
4. Haz clic en **"Probar sitemap"** (Test sitemap) o simplemente espera a que Google lo reprocese automáticamente

### 2. Monitorear Errores

Revisa regularmente:

- **Errores de rastreo:** En la sección "Cobertura" (Coverage)
- **Errores del sitemap:** En la sección "Sitemaps"
- **URLs excluidas:** Verifica que las URLs importantes no estén siendo excluidas

### 3. Verificar Indexación

Después de que Google procese el sitemap:

1. Ve a **"Páginas"** (Pages) en la sección "Indexación"
2. Verifica que las URLs importantes estén siendo indexadas
3. Usa **"Inspección de URLs"** (URL Inspection) para verificar URLs específicas

## 🐛 Solución de Problemas

### El sitemap muestra 0 URLs

**Causa:** La base de datos no está configurada o no hay productos/tiendas.

**Solución:**

1. Verifica que `DATABASE_URL` esté configurada correctamente
2. Ejecuta el seed de la base de datos: `npm run db:seed`
3. Verifica que haya productos activos en la base de datos

### El sitemap no se actualiza

**Causa:** Google puede tardar varios días en reprocesar el sitemap.

**Solución:**

1. Espera 24-48 horas para que Google detecte cambios
2. Usa "Solicitar indexación" (Request Indexing) para URLs específicas importantes
3. Verifica que el sitemap XML sea accesible públicamente

### URLs incorrectas en el sitemap

**Causa:** `NEXT_PUBLIC_BASE_URL` no está configurada correctamente.

**Solución:**

1. Verifica la variable de entorno en producción
2. Reinicia el servidor después de cambiar la variable
3. Verifica que el sitemap muestre las URLs correctas

## 📚 Recursos Adicionales

- [Documentación de Google Search Console](https://support.google.com/webmasters/answer/156184)
- [Guía de Sitemaps de Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Documentación de Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)

## ✅ Checklist de Verificación

- [ ] Sitio desplegado en producción
- [ ] Variable `NEXT_PUBLIC_BASE_URL` configurada correctamente
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] Robots.txt configurado correctamente
- [ ] Sitemap agregado en Google Search Console
- [ ] Sitemap procesado correctamente por Google
- [ ] URLs importantes aparecen en la indexación

---

**Última actualización:** Enero 2026
