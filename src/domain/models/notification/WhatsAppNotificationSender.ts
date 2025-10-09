import { User } from "@/domain/models/user/User";

export class WhatsappNotificationSender {
  constructor() {
    console.log("WhatsappNotificationSender initialized");
  }

  public static async send(user: User): Promise<void> {
    console.log(`Sending WhatsApp notification to: ${user.getPhone()}`);
    console.log(`User: ${user.getName()} (ID: ${user.getId()})`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("WhatsApp notification 'sent' successfully");
        resolve();
      }, 100);
    });
  }
}