# Asistente de Orientación Nutricional

Un chatbot de orientación nutricional impulsado por OpenAI que proporciona consejos personalizados basados en el perfil del usuario.

## Características

- Interfaz de chat amigable para consultas nutricionales
- Perfil de usuario personalizable para recomendaciones específicas
- Respuestas basadas en IA con OpenAI
- Diseño responsive para dispositivos móviles y de escritorio
- Formato de Markdown para respuestas bien estructuradas

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

### Backend

- API REST construida con Express.js
- Integración con la API de OpenAI
- Manejo de solicitudes y respuestas del chat
- Procesamiento de información del perfil del usuario

### Frontend

- Interfaz de usuario React
- Estilizado con Tailwind CSS
- Formulario de perfil del usuario
- Interfaz de chat en tiempo real

## Requisitos

- Node.js 16+
- Cuenta de OpenAI con clave API

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/4ailabs/nutri-assistant.git
cd nutri-assistant
```

### 2. Configurar el backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita el archivo `.env` con tu clave API de OpenAI.

### 3. Configurar el frontend

```bash
cd ../frontend
npm install
cp .env.example .env.local
```

### 4. Iniciar el desarrollo

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm start
```

## Despliegue

### Railway

1. Conecta tu repositorio de GitHub a Railway
2. Configura las variables de entorno necesarias
3. Railway detectará automáticamente los archivos package.json y desplegará el servicio

### Framer Integration

Para integrar en Framer, sigue estos pasos:

1. Despliega el backend en Railway
2. Usa la URL proporcionada por Railway como punto de conexión API
3. Utiliza el componente de iframe en Framer para incrustar la interfaz

## Licencia

MIT

## Créditos

Desarrollado por Miguel Ojeda