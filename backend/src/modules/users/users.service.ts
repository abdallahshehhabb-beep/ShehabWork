import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole, UserStatus } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.findByEmail(createUserDto.email);
    if (existing) {
      throw new Error('Email already exists');
    }
    const user = this.usersRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      passwordHash: createUserDto.password || '',
      role: createUserDto.role,
      status: createUserDto.role === 'team_leader' ? 'pending' as any : 'active' as any,
      age: createUserDto.age,
      country: createUserDto.country,
      phone: createUserDto.phone,
      photoUrl: createUserDto.photoUrl,
      idCardUrl: createUserDto.idCardUrl,
      teamLeaderId: createUserDto.teamLeaderId,
      emailVerificationToken: createUserDto.emailVerificationToken,
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.email) user.email = updateUserDto.email;
    if (updateUserDto.name) user.name = updateUserDto.name;
    if (updateUserDto.password) user.passwordHash = updateUserDto.password;
    if (updateUserDto.status) user.status = updateUserDto.status;
    if (updateUserDto.country !== undefined) user.country = updateUserDto.country;
    if (updateUserDto.phone !== undefined) user.phone = updateUserDto.phone;
    if (updateUserDto.skills !== undefined) user.skills = updateUserDto.skills;
    if (updateUserDto.languages !== undefined) user.languages = updateUserDto.languages;
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  async seedAdmins() {
    const admins = [
      { email: 'AbdallahShehab@gmail.com', name: 'Abdallah Shehab' },
      { email: 'Admian1@gmail.com', name: 'Admin 1' },
      { email: 'Admian3@gmail.com', name: 'Admin 3' },
    ];

    for (const adminData of admins) {
      const existing = await this.findByEmail(adminData.email);
      if (!existing) {
        await this.create({
          email: adminData.email,
          name: adminData.name,
          password: 'Abdallah1998#',
          role: UserRole.ADMIN,
          status: UserStatus.ACTIVE,
          isEmailVerified: true,
        });
        console.log(`Admin ${adminData.email} created.`);
      }
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { emailVerificationToken: token } });
    if (!user) return false;
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    await this.usersRepository.save(user);
    return true;
  }

  async setLoginOtp(email: string, otp: string) {
    const user = await this.findByEmail(email);
    if (user) {
      user.loginOtp = otp;
      await this.usersRepository.save(user);
    }
  }

  async verifyLoginOtp(email: string, otp: string) {
    const user = await this.findByEmail(email);
    if (user && user.loginOtp === otp) {
      user.loginOtp = null; // Clear OTP after use
      await this.usersRepository.save(user);
      return user;
    }
    return null;
  }
}
