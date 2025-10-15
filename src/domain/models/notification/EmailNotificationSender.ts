import { User } from "@/domain/models/user/User";
import { NotificationSender } from "../services/NotificationSender";

import nodemailer from 'nodemailer';

export class EmailNotificationSender implements NotificationSender {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

  public async send(user: User): Promise<void> {
    console.log(`Sending email notification to: ${user.getEmail()}`);
    console.log(`User: ${user.getName()} (ID: ${user.getId()})`);
   try {
    const info = await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || '',
      to: user.getEmail(),
      subject: 'Verified User',
      text: `Welcome ${user.getName()},\n\nYour account has been succesfully validated.\n\nNow you have full access to the app features\nBest regards.`
    });

    console.log('Email sent: %s', info.messageId);
    return;

    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}