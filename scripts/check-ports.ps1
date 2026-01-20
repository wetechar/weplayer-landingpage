# Script PowerShell para verificar y liberar puertos en Windows

$ports = @(3000, 3001)
$results = @()

Write-Host "🔍 Verificando puertos 3000 y 3001...`n" -ForegroundColor Cyan

foreach ($port in $ports) {
    Write-Host "Verificando puerto $port..." -NoNewline
    
    # Verificar si el puerto está en uso
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    
    if ($connection) {
        $pid = $connection.OwningProcess
        $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
        $processName = if ($process) { $process.ProcessName } else { "Unknown" }
        
        Write-Host " ⚠️  EN USO" -ForegroundColor Yellow
        Write-Host "   Proceso: $processName (PID: $pid)" -ForegroundColor Yellow
        
        # Preguntar si desea matar el proceso
        $response = Read-Host "   ¿Deseas liberar el puerto $port? (S/N)"
        
        if ($response -eq "S" -or $response -eq "s" -or $response -eq "Y" -or $response -eq "y") {
            try {
                Stop-Process -Id $pid -Force -ErrorAction Stop
                Write-Host "   ✅ Puerto $port liberado exitosamente" -ForegroundColor Green
                $results += @{ Port = $port; Status = "freed"; PID = $pid; Process = $processName }
            } catch {
                Write-Host "   ❌ No se pudo liberar el puerto $port: $_" -ForegroundColor Red
                $results += @{ Port = $port; Status = "failed"; PID = $pid; Process = $processName }
            }
        } else {
            Write-Host "   ⏭️  Saltando puerto $port" -ForegroundColor Yellow
            $results += @{ Port = $port; Status = "skipped"; PID = $pid; Process = $processName }
        }
    } else {
        Write-Host " ✅ LIBRE" -ForegroundColor Green
        $results += @{ Port = $port; Status = "free" }
    }
}

Write-Host "`n📊 Resumen:" -ForegroundColor Cyan
foreach ($result in $results) {
    $icon = if ($result.Status -eq "free" -or $result.Status -eq "freed") { "✅" } else { "❌" }
    Write-Host "   $icon Puerto $($result.Port): $($result.Status)"
}

# Verificar si hay puertos que no se pudieron liberar
$hasErrors = $results | Where-Object { $_.Status -eq "failed" -or $_.Status -eq "skipped" }

if ($hasErrors) {
    Write-Host "`n⚠️  Algunos puertos no están disponibles." -ForegroundColor Yellow
    Write-Host "   Por favor, ciérralos manualmente antes de continuar." -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "`n✅ Todos los puertos están listos para usar." -ForegroundColor Green
    exit 0
}
