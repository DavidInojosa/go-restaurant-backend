import { PrismaService } from './../../database/prismaService';
import { AdminDTO, IAuthenticateAdmin } from './admin.dto';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create({ username, email, password, id }: AdminDTO) {
    const adminExists = await this.prisma.admin.findFirst({
      where: {
        username: {
          mode: 'insensitive',
        },
      },
    });
    if (adminExists) {
      throw new Error('Admin already exists');
    }
    const hashPassword = await hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: { username, email, password: hashPassword, id },
    });

    return admin;
  }

  async signIn({ username, password }: IAuthenticateAdmin) {
    const admin = await this.prisma.admin.findFirst({
      where: { username },
    });

    if (!admin) {
      throw new Error('Username or password invalid!');
    }

    const passwordMatch = await compare(password, admin.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }

    //Gerar o token
    const token = sign({ username }, '418a47914d81db9fe17f01ab1aed1c71', {
      subject: admin.id,
      expiresIn: '1d',
    });

    return token;
  }

  async update(id: string, data: AdminDTO) {
    console.log('id', id);
    const adminExists = await this.prisma.admin.findUnique({
      where: { id: id },
    });
    if (!adminExists) {
      throw new Error('Admin does not exists');
    }

    return await this.prisma.admin.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: string) {
    const adminExists = await this.prisma.admin.findUnique({
      where: { id: id },
    });
    if (!adminExists) {
      throw new Error('Admin does not exists');
    }

    return await this.prisma.admin.delete({
      where: {
        id: id,
      },
    });
  }
}
