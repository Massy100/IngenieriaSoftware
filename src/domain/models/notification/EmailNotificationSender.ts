import { User } from "@/domain/models/user/User";
import { NotificationSender } from "../services/NotificationSender";

import nodemailer from 'nodemailer';

export class EmailNotificationSender implements NotificationSender {
  private transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({host : process.env.SMTP_HOST,
      port : process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure : false,
    });
  }

  public async send(user: User): Promise<void> {
    console.log(`Sending email notification to: ${user.getEmail()}`);
    console.log(`User: ${user.getName()} (ID: ${user.getId()})`);
   try {
    const info = await this.transporter.sendMail({
      from: process.env.FROM_EMAIL || '',
      to: user.getEmail(),
      subject: 'Email Notification',
      text: `Hello ${user.getName()},\n\nYou have been verified.\n\nBest regards,\nMassielle, Daniel(*2), Karen, Carlos`
    });

    console.log('Email sent: %s', info.messageId);
    return;

    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}