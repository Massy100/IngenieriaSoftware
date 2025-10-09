import { User } from "@/domain/models/user/User";

export class EmailNotificationSender {
  constructor() {
    console.log("EmailNotificationSender initialized");
  }

  public static async send(user: User): Promise<void> {
    console.log(`Sending email notification to: ${user.getEmail()}`);
    console.log(`User: ${user.getName()} (ID: ${user.getId()})`);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Email notification 'sent' successfully");
        resolve();
      }, 100);
    });
  }
}