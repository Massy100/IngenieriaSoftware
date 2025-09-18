import { User } from "../user/User";

export interface NotificationSender {
    send(user: User): Promise<void>;
}