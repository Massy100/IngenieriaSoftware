import UserRepository from "../repositories/interfaces/UserRepository";
import { User } from "../user/User";

export class UserCreator {
    constructor(private userRepository: UserRepository) {}

    public async run(user: User) {
        await this.userRepository.save(user);

        return;
    }
}