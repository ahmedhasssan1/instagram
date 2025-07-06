import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  private emailTransport() {
    return nodemailer.createTransport({
      host: this.configService.get<string>('EmailHost'),
      port: this.configService.get<number>('emailPort'),
      secure: false, // true for port 465, false for 587
      auth: {
        user: this.configService.get<string>('emailUser'),
        pass: this.configService.get<string>('emailPassword'),
      },
    });
  }

  async sendEmail(email: string, name: string, otp: string): Promise<string> {
    const transporter = this.emailTransport();

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${this.configService.get<string>('APP_NAME') || 'No-Reply'}" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family:sans-serif; padding:10px;">
          <h2>Hello ${name || 'User'},</h2>
          <p>Your One-Time Password (OTP) is:</p>
          <h1 style="color:#007bff;">${otp}</h1>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `,
      text: `Hello ${name}, your OTP is: ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return 'Email sent successfully';
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
