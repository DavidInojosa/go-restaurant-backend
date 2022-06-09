import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/ensureauth.guard';
import { FoodDTO } from './food.dto';
import { FoodService } from './food.service';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Post()
  async create(@Body() data: FoodDTO) {
    return this.foodService.create(data);
  }

  @Get()
  async getAll() {
    return this.foodService.getAll();
  }

  @Get('/available')
  @UseGuards(AuthGuard)
  async getAvailable() {
    return this.foodService.getAvailable();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: FoodDTO) {
    return this.foodService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.foodService.delete(id);
  }
}
