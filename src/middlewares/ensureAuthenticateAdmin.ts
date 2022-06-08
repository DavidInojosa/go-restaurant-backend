import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticateAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  interface IPayload {
    sub: string;
  }
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token missing',
    });
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(
      token,
      '418a47914d81db9fe17f01ab1aed1c71',
    ) as IPayload;
    // md5 hash

    request.idClient = sub;

    return next();
  } catch (err) {
    return response.status(401).json({
      message: 'Invalid Token!',
    });
  }
}
