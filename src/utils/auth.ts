import jwt from 'jsonwebtoken';

export const authenticate = (token: string) => {
  if (!token) throw new Error('Authentication token is required');
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch {
    throw new Error('Invalid or expired token');
  }
};
