import { PrismaService } from './../../database/prismaService';
import { AdminDTO } from './admin.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create({ username, email, password, id }: AdminDTO) {
    const adminExists = await this.prisma.admin.findFirst({
      where: {
        username: username,
      },
    });
    if (adminExists) {
      throw new Error('Admin already exists');
    }

    const admin = await this.prisma.admin.create({
      data: { username, email, password, id },
    });

    return admin;
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
