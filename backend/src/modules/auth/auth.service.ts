import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.passwordHash === pass) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password || '');
    if (!user) {
      throw new UnauthorizedException('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }
    if (!user.isEmailVerified) {
      throw new ForbiddenException('يرجى تأكيد بريدك الإلكتروني أولاً. تم إرسال رابط التفعيل إلى بريدك.');
    }
    if (user.status === 'banned') {
      throw new ForbiddenException('تم حظر هذا الحساب من المنصة');
    }
    if (user.status === 'pending') {
      throw new ForbiddenException('حسابك قيد المراجعة من قِبل الإدارة. سيتم إبلاغك عند الموافقة.');
    }
    
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.usersService.setLoginOtp(user.email, otp);
    await this.mailService.sendLoginOtpEmail(user.email, otp);

    return {
      message: 'OTP_SENT',
      email: user.email
    };
  }

  async verifyLoginOtp(email: string, otp: string) {
    const user = await this.usersService.verifyLoginOtp(email, otp);
    if (!user) {
      throw new UnauthorizedException('كود التحقق غير صحيح');
    }
    
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async register(registerDto: RegisterDto) {
    let teamLeaderId = registerDto.teamLeaderId;

    // إذا كان المسجل مستقل ولم يتم تقديم قائد فريق، يتم وضعه تحت الأدمن الرئيسي
    if (registerDto.role === 'freelancer' && !teamLeaderId) {
      const mainAdmin = await this.usersService.findByEmail('AbdallahShehab@gmail.com');
      if (mainAdmin) {
        teamLeaderId = mainAdmin.id;
      }
    }

    const verificationToken = uuidv4();

    const user = await this.usersService.create({
      email: registerDto.email,
      password: registerDto.password,
      name: registerDto.name,
      role: registerDto.role,
      age: registerDto.age,
      country: registerDto.country,
      phone: registerDto.phone,
      photoUrl: registerDto.photoUrl,
      idCardUrl: registerDto.idCardUrl,
      teamLeaderId: teamLeaderId,
      emailVerificationToken: verificationToken,
    });

    await this.mailService.sendVerificationEmail(user.email, verificationToken);

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async verifyEmail(token: string) {
    return this.usersService.verifyEmail(token);
  }
}
