import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientDTO, IAuthenticateClient } from './client.dto';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() data: ClientDTO) {
    return this.clientService.create(data);
  }

  @Post()
  async signIn(@Body() data: IAuthenticateClient) {
    return this.clientService.signIn(data);
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
