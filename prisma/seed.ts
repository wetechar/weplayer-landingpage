import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes (opcional - comentar si no quieres borrar datos)
  console.log('🧹 Limpiando datos existentes...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  // Crear usuarios
  console.log('👥 Creando usuarios...');
  
  const admin = await prisma.user.create({
    data: {
      id: 'auth0|admin001',
      email: 'admin@wetech.com',
      name: 'Administrador',
      role: 'ADMIN',
    },
  });

  const seller1 = await prisma.user.create({
    data: {
      id: 'auth0|seller001',
      email: 'vendedor1@wetech.com',
      name: 'Vendedor Uno',
      role: 'SELLER',
    },
  });

  const seller2 = await prisma.user.create({
    data: {
      id: 'auth0|seller002',
      email: 'vendedor2@wetech.com',
      name: 'Vendedor Dos',
      role: 'SELLER',
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      id: 'auth0|customer001',
      email: 'cliente1@wetech.com',
      name: 'Cliente Uno',
      role: 'CUSTOMER',
    },
  });

  const customer2 = await prisma.user.create({
    data: {
      id: 'auth0|customer002',
      email: 'cliente2@wetech.com',
      name: 'Cliente Dos',
      role: 'CUSTOMER',
    },
  });

  // Crear tiendas
  console.log('🏪 Creando tiendas...');
  
  const store1 = await prisma.store.create({
    data: {
      name: 'Tienda Tecnológica Premium',
      slug: 'tienda-tecnologica-premium',
      description: 'Los mejores productos tecnológicos del mercado',
      ownerId: seller1.id,
    },
  });

  const store2 = await prisma.store.create({
    data: {
      name: 'Electrónica Express',
      slug: 'electronica-express',
      description: 'Dispositivos electrónicos de última generación',
      ownerId: seller2.id,
    },
  });

  // Crear productos
  console.log('📦 Creando productos...');
  
  const product1 = await prisma.product.create({
    data: {
      name: 'Laptop Gaming Pro',
      slug: 'laptop-gaming-pro',
      description: 'Laptop de alto rendimiento para gaming y trabajo profesional',
      price: 1299.99,
      stock: 15,
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=800&fit=crop',
      ],
      isActive: true,
      storeId: store1.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Smartphone Ultra',
      slug: 'smartphone-ultra',
      description: 'Teléfono inteligente con las mejores características',
      price: 899.99,
      stock: 30,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
      ],
      isActive: true,
      storeId: store1.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Tablet Pro 12',
      slug: 'tablet-pro-12',
      description: 'Tablet profesional de 12 pulgadas',
      price: 599.99,
      stock: 20,
      images: [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=800&fit=crop',
      ],
      isActive: true,
      storeId: store2.id,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: 'Auriculares Inalámbricos',
      slug: 'auriculares-inalambricos',
      description: 'Auriculares con cancelación de ruido activa',
      price: 199.99,
      stock: 50,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
      ],
      isActive: true,
      storeId: store2.id,
    },
  });

  // Crear órdenes
  console.log('🛒 Creando órdenes...');
  
  const order1 = await prisma.order.create({
    data: {
      userId: customer1.id,
      status: 'PENDING',
      total: 1299.99,
      items: {
        create: {
          productId: product1.id,
          quantity: 1,
          price: 1299.99,
        },
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      userId: customer2.id,
      status: 'PROCESSING',
      total: 1099.98,
      items: {
        create: [
          {
            productId: product2.id,
            quantity: 1,
            price: 899.99,
          },
          {
            productId: product4.id,
            quantity: 1,
            price: 199.99,
          },
        ],
      },
    },
  });

  console.log('✅ Seed completado exitosamente!');
  console.log(`
📊 Resumen:
- ${await prisma.user.count()} usuarios creados
- ${await prisma.store.count()} tiendas creadas
- ${await prisma.product.count()} productos creados
- ${await prisma.order.count()} órdenes creadas
  `);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
