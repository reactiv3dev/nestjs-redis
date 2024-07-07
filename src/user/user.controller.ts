import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('users')
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    return user;
  }
}
