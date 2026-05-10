import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  email: string;
  password?: string;
  name?: string;
  role?: UserRole;
  status?: UserStatus;
  age?: number;
  country?: string;
  phone?: string;
  photoUrl?: string;
  idCardUrl?: string;
  teamLeaderId?: string;
  emailVerificationToken?: string;
}
