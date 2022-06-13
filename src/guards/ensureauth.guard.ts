import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

interface IPayload {
  sub: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.authorization;

    try {
      verify(token, '418a47914d81db9fe17f01ab1aed1c71') as IPayload;
      // md5 hash
     
      return true;
    } catch (err) {
      return false;
    }
  }
}
