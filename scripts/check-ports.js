import { exec } from 'child_process';
import { promisify } from 'util';
import { platform } from 'os';

const execAsync = promisify(exec);
const isWindows = platform() === 'win32';

// Detectar si estamos en producción (Vercel, CI/CD, etc.)
// Solo ejecutar en desarrollo local, NO en producción
const isProduction = 
  process.env.NODE_ENV === 'production' || 
  process.env.VERCEL === '1' || 
  process.env.VERCEL_ENV === 'production' ||
  process.env.VERCEL_ENV === 'preview' ||
  process.env.CI === 'true' ||
  process.env.CONTINUOUS_INTEGRATION === 'true' ||
  process.env.GITHUB_ACTIONS === 'true';

// Si estamos en producción, salir inmediatamente sin hacer nada
if (isProduction) {
  console.log('ℹ️  Entorno de producción detectado. Saltando verificación de puertos.');
  process.exit(0);
}

/**
 * Verifica si un puerto está en uso (solo LISTENING, no TIME_WAIT u otros estados)
 */
async function isPortInUse(port) {
  try {
    if (isWindows) {
      // Buscar específicamente conexiones LISTENING
      const { stdout } = await execAsync(`netstat -ano | findstr :${port} | findstr LISTENING`);
      return stdout.trim().length > 0;
    } else {
      // Linux/Mac
      const { stdout } = await execAsync(`lsof -Pi :${port} -sTCP:LISTEN -t`);
      return stdout.trim().length > 0;
    }
  } catch (error) {
    // Si no encuentra nada, el puerto está libre
    return false;
  }
}

/**
 * Obtiene el PID del proceso que está usando un puerto
 */
async function getProcessId(port) {
  try {
    if (isWindows) {
      // Usar netstat para obtener conexiones LISTENING en el puerto específico
      const { stdout } = await execAsync(`netstat -ano | findstr :${port} | findstr LISTENING`);
      if (stdout && stdout.trim()) {
        const lines = stdout.trim().split('\n');
        for (const line of lines) {
          // El formato es: TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING    12345
          const parts = line.trim().split(/\s+/);
          // El PID es la última columna
          const pid = parts[parts.length - 1];
          if (pid && !isNaN(pid) && parseInt(pid) > 0) {
            return pid;
          }
        }
      }
      
      // Si no encontramos LISTENING, intentar con cualquier conexión
      const { stdout: stdout2 } = await execAsync(`netstat -ano | findstr :${port}`);
      if (stdout2 && stdout2.trim()) {
        const lines = stdout2.trim().split('\n');
        // Buscar la línea que tenga el puerto y un PID válido
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && !isNaN(pid) && parseInt(pid) > 0) {
            return pid;
          }
        }
      }
      return null;
    } else {
      // Linux/Mac
      const { stdout } = await execAsync(`lsof -Pi :${port} -sTCP:LISTEN -t`);
      const pid = stdout.trim().split('\n')[0];
      return pid && !isNaN(pid) ? pid : null;
    }
  } catch (error) {
    return null;
  }
}

/**
 * Mata un proceso por su PID
 */
async function killProcess(pid) {
  try {
    if (isWindows) {
      await execAsync(`taskkill /PID ${pid} /F`);
    } else {
      await execAsync(`kill -9 ${pid}`);
    }
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Obtiene el nombre del proceso por su PID
 */
async function getProcessName(pid) {
  try {
    if (isWindows) {
      const { stdout } = await execAsync(`tasklist /FI "PID eq ${pid}" /FO CSV /NH`);
      if (stdout && stdout.trim()) {
        const parts = stdout.split(',');
        if (parts.length > 0) {
          return parts[0].replace(/"/g, '');
        }
      }
    } else {
      // Linux/Mac
      const { stdout } = await execAsync(`ps -p ${pid} -o comm=`);
      if (stdout && stdout.trim()) {
        return stdout.trim();
      }
    }
    return 'Unknown';
  } catch (error) {
    return 'Unknown';
  }
}

/**
 * Verifica y libera puertos si es necesario
 */
async function checkAndFreePorts(ports, autoKill = false) {
  const results = [];

  for (const port of ports) {
    const inUse = await isPortInUse(port);
    
    if (inUse) {
      console.log(`⚠️  Puerto ${port} está en uso`);
      
      const pid = await getProcessId(port);
      if (pid) {
        const processName = await getProcessName(pid);
        console.log(`   Proceso: ${processName} (PID: ${pid})`);
        
        let shouldKill = autoKill;
        
        // Si no es automático, preguntar (solo en modo interactivo)
        if (!autoKill && process.stdin.isTTY) {
          // En modo no interactivo, intentar matar automáticamente
          shouldKill = true;
        }
        
        if (shouldKill) {
          // Intentar matar el proceso
          console.log(`   Intentando liberar el puerto ${port}...`);
          const killed = await killProcess(pid);
          
          if (killed) {
            // Esperar un momento para que el puerto se libere
            await new Promise(resolve => setTimeout(resolve, 500));
            console.log(`   ✅ Puerto ${port} liberado exitosamente`);
            results.push({ port, status: 'freed', pid, processName });
          } else {
            console.log(`   ❌ No se pudo liberar el puerto ${port}`);
            results.push({ port, status: 'failed', pid, processName });
          }
        } else {
          console.log(`   ⏭️  Saltando puerto ${port} (no se liberó automáticamente)`);
          results.push({ port, status: 'skipped', pid, processName });
        }
      } else {
        console.log(`   ⚠️  No se pudo identificar el proceso usando el puerto ${port}`);
        results.push({ port, status: 'unknown' });
      }
    } else {
      console.log(`✅ Puerto ${port} está libre`);
      results.push({ port, status: 'free' });
    }
  }

  return results;
}

// Ejecutar verificación
async function main() {
  // Verificar si se pasa --auto-kill como argumento
  const autoKill = process.argv.includes('--auto-kill') || process.argv.includes('-y');
  
  console.log('🔍 Verificando puertos 3000 y 3001...\n');
  
  const ports = [3000, 3001];
  const results = await checkAndFreePorts(ports, autoKill);
  
  console.log('\n📊 Resumen:');
  results.forEach(({ port, status }) => {
    const icon = status === 'free' || status === 'freed' ? '✅' : '❌';
    console.log(`   ${icon} Puerto ${port}: ${status}`);
  });
  
  // Verificar si hay errores o puertos que no se pudieron liberar
  const hasErrors = results.some(r => 
    r.status === 'failed' || 
    r.status === 'unknown' || 
    r.status === 'skipped'
  );
  
  if (hasErrors) {
    const failedPorts = results.filter(r => r.status === 'failed' || r.status === 'skipped');
    if (failedPorts.length > 0) {
      console.log('\n⚠️  Algunos puertos no están disponibles:');
      failedPorts.forEach(({ port, pid, processName }) => {
        console.log(`   - Puerto ${port} (PID: ${pid || 'N/A'}, Proceso: ${processName || 'Unknown'})`);
      });
      console.log('\n   Por favor, ciérralos manualmente antes de continuar.');
      console.log('   Puedes usar: npm run kill-ports para intentar liberarlos automáticamente.');
    }
    process.exit(1);
  } else {
    console.log('\n✅ Todos los puertos están listos para usar.');
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('❌ Error al verificar puertos:', error.message);
  process.exit(1);
});
