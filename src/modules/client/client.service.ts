import { PrismaService } from './../../database/prismaService';
import { ClientDTO, IAuthenticateClient } from './client.dto';
import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create({ username, email, password, id }: ClientDTO) {
    const clientExists = await this.prisma.clients.findFirst({
      where: {
        username: {
          mode: 'insensitive',
        },
      },
    });
    if (clientExists) {
      throw new Error('Client already exists');
    }

    const hashPassword = await hash(password, 10);

    const client = await this.prisma.clients.create({
      data: { username, email, password: hashPassword, id },
    });

    return client;
  }

  async signIn({ username, password }: IAuthenticateClient) {
    const client = await this.prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new Error('Username or password invalid!');
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Username or password invalid!');
    }

    //Gerar o token
    const token = sign({ username }, '1bb9231a4e33386cee0786ca329aa539', {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }

  async update(id: string, data: ClientDTO) {
    const clientExists = await this.prisma.clients.findUnique({
      where: { id: id },
    });
    if (!clientExists) {
      throw new Error('Client does not exists');
    }

    return await this.prisma.clients.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async delete(id: string) {
    const clientExists = await this.prisma.clients.findUnique({
      where: { id: id },
    });
    if (!clientExists) {
      throw new Error('Client does not exists');
    }

    return await this.prisma.clients.delete({
      where: {
        id: id,
      },
    });
  }
}
