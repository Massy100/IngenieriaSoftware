import { NextRequest, NextResponse } from "next/server";
import { EmailNotificationSender } from "../../../../domain/models/notification/EmailNotificationSender";
import { WhatsappNotificationSender } from "../../../../domain/models/notification/WhatsAppNotificationSender";

const emailSender = new EmailNotificationSender();
const whatsappSender = new WhatsappNotificationSender();

export async function POST(req: NextRequest) {
  try {
    const { user, message } = await req.json();

    let result;
    if (user.email) {
      result = await emailSender.send(user, message);
    } else if (user.phone) {
      result = await whatsappSender.send(user, message);
    } else {
      throw new Error("El usuario no tiene ni email ni teléfono");
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Error desconocido" }, { status: 500 });
  }
}

