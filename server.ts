import express from "express";
import dotenv from "dotenv";
import { EmailNotificationSender } from "./src/domain/models/notification/EmailNotificationSender";
import { WhatsAppNotificationSender } from "./src/domain/models/notification/WhatsAppNotificationSender";
import { UserDto } from "./src/domain/models/user/UserDto";

dotenv.config();
const app = express();
app.use(express.json());

const emailSender = new EmailNotificationSender(process.env.RESEND_API_KEY!, process.env.RESEND_FROM!);
const provider = process.env.WHATSAPP_PROVIDER === "meta" ? "meta" : "twilio";

let config;
if (provider === "twilio") {
    config = {
        accountSid: process.env.TWILIO_ACCOUNT_SID!,
        authToken: process.env.TWILIO_AUTH_TOKEN!,
        from: process.env.TWILIO_WHATSAPP_FROM!
    };
} else {
    config = {
        phoneNumberId: process.env.META_PHONE_NUMBER_ID!,
        token: process.env.META_WHATSAPP_TOKEN!
    };
}

const whatsappSender = new WhatsAppNotificationSender(provider, config);


app.post("/notifications/email", async (req, res) => {
    const user: UserDto = req.body.user;
    const message: string = req.body.message;
    try {
    await emailSender.send(user, message);
    res.json({ ok: true });
    } catch (err: unknown) {
    console.error(err);

    if (err instanceof Error) {
        res.status(500).json({ ok: false, error: err.message });
    } else {
        res.status(500).json({ ok: false, error: "Unknown error" });
    }
    }
});


app.post("/notifications/whatsapp", async (req, res) => {
    const user: UserDto = req.body.user;
    const message: string = req.body.message;
    try {
    await whatsappSender.send(user, message);
    res.json({ ok: true });
    } catch (err:unknown) {
    console.error(err);

    if (err instanceof Error) {
        res.status(500).json({ ok: false, error: err.message });
    } else {
        res.status(500).json({ ok: false, error: "Unknown error" });
    }
    }

    });

const port = process.env.PORT ?? 3001;
app.listen(port, () => console.log(`Notifications service listening on ${port}`));
