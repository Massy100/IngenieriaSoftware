import { NotificationSender } from "../book/interfaces/NotificationSender";
import { UserDto } from "../user/UserDto";

export class WhatsappNotificationSender implements NotificationSender {
  async send(user: UserDto, message = "Hola!") {
    if (!user.phone && !user.name) {
      throw new Error("El usuario no tiene número de teléfono o nombre");
    }

    // Simulación de envío
    return {
      ok: true,
      channel: "whatsapp",
      to: user.phone ?? user.name ?? "desconocido",
      message
    };
  }
}
