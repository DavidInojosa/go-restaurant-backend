import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export async function ensureAuthenticateClient(
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
      '1bb9231a4e33386cee0786ca329aa539',
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
