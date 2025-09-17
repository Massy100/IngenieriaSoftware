import { UserDto } from "../user/UserDto";

export interface NotificationSender {
    send(user: UserDto, message?: string): Promise<void>;
}
