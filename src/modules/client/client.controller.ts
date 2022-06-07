import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientDTO } from './client.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() data: ClientDTO) {
    return this.clientService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: ClientDTO) {
    return this.clientService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.clientService.delete(id);
  }
}
