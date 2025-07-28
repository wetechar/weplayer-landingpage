# 📊 Configuración de Analytics - We Player Landing

## Google Analytics 4

### 1. Crear cuenta de Google Analytics

1. Ve a [Google Analytics](https://analytics.google.com/)
2. Crea una nueva cuenta para "We Tech"
3. Crea una nueva propiedad para "We Player Landing"
4. Selecciona "Web" como plataforma

### 2. Obtener Measurement ID

1. En la configuración de la propiedad
2. Busca "Data Streams" > "Web stream"
3. Copia el **Measurement ID** (formato: G-XXXXXXXXXX)

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# EmailJS (opcional)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_weplayer_landing
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_weplayer_contact
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_EMAILJS_PUBLIC_KEY
```

### 4. Eventos que se trackean automáticamente

#### 📈 **Páginas vistas**

- Visitas a la landing page
- Tiempo en página
- Fuentes de tráfico

#### 🖱️ **Clicks en botones**

- "Solicitar Demo" (navegación)
- "Ver Demo" (hero)
- "Solicitar Información" (hero)

#### 📝 **Formularios**

- Envío del formulario de contacto
- Campos completados

#### 📜 **Scroll**

- 25% de scroll
- 50% de scroll
- 75% de scroll
- 100% de scroll

### 5. Métricas disponibles en Google Analytics

#### **Audiencia**

- Usuarios únicos
- Sesiones
- Páginas vistas
- Tiempo promedio en página
- Tasa de rebote

#### **Adquisición**

- Fuentes de tráfico
- Canales de marketing
- Campañas
- Palabras clave

#### **Comportamiento**

- Páginas más visitadas
- Flujo de usuarios
- Eventos personalizados
- Scroll depth

#### **Conversiones**

- Envíos de formulario
- Clicks en CTA
- Engagement rate

### 6. Configuración adicional recomendada

#### **Objetivos (Goals)**

1. **Formulario enviado**: Conversión cuando se envía el formulario
2. **Scroll 50%**: Engagement cuando el usuario llega a la mitad
3. **Click en CTA**: Conversión cuando se hace click en botones principales

#### **Audiencias**

1. **Visitantes recurrentes**: Usuarios que vuelven
2. **Engaged users**: Usuarios que hacen scroll > 50%
3. **Form completers**: Usuarios que llenan el formulario

### 7. Dashboard recomendado

#### **Métricas principales**

- Usuarios únicos (diario/semanal)
- Tasa de conversión del formulario
- Fuentes de tráfico principales
- Tiempo promedio en página

#### **Eventos importantes**

- Formularios enviados
- Clicks en "Solicitar Demo"
- Scroll depth promedio

### 8. Configuración de privacidad

#### **GDPR/CCPA Compliance**

- El tracking respeta las preferencias del usuario
- No se almacenan datos personales
- Cumple con las regulaciones de privacidad

#### **Configuración de cookies**

- Google Analytics usa cookies para tracking
- Los usuarios pueden opt-out
- Información disponible en la política de privacidad

## 🚀 Implementación

Una vez configurado, podrás ver:

1. **Visitas en tiempo real** en Google Analytics
2. **Fuentes de tráfico** (Google, redes sociales, directo)
3. **Comportamiento de usuarios** (scroll, clicks, formularios)
4. **Conversiones** y objetivos alcanzados
5. **Análisis de rendimiento** de la landing page

## 📊 Métricas clave a monitorear

- **Tasa de conversión del formulario**
- **Tiempo promedio en página**
- **Tasa de rebote**
- **Fuentes de tráfico más efectivas**
- **Eventos de engagement** (scroll, clicks)
