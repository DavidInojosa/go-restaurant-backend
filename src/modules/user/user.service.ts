import { PrismaService } from '../../database/prismaService';
import { UserDTO, UserAuthDTO } from './user.dto';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ username, email, password, role }: UserDTO) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        username: {
          mode: 'insensitive',
          equals: username,
        },
      },
    });
    if (userExists) {
      throw new Error('User already exists');
    }
    const hashPassword = await hash(password, 10);

    const user = await this.prisma.user.create({
      data: { username, email, password: hashPassword, role },
    });

    return user;
  }

  async signIn({ email, password }: UserAuthDTO) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error('Email invalid!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Password invalid!');
    }

    //Gerar o token
    const token = sign({ email }, '418a47914d81db9fe17f01ab1aed1c71', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }

  async update(id: string, data: UserDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!userExists) {
      throw new Error('User does not exists');
    }

    return await this.prisma.user.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: string) {
    const userExists = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!userExists) {
      throw new Error('User does not exists');
    }

    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }
}
