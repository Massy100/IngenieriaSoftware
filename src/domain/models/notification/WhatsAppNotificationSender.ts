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
        body: `Bienvenido ${user.getName()}!\n\nTu cuenta ha sido validada exitosamente.\n\nAhora tienes acces a las funciones de la aplicación.`,
      });

      console.log(`Mensaje enviado a ${user.getName()} (+502${user.getPhone()})`);
      console.log(`SID: ${message.sid}`);
    } catch (error) {
      console.error("Error al enviar el mensaje de WhatsApp con Twilio:", error);
    }
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