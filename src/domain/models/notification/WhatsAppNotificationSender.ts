import { User } from "@/domain/models/user/User";
import { NotificationSender } from "@/domain/models/services/NotificationSender";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();



export class WhatsappNotificationSender implements NotificationSender {
  private client;
  
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID ;
    const authToken = process.env.TWILIO_AUTH_TOKEN ;
    this.client = twilio(accountSid, authToken);
    console.log("WhatsappNotificationSender initialized");
  }
  async send(user: User): Promise<void> {
    try {
      const message = await this.client.messages.create({
        from: "whatsapp:+14155238886",
        to: `whatsapp:+502${user.getPhone()}`,
        body: `Welcome ${user.getName()}!\n\nYour account has been succesfully validated.\n\nNow you have full access to the app features.`,
      });

      console.log(`Message sended to ${user.getName()} (+502${user.getPhone()})`);
      console.log(`SID: ${message.sid}`);
    } catch (error) {
      console.error("Failed to send the message with Twilio:", error);
    }
  }
}