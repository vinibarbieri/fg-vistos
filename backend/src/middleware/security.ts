import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

// Configuração do CORS
export const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

// Rate limiting
export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutos
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // máximo 100 requests por IP
  message: {
    error: 'Muitas requisições. Tente novamente mais tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Middleware de segurança
export const securityMiddleware = [
  helmet(),
  cors(corsOptions),
  rateLimiter
];
