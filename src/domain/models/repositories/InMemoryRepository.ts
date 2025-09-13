import UserRespository from "./interfaces/UserRepository";
import { User } from "../user/User";
import { randomUUID } from "crypto";

export default class InMemoryUserRepository implements UserRespository {
    private users: User[] = [];

    async save(user: User): Promise<void> {
        user.id = randomUUID();
        this.users.push(user);
        

    }

    async getAll(): Promise<User[]> {
        return this.users;
    }

    getById(id: any): Promise<User | null> {
        const index = this.users.findIndex(u => u.id === id);
        return Promise.resolve(this.users[index] || null);
    }

    async update(id: any, email?: string, dpi?: string, name?: string, age?: number, is_valid?: boolean, phone?: string): Promise<void> {
        const oldUser = await this.getById(id);
        const index = this.users.findIndex(u => u.id === id);
        if (oldUser) {
            const updatedUser = User.create({
                email: email ?? oldUser.email,
                dpi: dpi ?? oldUser.dpi,
                name: name ?? oldUser.name,
                age: age ?? oldUser.age,
                isValid: is_valid ?? oldUser.isValid,
                phone: phone ?? oldUser.phone
            });

            updatedUser.id = id;
            this.users[index] = updatedUser;
        } else {
            throw new Error("User not found");
        }
    }

    async delete(id: any): Promise<void> {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
        } else {
            throw new Error("User not found");
        }
    }

    async dzelete(id: any): Promise<void> {
        return this.delete(id);
    }


}