import { User } from "@/domain/models/user/User";

export class EmailNotificationSender {
  constructor() {
    console.log("📧 EmailNotificationSender initialized");
  }

  public static async send(user: User): Promise<void> {
    console.log(`📧 [PLACEHOLDER] Sending email notification to: ${user.getEmail()}`);
    console.log(`📧 [PLACEHOLDER] User: ${user.getName()} (ID: ${user.getId()})`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✅ [PLACEHOLDER] Email notification 'sent' successfully");
        resolve();
      }, 100);
    });
  }

  public async sendNotification(user: User, message: string): Promise<void> {
    console.log(`📧 [PLACEHOLDER] Sending email to ${user.getEmail()}: ${message}`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("✅ [PLACEHOLDER] Email notification completed");
        resolve();
      }, 100);
    });
  }
}