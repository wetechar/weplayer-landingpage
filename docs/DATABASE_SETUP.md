# 🗄️ Configuración de Base de Datos - Antigravity

## Estado Actual

✅ **Base de datos configurada**: PostgreSQL en Vercel/Prisma  
✅ **Credenciales agregadas**: `.env.local` actualizado  
✅ **Prisma Accelerate**: Configurado para mejor rendimiento

## Variables de Entorno Configuradas

Las siguientes variables han sido agregadas a `.env.local`:

```env
DATABASE_URL="postgres://..."
POSTGRES_URL="postgres://..."
PRISMA_DATABASE_URL="prisma+postgres://..."
```

## Próximos Pasos

### 1. Generar Cliente de Prisma

```bash
npm run db:generate
```

Este comando genera el cliente de Prisma basado en el esquema definido en `prisma/schema.prisma`.

### 2. Aplicar el Esquema a la Base de Datos

Tienes dos opciones:

#### Opción A: Push (Desarrollo - Rápido)
```bash
npm run db:push
```

**Ventajas:**
- Rápido para desarrollo
- No crea archivos de migración
- Útil para prototipado

**Desventajas:**
- No recomendado para producción
- No mantiene historial de cambios

#### Opción B: Migrate (Producción - Recomendado)
```bash
npm run db:migrate
```

**Ventajas:**
- Crea archivos de migración
- Mantiene historial de cambios
- Mejor para producción y trabajo en equipo

**Desventajas:**
- Requiere nombrar la migración
- Más pasos

### 3. Verificar la Conexión

Puedes usar Prisma Studio para visualizar y editar datos:

```bash
npm run db:studio
```

Esto abrirá una interfaz web en `http://localhost:5555` donde podrás ver y editar los datos de la base de datos.

## Esquema de Base de Datos

El esquema incluye los siguientes modelos:

- **User**: Usuarios con roles (ADMIN, SELLER, CUSTOMER)
- **Store**: Tiendas de vendedores
- **Product**: Productos con relación a tienda
- **Order**: Pedidos de clientes
- **OrderItem**: Items de pedidos

## Prisma Accelerate

Se ha configurado Prisma Accelerate para mejorar el rendimiento:

- ✅ Conexiones pool optimizadas
- ✅ Cache de consultas
- ✅ Mejor latencia
- ✅ Escalabilidad mejorada

El cliente de Prisma automáticamente usará `PRISMA_DATABASE_URL` si está disponible, sino usará `DATABASE_URL`.

## Solución de Problemas

### Error: "DATABASE_URL must be provided"

Verifica que `.env.local` contenga las variables de entorno correctas.

### Error: "Can't reach database server"

1. Verifica que las credenciales sean correctas
2. Verifica que la base de datos esté activa en Vercel
3. Verifica la conectividad de red

### Error al hacer push/migrate

1. Verifica que el esquema esté correcto
2. Si hay conflictos, puedes resetear la base de datos (¡cuidado, esto elimina todos los datos!):
   ```bash
   npx prisma migrate reset
   ```

## Comandos Útiles

```bash
# Generar cliente
npm run db:generate

# Ver estado de migraciones
npx prisma migrate status

# Crear nueva migración
npm run db:migrate

# Aplicar push (desarrollo)
npm run db:push

# Abrir Prisma Studio
npm run db:studio

# Formatear schema
npx prisma format

# Validar schema
npx prisma validate
```

## Seguridad

⚠️ **IMPORTANTE**: 
- `.env.local` está en `.gitignore` y NO debe ser commiteado
- Las credenciales son sensibles y deben mantenerse privadas
- En producción, usa las variables de entorno de Vercel

## Referencias

- [Prisma Docs](https://www.prisma.io/docs)
- [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
