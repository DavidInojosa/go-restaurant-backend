import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDTO, UserAuthDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Post('/signIn')
  async signIn(@Body() data: UserAuthDTO) {
    return this.userService.signIn(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UserDTO) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
