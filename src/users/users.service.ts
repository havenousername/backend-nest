import { Injectable } from '@nestjs/common';
import User from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import CreateUserDto from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}
  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('Slave');
    await user.$set('roles', [role.id]);
    return user;
  }

  async getAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }
}
