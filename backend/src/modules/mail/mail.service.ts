import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your password or app password
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${process.env.FRONTEND_URL || 'http://localhost:3002'}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: '"Audio Platform Support" <' + (process.env.SMTP_USER || 'no-reply@platform.com') + '>',
      to: email,
      subject: 'تأكيد البريد الإلكتروني - منصة الأصوات',
      html: `
        <div style="direction: rtl; text-align: right; font-family: Tahoma, Arial, sans-serif; padding: 20px;">
          <h2>مرحباً بك في منصة الأصوات!</h2>
          <p>شكراً لتسجيلك معنا. يرجى الضغط على الزر أدناه لتفعيل حسابك وتأكيد بريدك الإلكتروني:</p>
          <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #14a800; color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">تفعيل الحساب</a>
          <p>إذا لم تكن قد سجلت في المنصة، يرجى تجاهل هذا الإيميل.</p>
          <br>
          <p>شكراً لك،<br>فريق عمل المنصة</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendLoginOtpEmail(email: string, otp: string) {
    const mailOptions = {
      from: '"Audio Platform Security" <' + (process.env.SMTP_USER || 'no-reply@platform.com') + '>',
      to: email,
      subject: 'كود الدخول - منصة الأصوات',
      html: `
        <div style="direction: rtl; text-align: right; font-family: Tahoma, Arial, sans-serif; padding: 20px;">
          <h2>كود التحقق من الدخول</h2>
          <p>أنت تحاول تسجيل الدخول إلى منصة الأصوات. يرجى استخدام الكود التالي لإتمام العملية:</p>
          <div style="font-size: 2rem; font-weight: bold; color: #14a800; letter-spacing: 5px; padding: 20px; background: #f4f4f4; border-radius: 8px; text-align: center;">
            ${otp}
          </div>
          <p>هذا الكود صالح لمدة 10 دقائق فقط.</p>
          <p>إذا لم تكن أنت من يحاول تسجيل الدخول، يرجى تجاهل هذا الإيميل.</p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending OTP email:', error);
    }
  }
}
