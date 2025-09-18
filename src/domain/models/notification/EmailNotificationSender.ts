import { NotificationSender } from "../book/interfaces/NotificationSender";
import { UserDto } from "../user/UserDto";

export class EmailNotificationSender implements NotificationSender {
  async send(user: UserDto, message = "¡Bienvenido!") {
    if (!user.email && !user.name) {
      throw new Error("El usuario no tiene email o nombre");
    }

    // Simulación de envío
    return {
      ok: true,
      channel: "email",
      to: user.email ?? user.name ?? "desconocido",
      message
    };
  }
}
