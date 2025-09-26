import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import fr from 'zod/v4/locales/fr.cjs';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    // Initialize transporter once
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EmailHost'),
      port: this.configService.get<number>('emailPort') || 587,
      secure: false, // true for 465, false for 587
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('emailPassword'),
      },
    });
  }

  /** Send OTP email */
  async sendOtpEmail(
    email: string,
    otp: string,
    name?: string,
  ): Promise<string> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${this.configService.get<string>('APP_NAME') || 'No-Reply'}" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Hello ${name || 'User'}, your OTP is: ${otp}`,
      html: `<div style="font-family:sans-serif; padding:10px;">
               <h2>Hello ${name || 'User'},</h2>
               <p>Your One-Time Password (OTP) is:</p>
               <h1 style="color:#007bff;">${otp}</h1>
               <p>This code will expire in 5 minutes.</p>
             </div>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return 'OTP email sent successfully';
    } catch (error) {
      console.error('Error sending OTP email:', error);
      throw new Error('Failed to send OTP email');
    }
  }

  async sendVerificationEmail(email: string): Promise<void> {
    const url = `${this.configService.get<string>('FRONTEND_URL')}/verify-email?token}`;

    try {
      await this.transporter.sendMail({
        from:'instagram',
        to: 'ah1585229@gmail.com',
        subject: 'Verify Your Email',
        text: `Please verify your email by clicking this link: `,
      });
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }
}
