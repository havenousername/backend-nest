import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import User from './users.model';
import { Roles } from '../auth/role-auth.decorator';
import JwtRolesGuard from '../auth/roles.guard';
import AddRoleDto from './dto/add-role.dto';
import BanUserDto from './dto/ban-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @ApiOperation({ summary: 'All users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles('God')
  @UseGuards(JwtRolesGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'Add new role for user' })
  @ApiResponse({ status: 200 })
  @Roles('God')
  @UseGuards(JwtRolesGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Ban a user' })
  @ApiResponse({ status: 200 })
  @Roles('God')
  @UseGuards(JwtRolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto);
  }
}
