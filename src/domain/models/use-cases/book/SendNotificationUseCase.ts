// src/domain/models/use-cases/notification/SendNotificationUseCase.ts

import { UserFinder } from "../../services/UserFinder";
import SupabaseUserRepository from "../../repositories/SupabaseUserRepository";
import { EmailNotificationSender } from "../../notification/EmailNotificationSender";
import { WhatsappNotificationSender } from "../../notification/WhatsAppNotificationSender";

export class SendNotificationUseCase {
  constructor(
    private userFinder: UserFinder,
    private userRepository: SupabaseUserRepository,
    private emailSender: EmailNotificationSender,
    private whatsappSender: WhatsappNotificationSender
  ) {}

  async execute(email: string, useWhatsapp: boolean = false): Promise<{ message: string; channel: string }> {
    if (!email) {
      throw new Error('Email is required');
    }

    const user = await this.userFinder.run(email);
    if (!user) {
      throw new Error('Email not registered');
    }

    this.userRepository.update(
      user.getId(),
      undefined,
      undefined,
      undefined,
      undefined,
      true,  
      undefined
    );

    if (useWhatsapp) {
      await this.whatsappSender.send(user);
    } else {
      await this.emailSender.send(user);
    }

    return {
      message: 'Notification sent successfully',
      channel: useWhatsapp ? 'whatsapp' : 'email'
    };
  }
}