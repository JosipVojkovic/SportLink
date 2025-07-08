import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  @IsNotEmpty({
    message: 'First name is required',
  })
  @IsString({
    message: 'First name must be a string',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  @IsNotEmpty({
    message: 'Last name is required',
  })
  @IsString({
    message: 'Last name must be a string',
  })
  lastName: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'johndoe',
  })
  @IsNotEmpty({
    message: 'Username is required',
  })
  @IsString({
    message: 'Username must be a string',
  })
  @MinLength(3, {
    message: 'Username must be at least 3 characters long',
  })
  userName: string;

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
  @MinLength(3, {
    message: 'Username must be at least 6 characters long',
  })
  password: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsNotEmpty({
    message: 'Phone number is required',
  })
  @IsString({
    message: 'Phone number must be a string',
  })
  phone: string;

  @ApiProperty({
    description: 'Date of birth of the user',
    example: '1990-01-01',
  })
  @IsNotEmpty({
    message: 'Date of birth is required',
  })
  @Transform(({ value }) => new Date(value))
  @Type(() => Date)
  @IsDate({
    message: 'Date of birth must be a valid date',
  })
  dateOfBirth: Date;
}
