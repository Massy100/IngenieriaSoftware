import UserRepository from "../repositories/interfaces/UserRepository";

export class UserFinder {
    constructor(private userRepository: UserRepository) {}

    public async run(email: string) {
        const user = await this.userRepository.getByEmail(email);
        return user;
    }
}