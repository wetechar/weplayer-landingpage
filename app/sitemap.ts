import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

// URL base del sitio
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wetechlatam.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Rutas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Rutas dinámicas de productos (si la base de datos está configurada)
  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    // Obtener todos los productos activos
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
      },
      take: 10000, // Límite aumentado para sitemaps grandes (Google permite hasta 50,000 URLs)
      orderBy: {
        updatedAt: 'desc',
      },
    });

    productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.updatedAt || product.createdAt || now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch (error) {
    // Si hay error (BD no configurada, etc.), simplemente no incluimos productos
    console.warn('No se pudieron obtener productos para el sitemap:', error);
  }

  // Obtener tiendas activas (si existen y tienen página pública)
  let storeRoutes: MetadataRoute.Sitemap = [];

  try {
    const stores = await prisma.store.findMany({
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
      },
      take: 5000,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    storeRoutes = stores.map((store) => ({
      url: `${baseUrl}/store/${store.slug}`,
      lastModified: store.updatedAt || store.createdAt || now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.warn('No se pudieron obtener tiendas para el sitemap:', error);
  }

  // Combinar todas las rutas
  const allRoutes = [...staticRoutes, ...productRoutes, ...storeRoutes];

  // Log para debugging (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log(`✅ Sitemap generado con ${allRoutes.length} URLs`);
    console.log(`   - Rutas estáticas: ${staticRoutes.length}`);
    console.log(`   - Productos: ${productRoutes.length}`);
    console.log(`   - Tiendas: ${storeRoutes.length}`);
  }

  return allRoutes;
}
