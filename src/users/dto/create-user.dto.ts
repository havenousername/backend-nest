import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email',
  })
  readonly email: string;

  @ApiProperty({
    example: '1234568',
    description: 'Password',
  })
  readonly password: string;
}
