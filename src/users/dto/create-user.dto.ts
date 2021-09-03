import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export default class CreateUserDto {
  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email',
  })
  @IsString({ message: 'Should be always a string' })
  @IsEmail({}, { message: 'Incorrect email structure' })
  readonly email: string;

  @ApiProperty({
    example: '1234568',
    description: 'Password',
  })
  @IsString({ message: 'Should be always a string' })
  @Length(8, 16, {
    message: 'Password should contain more than 8 but less than 16 words',
  })
  readonly password: string;
}
