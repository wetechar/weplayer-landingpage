# 🔍 Scripts de Verificación de Puertos

Este directorio contiene scripts para verificar y liberar los puertos 3000 y 3001 antes de ejecutar la aplicación.

## 📋 Scripts Disponibles

### `check-ports.js` (Node.js - Multiplataforma)

Script principal que funciona en Windows, Linux y Mac.

**Uso básico:**
```bash
npm run check-ports
```

**Liberar puertos automáticamente:**
```bash
npm run kill-ports
# o
node scripts/check-ports.js --auto-kill
```

### `check-ports.ps1` (PowerShell - Solo Windows)

Script alternativo para Windows con interfaz interactiva.

**Uso:**
```powershell
.\scripts\check-ports.ps1
```

### `check-ports.sh` (Bash - Linux/Mac)

Script alternativo para sistemas Unix con interfaz interactiva.

**Uso:**
```bash
chmod +x scripts/check-ports.sh
./scripts/check-ports.sh
```

## 🚀 Integración Automática

Los scripts están integrados automáticamente en los comandos de desarrollo:

- `npm run dev` - Verifica puertos antes de iniciar Vite
- `npm run dev:server` - Verifica puertos antes de iniciar el servidor API
- `npm run dev:all` - Verifica puertos antes de iniciar ambos servicios
- `npm run server` - Verifica puertos antes de iniciar el servidor en producción

## ⚙️ Funcionamiento

1. **Verificación**: El script verifica si los puertos 3000 y 3001 están en uso
2. **Identificación**: Si están en uso, identifica el proceso (PID y nombre)
3. **Liberación**: Intenta liberar los puertos automáticamente (con `--auto-kill`)
4. **Reporte**: Muestra un resumen del estado de cada puerto

## 🔧 Solución de Problemas

### Los puertos no se liberan automáticamente

Si el script no puede liberar los puertos automáticamente:

1. **Windows**: Abre el Administrador de Tareas y termina el proceso manualmente
2. **Linux/Mac**: Usa `kill -9 <PID>` para terminar el proceso

### El script muestra "unknown" para el proceso

Esto puede ocurrir si:
- El proceso ya terminó pero el puerto aún está en estado TIME_WAIT
- No tienes permisos para ver el proceso
- El formato de salida del sistema operativo cambió

**Solución**: Espera unos segundos y vuelve a ejecutar el script, o reinicia tu computadora.

## 📝 Notas

- El script solo verifica conexiones **LISTENING**, ignorando estados como TIME_WAIT o FIN_WAIT_2
- Los puertos en estado TIME_WAIT se liberan automáticamente después de unos minutos
- En producción, asegúrate de que los puertos estén disponibles antes de desplegar
