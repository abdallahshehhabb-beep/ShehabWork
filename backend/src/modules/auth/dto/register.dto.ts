import { IsEmail, IsString, MinLength, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  name: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  idCardUrl?: string;

  @IsOptional()
  @IsString()
  teamLeaderId?: string;
}
