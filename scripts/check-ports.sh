#!/bin/bash

# Script bash para verificar y liberar puertos en Linux/Mac

PORTS=(3000 3001)
RESULTS=()

echo "🔍 Verificando puertos 3000 y 3001..."
echo ""

for port in "${PORTS[@]}"; do
    echo -n "Verificando puerto $port... "
    
    # Verificar si el puerto está en uso
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        PID=$(lsof -Pi :$port -sTCP:LISTEN -t | head -n 1)
        PROCESS=$(ps -p $PID -o comm= 2>/dev/null || echo "Unknown")
        
        echo "⚠️  EN USO"
        echo "   Proceso: $PROCESS (PID: $PID)"
        
        # Preguntar si desea matar el proceso
        read -p "   ¿Deseas liberar el puerto $port? (S/N): " response
        
        if [[ "$response" =~ ^[SsYy]$ ]]; then
            if kill -9 $PID 2>/dev/null; then
                echo "   ✅ Puerto $port liberado exitosamente"
                RESULTS+=("$port:freed:$PID:$PROCESS")
            else
                echo "   ❌ No se pudo liberar el puerto $port"
                RESULTS+=("$port:failed:$PID:$PROCESS")
            fi
        else
            echo "   ⏭️  Saltando puerto $port"
            RESULTS+=("$port:skipped:$PID:$PROCESS")
        fi
    else
        echo "✅ LIBRE"
        RESULTS+=("$port:free")
    fi
done

echo ""
echo "📊 Resumen:"
for result in "${RESULTS[@]}"; do
    IFS=':' read -r port status <<< "$result"
    if [[ "$status" == "free" || "$status" == "freed" ]]; then
        echo "   ✅ Puerto $port: $status"
    else
        echo "   ❌ Puerto $port: $status"
    fi
done

# Verificar si hay errores
HAS_ERRORS=false
for result in "${RESULTS[@]}"; do
    if [[ "$result" == *"failed"* ]] || [[ "$result" == *"skipped"* ]]; then
        HAS_ERRORS=true
        break
    fi
done

if [ "$HAS_ERRORS" = true ]; then
    echo ""
    echo "⚠️  Algunos puertos no están disponibles."
    echo "   Por favor, ciérralos manualmente antes de continuar."
    exit 1
else
    echo ""
    echo "✅ Todos los puertos están listos para usar."
    exit 0
fi
