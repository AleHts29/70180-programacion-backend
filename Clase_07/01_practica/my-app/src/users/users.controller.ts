import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ConfigService } from '@nestjs/config'

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService, private config: ConfigService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Valiadamos req.body
    if (!createUserDto.first_name || !createUserDto.last_name) throw new HttpException("Datos incompletos", HttpStatus.BAD_REQUEST)

    const user = await this.usersService.create(createUserDto)
    return { status: "success", payload: user };
  }


  @Get('/ping')
  ping() {
    // Prueba de una variable de entorno en el modulo User
    const envVar = this.config.get<string>('PAPA')
    console.log(`Variable de variable de entorno: ${envVar}`)
    return { status: "success", payload: `Quiero papa con: ${envVar}` };
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll()
    return { status: "success", payload: users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Validamos 
    if (isNaN(+id)) throw new HttpException("El id debe ser un numero", HttpStatus.BAD_REQUEST)
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
