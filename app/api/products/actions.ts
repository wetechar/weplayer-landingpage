'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@auth0/nextjs-auth0';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Schema de validación para creación de productos
const createProductSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(200),
  slug: z
    .string()
    .min(1, 'El slug es requerido')
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'El slug solo puede contener letras minúsculas, números y guiones'),
  description: z.string().optional(),
  price: z.number().positive('El precio debe ser mayor a 0'),
  stock: z.number().int().min(0, 'El stock no puede ser negativo'),
  images: z.array(z.string().url('Debe ser una URL válida')).optional().default([]),
  storeId: z.string().min(1, 'El ID de la tienda es requerido'),
});

type CreateProductInput = z.infer<typeof createProductSchema>;

/**
 * Server Action para crear un producto
 * Valida que el usuario autenticado sea el dueño de la tienda
 */
export async function createProduct(input: CreateProductInput) {
  try {
    // Obtener sesión de Auth0
    // Nota: getSession() en Server Actions obtiene la sesión del request automáticamente
    const session = await getSession();

    if (!session || !session.user) {
      return {
        success: false,
        error: 'No autenticado. Debes iniciar sesión para crear productos.',
      };
    }

    const userId = session.user.sub as string;
    const userRole = (session.user as any)['https://antigravity.app/role'] as
      | string
      | undefined;

    // Validar que el usuario sea SELLER o ADMIN
    if (userRole !== 'SELLER' && userRole !== 'ADMIN') {
      return {
        success: false,
        error: 'No tienes permisos para crear productos. Se requiere rol de Vendedor o Administrador.',
      };
    }

    // Validar input con Zod
    const validatedInput = createProductSchema.parse(input);

    // Verificar que la tienda existe y que el usuario es el dueño
    const store = await prisma.store.findUnique({
      where: {
        id: validatedInput.storeId,
      },
      select: {
        id: true,
        ownerId: true,
      },
    });

    if (!store) {
      return {
        success: false,
        error: 'La tienda especificada no existe.',
      };
    }

    // Validar que el usuario es el dueño de la tienda (o es ADMIN)
    if (store.ownerId !== userId && userRole !== 'ADMIN') {
      return {
        success: false,
        error: 'No tienes permisos para crear productos en esta tienda. Solo el dueño puede crear productos.',
      };
    }

    // Verificar que el slug sea único dentro de la tienda
    const existingProduct = await prisma.product.findUnique({
      where: {
        storeId_slug: {
          storeId: validatedInput.storeId,
          slug: validatedInput.slug,
        },
      },
    });

    if (existingProduct) {
      return {
        success: false,
        error: `Ya existe un producto con el slug "${validatedInput.slug}" en esta tienda.`,
      };
    }

    // Crear el producto
    const product = await prisma.product.create({
      data: {
        name: validatedInput.name,
        slug: validatedInput.slug,
        description: validatedInput.description,
        price: validatedInput.price,
        stock: validatedInput.stock,
        images: validatedInput.images || [],
        storeId: validatedInput.storeId,
      },
      include: {
        store: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    // Revalidar las rutas relacionadas
    revalidatePath(`/store/${product.store.slug}`);
    revalidatePath(`/product/${product.slug}`);
    revalidatePath(`/seller/products`);

    return {
      success: true,
      data: product,
      message: 'Producto creado exitosamente.',
    };
  } catch (error) {
    // Manejo de errores de validación de Zod
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => e.message).join(', '),
      };
    }

    // Manejo de otros errores
    console.error('Error al crear producto:', error);
    return {
      success: false,
      error: 'Error interno del servidor. Por favor, intenta nuevamente.',
    };
  }
}

/**
 * Server Action para actualizar un producto
 * Valida que el usuario autenticado sea el dueño de la tienda
 */
export async function updateProduct(
  productId: string,
  input: Partial<CreateProductInput>
) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      return {
        success: false,
        error: 'No autenticado.',
      };
    }

    const userId = session.user.sub as string;
    const userRole = (session.user as any)['https://antigravity.app/role'] as
      | string
      | undefined;

    // Obtener el producto y su tienda
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        store: {
          select: {
            id: true,
            ownerId: true,
            slug: true,
          },
        },
      },
    });

    if (!product) {
      return {
        success: false,
        error: 'Producto no encontrado.',
      };
    }

    // Validar permisos
    if (product.store.ownerId !== userId && userRole !== 'ADMIN') {
      return {
        success: false,
        error: 'No tienes permisos para editar este producto.',
      };
    }

    // Actualizar el producto
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...(input.name && { name: input.name }),
        ...(input.slug && { slug: input.slug }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.price !== undefined && { price: input.price }),
        ...(input.stock !== undefined && { stock: input.stock }),
        ...(input.images !== undefined && { images: input.images }),
      },
    });

    // Revalidar rutas
    revalidatePath(`/store/${product.store.slug}`);
    revalidatePath(`/product/${updatedProduct.slug}`);
    revalidatePath(`/seller/products`);

    return {
      success: true,
      data: updatedProduct,
      message: 'Producto actualizado exitosamente.',
    };
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    return {
      success: false,
      error: 'Error interno del servidor.',
    };
  }
}
