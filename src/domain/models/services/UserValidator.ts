import UserRepository from "../repositories/interfaces/UserRepository";
import { UserFinder } from "./UserFinder";
// Import NotificationSender

export class UserValidator {
    private userFinder: UserFinder;
    constructor(private userRepository: UserRepository, private sender: NotificationSender) {
        this.userFinder = new UserFinder(userRepository);
    }

    public async run(email: string, isValid: boolean) {
        const user = await this.userFinder.run(email);

        if (!user) {
            throw new Error('Email not registered');
        }
        if (isValid) {
            await this.sender.send(user);
        } else {
            throw new Error('User is not valid');
        }
    }
}