import axios from "axios";
import { NotificationSender } from "./NotificationSender";
import { UserDto } from "../user/UserDto";

export class EmailNotificationSender implements NotificationSender {
    constructor(private apiKey: string, private from: string) {}

    async send(user: UserDto, message = "¡Bienvenido!") {
    if (!user.email) throw new Error("User has no email");

    const payload = {
        from: this.from,
        to: user.email,
        subject: "Bienvenida",
        html: `<p>Hola ${user.name ?? ""},</p><p>${message}</p>`
    };

    const res = await axios.post("https://api.resend.com/emails", payload, {
        headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
        }
    });

    if (res.status >= 300) throw new Error(`Resend response ${res.status}`);
    }
}
