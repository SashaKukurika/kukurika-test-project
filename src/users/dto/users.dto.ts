import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { Role } from '../../core/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'a629712a-b334-4eaf-be13-9228415cb95f' })
  userId: string;

  @ApiProperty({ required: false, example: 'sasha' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'P@ssW0rD1!' })
  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ required: true, example: 'username@gmail.com' })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: Role.SELLER })
  @IsString()
  @IsOptional()
  roles: string;
}
