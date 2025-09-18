import { User } from "@/domain/models/user/User";

export class WhatsappNotificationSender {
  constructor() {
    console.log("📱 WhatsappNotificationSender initialized");
  }

  public static async send(user: User): Promise<void> {
    console.log(`📱 [PLACEHOLDER] Sending WhatsApp notification to: ${user.getPhone()}`);
    console.log(`📱 [PLACEHOLDER] User: ${user.getName()} (ID: ${user.getId()})`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✅ [PLACEHOLDER] WhatsApp notification 'sent' successfully");
        resolve();
      }, 100);
    });
  }

  public async sendNotification(user: User, message: string): Promise<void> {
    console.log(`📱 [PLACEHOLDER] Sending WhatsApp to ${user.getPhone()}: ${message}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✅ [PLACEHOLDER] WhatsApp notification completed");
        resolve();
      }, 100);
    });
  }
}