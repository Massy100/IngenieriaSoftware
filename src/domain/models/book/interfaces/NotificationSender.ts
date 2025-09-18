import { UserDto } from "../../user/UserDto";

export interface NotificationSender {
  send(user: UserDto, message?: string): Promise<{ ok: boolean; channel: string; to: string; message: string }>;
}
