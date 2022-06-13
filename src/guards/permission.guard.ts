import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { PrismaService } from 'src/database/prismaService';
import { Reflector } from '@nestjs/core';

interface IPayload {
  sub: string;
}

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private prisma: PrismaService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers;

    if (!authHeader) {
      return false;
    }

    const token = authHeader.authorization;
    try {
      const { sub } = verify(
        token,
        '418a47914d81db9fe17f01ab1aed1c71',
      ) as IPayload;
      // md5 hash

      const user = await this.prisma.user.findFirst({
        where: { id: sub },
      });

      return roles.includes(user.role);
    } catch (err) {
      return false;
    }
  }
}
