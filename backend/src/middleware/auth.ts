import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Token de autenticação necessário' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      return res.status(500).json({ 
        error: 'Erro de configuração do servidor' 
      });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        error: 'Token inválido' 
      });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ 
        error: 'Token expirado' 
      });
    }

    return res.status(500).json({ 
      error: 'Erro na autenticação' 
    });
  }
};

// Middleware opcional para rotas que podem ou não ter autenticação
export const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const secret = process.env.JWT_SECRET;
      
      if (secret) {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
      }
    }
    
    next();
  } catch (error) {
    // Se der erro na autenticação, continua sem usuário
    next();
  }
};
