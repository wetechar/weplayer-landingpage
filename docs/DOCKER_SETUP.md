# 🐳 Configuración de Base de Datos Local con Docker

## ✅ Configuración Completada

Se ha configurado Docker Compose para ejecutar PostgreSQL localmente durante el desarrollo.

## 📁 Archivos Creados

### 1. `docker-compose.yml`
Configuración de Docker Compose con:
- PostgreSQL 15
- Usuario: `wetechar`
- Contraseña: `wetechar`
- Base de datos: `shop_dev`
- Puerto: `5432`
- Volumen persistente para datos

### 2. `.env.local` (Actualizado)
Configurado con valores de desarrollo local:
- `DATABASE_URL` apunta a `localhost:5432`
- Variables de producción comentadas

### 3. `.env` (Creado)
Archivo necesario para Prisma CLI:
- Prisma CLI busca `.env` (no `.env.local`)
- Contiene `DATABASE_URL` para que Prisma pueda conectarse
- Debe tener la misma `DATABASE_URL` que `.env.local`

## 🚀 Inicio Rápido

### 1. Iniciar Base de Datos

```bash
# Iniciar contenedor PostgreSQL
docker-compose up -d
```

Esto creará y iniciará el contenedor en segundo plano.

### 2. Verificar que está funcionando

```bash
# Ver logs del contenedor
docker-compose logs postgres

# Verificar estado
docker-compose ps
```

Deberías ver algo como:
```
NAME                STATUS          PORTS
shop-postgres-dev   Up (healthy)    0.0.0.0:5432->5432/tcp
```

### 3. Aplicar el Esquema de Prisma

```bash
# Generar cliente Prisma
npm run db:generate

# Aplicar esquema a la base de datos
npm run db:push
```

### 4. Verificar con Prisma Studio

```bash
npm run db:studio
```

Esto abrirá Prisma Studio en `http://localhost:5555` donde podrás ver y editar los datos.

## 📋 Comandos Útiles de Docker

### Iniciar/Detener

```bash
# Iniciar
docker-compose up -d

# Detener (mantiene datos)
docker-compose stop

# Detener y eliminar contenedor (mantiene datos)
docker-compose down

# Detener y eliminar TODO (incluyendo datos)
docker-compose down -v
```

### Ver Logs

```bash
# Ver logs en tiempo real
docker-compose logs -f postgres

# Ver últimas 50 líneas
docker-compose logs --tail=50 postgres
```

### Acceder a PostgreSQL

```bash
# Acceder con psql
docker-compose exec postgres psql -U wetechar -d shop_dev

# O desde fuera del contenedor (si tienes psql instalado)
psql -h localhost -U wetechar -d shop_dev
```

### Reiniciar Base de Datos

```bash
# Reiniciar contenedor
docker-compose restart postgres

# Recrear desde cero (elimina datos)
docker-compose down -v
docker-compose up -d
```

## 🔧 Configuración

### Credenciales

- **Usuario**: `wetechar`
- **Contraseña**: `wetechar`
- **Base de datos**: `shop_dev`
- **Puerto**: `5432`
- **Host**: `localhost`

### URL de Conexión

**Desarrollo Local** (sin SSL):
```
postgresql://wetechar:wetechar@localhost:5432/shop_dev?sslmode=disable
```

**Producción** (con SSL):
```
postgresql://usuario:password@host:5432/database?sslmode=require
```

**Nota**: Para desarrollo local con Docker, usamos `sslmode=disable` porque PostgreSQL local no tiene TLS configurado. En producción siempre se usa `sslmode=require`.

## 📊 Estructura de Datos

Los datos se almacenan en un volumen de Docker llamado `postgres_data`. Esto significa que:

- ✅ Los datos persisten aunque reinicies el contenedor
- ✅ Los datos se mantienen aunque elimines el contenedor (con `docker-compose down`)
- ⚠️ Los datos se eliminan solo con `docker-compose down -v`

### Ubicación del Volumen

En Windows, Docker almacena los volúmenes en:
```
\\wsl$\docker-desktop-data\data\docker\volumes\
```

## 🔄 Flujo de Trabajo

### Desarrollo Diario

```bash
# 1. Iniciar base de datos (si no está corriendo)
docker-compose up -d

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Trabajar normalmente
# Los cambios en schema.prisma requieren:
npm run db:push
```

### Al Finalizar el Día

```bash
# Opción 1: Dejar corriendo (recomendado)
# No hacer nada, los datos se mantienen

# Opción 2: Detener (mantiene datos)
docker-compose stop

# Opción 3: Eliminar todo (elimina datos)
docker-compose down -v
```

## 🐛 Solución de Problemas

### Error: "Port 5432 is already in use"

**Causa**: Ya hay un PostgreSQL corriendo en el puerto 5432.

**Solución**:
```bash
# Opción 1: Cambiar puerto en docker-compose.yml
ports:
  - "5433:5432"  # Usar puerto 5433 en lugar de 5432

# Opción 2: Detener PostgreSQL local
# Windows: Services → PostgreSQL → Stop
```

### Error: "Cannot connect to database"

**Verificar**:
1. Contenedor está corriendo: `docker-compose ps`
2. Puerto está disponible: `netstat -an | findstr 5432`
3. Credenciales en `.env.local` son correctas

### Error: "Database does not exist"

**Solución**:
```bash
# El contenedor crea la BD automáticamente
# Si no existe, recrear:
docker-compose down -v
docker-compose up -d
```

### Reiniciar desde Cero

```bash
# Eliminar todo y empezar de nuevo
docker-compose down -v
docker-compose up -d
npm run db:push
```

## 🔐 Seguridad

⚠️ **IMPORTANTE**: 
- Las credenciales en `docker-compose.yml` son para **desarrollo local únicamente**
- **NUNCA** uses estas credenciales en producción
- El archivo `docker-compose.yml` puede commitearse (no contiene secretos sensibles)
- `.env.local` está en `.gitignore` y no se commitea

## 📚 Referencias

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Prisma with Docker](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-docker)

## ✅ Checklist de Configuración

- [x] `docker-compose.yml` creado
- [x] `.env.local` actualizado con valores locales
- [ ] Docker instalado y funcionando
- [ ] Contenedor iniciado (`docker-compose up -d`)
- [ ] Esquema aplicado (`npm run db:push`)
- [ ] Prisma Studio funcionando (`npm run db:studio`)
