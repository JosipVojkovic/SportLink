import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  @IsNotEmpty({
    message: 'Password is required',
  })
  @IsString({
    message: 'Password must be a string',
  })
  password: string;
}
