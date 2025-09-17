import axios from "axios";
import { NotificationSender } from "./NotificationSender";
import { UserDto } from "../user/UserDto";

// ---------------- Tipos de configuración ----------------
type TwilioConfig = {
  accountSid: string;
  authToken: string;
  from: string;
};

type MetaConfig = {
  phoneNumberId: string;
  token: string;
};

// Opcional: tipo general para la clase
type WhatsAppConfig = TwilioConfig | MetaConfig;

// ---------------- Clase ----------------
type Provider = "twilio" | "meta";

export class WhatsAppNotificationSender implements NotificationSender {
    constructor(private provider: Provider, private config: WhatsAppConfig) {}

    async send(user: UserDto, message = "Hola!") {
        if (!user.phone) throw new Error("User has no phone");

        if (this.provider === "twilio") {
            const { accountSid, authToken, from } = this.config as TwilioConfig;
            const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
            const params = new URLSearchParams();
            params.append("From", `whatsapp:${from}`);
            params.append("To", `whatsapp:${user.phone}`);
            params.append("Body", message);

            const res = await axios.post(url, params.toString(), {
                auth: { username: accountSid, password: authToken },
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });

            if (res.status >= 300) throw new Error(`Twilio error ${res.status}`);
        } else {
            const { phoneNumberId, token } = this.config as MetaConfig;
            const url = `https://graph.facebook.com/v15.0/${phoneNumberId}/messages`;
            const body = {
                messaging_product: "whatsapp",
                to: user.phone.replace("+", ""),
                type: "text",
                text: { body: message }
            };

            const res = await axios.post(url, body, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (res.status >= 300) throw new Error(`Meta WhatsApp error ${res.status}`);
        }
    }
}
