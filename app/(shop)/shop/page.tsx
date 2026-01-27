import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ShoppingBag } from 'lucide-react';

// Función para obtener productos con cache
async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
      },
      include: {
        store: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      take: 50, // Límite inicial
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nuestra Tienda
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre nuestra selección de productos y soluciones tecnológicas
            para transformar tus espacios
          </p>
        </div>

        {/* Productos */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Próximamente
            </h2>
            <p className="text-muted-foreground">
              Estamos preparando productos increíbles para ti. Vuelve pronto.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Imagen del producto */}
                <div className="aspect-square bg-muted relative overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-16 h-16 text-muted-foreground opacity-30" />
                    </div>
                  )}
                </div>

                {/* Información del producto */}
                <div className="p-4">
                  <div className="mb-2">
                    <p className="text-xs text-muted-foreground mb-1">
                      {product.store.name}
                    </p>
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {product.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {product.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.stock > 0 ? (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        En stock
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        Agotado
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Metadata para SEO
export const metadata = {
  title: 'Tienda | We Tech',
  description:
    'Descubre nuestra selección de productos y soluciones tecnológicas para transformar tus espacios',
};
