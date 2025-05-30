require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Configuración de CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : ['http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir solicitudes sin origen (como aplicaciones móviles o curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use(express.json());

// Inicializar el cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware para verificar la API key
const verifyApiKey = (req, res, next) => {
  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'API key no configurada en el servidor' });
  }
  next();
};

// Endpoint para el asistente nutricional
app.post('/api/nutrition-advice', verifyApiKey, async (req, res) => {
  try {
    const { message, userInfo } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Se requiere un mensaje' });
    }

    // Contexto del sistema para el asistente nutricional
    const systemMessage = `Eres un asistente de orientación nutricional profesional. 
    Tu objetivo es proporcionar información nutricional precisa, consejos de alimentación saludable 
    y recomendaciones basadas en evidencia científica. 
    
    Debes considerar la siguiente información del usuario (si está disponible):
    - Edad: ${userInfo?.age || 'No proporcionada'}
    - Género: ${userInfo?.gender || 'No proporcionado'}
    - Peso: ${userInfo?.weight || 'No proporcionado'}
    - Altura: ${userInfo?.height || 'No proporcionada'}
    - Objetivos: ${userInfo?.goals || 'No proporcionados'}
    - Restricciones dietéticas: ${userInfo?.dietaryRestrictions || 'No proporcionadas'}
    - Alergias: ${userInfo?.allergies || 'No proporcionadas'}
    
    Recuerda que no eres un médico y debes aconsejar buscar ayuda profesional para problemas médicos o nutricionales serios.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message }
      ],
      max_tokens: 1000
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error al comunicarse con OpenAI:', error);
    res.status(500).json({ 
      error: 'Error al procesar la solicitud', 
      details: error.message 
    });
  }
});

// Endpoint de verificación de estado
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});