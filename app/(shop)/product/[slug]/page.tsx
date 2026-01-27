import { notFound } from 'next/navigation';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';

// Cache directive para optimización de rendimiento
const getProduct = cache(async (slug: string) => {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      store: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  return product;
});

// Next.js 15.1: params es una Promise que debe ser await
export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Desestructurar params como Promise (Next.js 15.1)
  const { slug } = await params;
  const searchParamsResolved = await searchParams;

  // Fetch del producto usando Server Component
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <a href="/" className="hover:text-foreground">
            Inicio
          </a>
          {' / '}
          <a href={`/store/${product.store.slug}`} className="hover:text-foreground">
            {product.store.name}
          </a>
          {' / '}
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Info */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Images */}
          <div className="space-y-4">
            {product.images.length > 0 ? (
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Sin imagen</span>
              </div>
            )}
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(1, 5).map((image, idx) => (
                  <div
                    key={idx}
                    className="aspect-square rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${idx + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">
                Vendido por{' '}
                <a
                  href={`/store/${product.store.slug}`}
                  className="text-primary hover:underline"
                >
                  {product.store.name}
                </a>
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {product.description && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Stock disponible: {product.stock > 0 ? product.stock : 'Agotado'}
              </p>
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
              <button
                disabled={product.stock === 0}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {product.stock > 0 ? 'Agregar al Carrito' : 'Producto Agotado'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Metadata para SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} | Antigravity`,
    description: product.description || `Compra ${product.name} en Antigravity`,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}
