import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import User from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import CreateUserDto from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import AddRoleDto from './dto/add-role.dto';
import BanUserDto from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}
  async create(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('God');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async addRole(dto: AddRoleDto): Promise<AddRoleDto> {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }

    throw new HttpException('No such role or user', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException('No such user for van', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.reason;
    await user.save();
    return user;
  }
}
