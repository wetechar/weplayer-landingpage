
/**
 * Configuración de Instagram
 * 
 * Para usar la API de Instagram:
 * 1. Crea una app en https://developers.facebook.com/
 * 2. Agrega el producto "Instagram Graph API"
 * 3. Obtén un Access Token de larga duración
 * 4. Obtén tu Instagram User ID (puedes usar: https://www.instagram.com/{username}/?__a=1&__d=dis)
 * 
 * O usa posts de fallback configurándolos manualmente
 */

export const INSTAGRAM_CONFIG = {
  // Token de acceso de Instagram Graph API (opcional)
  // Obténlo desde: https://developers.facebook.com/tools/explorer/
  accessToken: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || '',
  
  // Instagram User ID (opcional)
  // Encuéntralo en: https://www.instagram.com/{username}/?__a=1&__d=dis
  userId: import.meta.env.VITE_INSTAGRAM_USER_ID || '',
  
  // Posts de fallback (se usan si no hay token o si falla la API)
  fallbackPosts: [
    {
      imageUrl: 'https://instagram.faep14-3.fna.fbcdn.net/v/t51.82787-15/558948072_17949088287042079_4235155994694378207_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=MzczMzgxMDIwMDUwMDM1ODA1NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEwODB4MTM1MC5zZHIuQzMifQ%3D%3D&_nc_ohc=aCbTbNpst-oQ7kNvwGPprMs&_nc_oc=AdnOzvo09E2Ua8_wBt16y4YRnRaTXsHbxzbwAmyAQSKLy5Qw1ZR9oPdAJ0Ti9SY1ADU&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.faep14-3.fna&_nc_gid=A5iLWuXp5Zl6T5uHC8z_uQ&oh=00_AfpTJz12xLj6VeA664lM-_vVmAoA3w9VbbxsS7ggwf9gUQ&oe=697469FB',
      permalink: 'https://www.instagram.com/p/DMX6m7IsL_K/',
      videoUrl: undefined,
    },
    // Agrega más posts aquí si quieres tener varios de respaldo
  ],
  
  // Número máximo de posts a mostrar
  maxPosts: 1,
};
