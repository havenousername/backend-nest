import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import CreateRoleDto from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Role from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Role creation' })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({ status: 200, type: Role })
  @Get('/:value')
  getRoleByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
