import { UserStatus } from '../entities/user.entity';

export class UpdateUserDto {
  email?: string;
  password?: string;
  name?: string;
  status?: UserStatus;
  country?: string;
  phone?: string;
  photoUrl?: string;
  idCardUrl?: string;
  skills?: string[];
  languages?: string[];
}

