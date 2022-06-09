import { PrismaService } from './../../database/prismaService';
import { FoodDTO } from './food.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodService {
  constructor(private prisma: PrismaService) {}

  async create({
    idUser,
    title,
    description,
    price,
    available,
    imageUrl,
  }: FoodDTO) {
    const foodExists = await this.prisma.foods.findFirst({
      where: {
        title: title,
      },
    });
    if (foodExists) {
      throw new Error('Food already exists');
    }

    const food = await this.prisma.foods.create({
      data: { idUser, title, description, price, available, imageUrl },
    });

    return food;
  }

  async update(
    id: string,
    { idUser, title, description, price, available, imageUrl }: FoodDTO,
  ) {
    const foodExists = await this.prisma.foods.findUnique({
      where: { id },
    });
    if (!foodExists) {
      throw new Error('Food does not exists');
    }

    return await this.prisma.foods.update({
      data: { idUser, title, description, price, available, imageUrl },
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const foodExists = await this.prisma.foods.findUnique({
      where: { id },
    });
    if (!foodExists) {
      throw new Error('Food does not exists');
    }

    return await this.prisma.foods.delete({
      where: {
        id,
      },
    });
  }

  async getAll() {
    return this.prisma.foods.findMany({});
  }

  async getAvailable() {
    return this.prisma.foods.findMany({
      where: {
        available: true,
      },
    });
  }
}
