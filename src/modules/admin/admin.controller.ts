import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminDTO } from './admin.dto';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() data: AdminDTO) {
    return this.adminService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: AdminDTO) {
    return this.adminService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.adminService.delete(id);
  }
}
