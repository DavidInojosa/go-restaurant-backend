import { PrismaService } from './../../database/prismaService';
import { ClientDTO } from './client.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create({ username, email, password, id }: ClientDTO) {
    const clientExists = await this.prisma.clients.findFirst({
      where: {
        username: username,
      },
    });
    if (clientExists) {
      throw new Error('Client already exists');
    }

    const client = await this.prisma.clients.create({
      data: { username, email, password, id },
    });

    return client;
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
