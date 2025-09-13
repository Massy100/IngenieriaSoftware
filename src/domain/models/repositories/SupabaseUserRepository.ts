import { Sql } from 'postgres';
import postgres from 'postgres';
import { User } from '../user/User';
import UserRepository from './interfaces/UserRepository';

import { UserId } from '../user/value-objects/UserId';
import { UserEmail } from '../user/value-objects/UserEmail';
import { UserDpi } from '../user/value-objects/UserDpi';
import { UserName } from '../user/value-objects/UserName';
import { UserAge } from '../user/value-objects/UserAge';
import { UserIsValid } from '../user/value-objects/UserIsValid';
import { UserPhone } from '../user/value-objects/UserPhone'; 

export default class SupabaseUserRepository implements UserRepository {
    private readonly sql: Sql;

    constructor() {
        // Use your Supabase database connection string here
        const connectionString = "postgresql://postgres:[eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljdXFqd29yZHlxanh4Y3psbHpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MDc1MjQsImV4cCI6MjA2OTk4MzUyNH0.syfe2cOTubLdXC3pBUvdyTGTW1CmQ9tkbtZ6JojTpjg]@db.ycuqjwordyqjxxczllzh.supabase.co:5432/postgres";
        this.sql = postgres(connectionString);
    }

    async save(user: User): Promise<void> {
        try {
            await this.sql`INSERT INTO users (email, dpi, name, age, is_valid, phone) VALUES (${user.getEmail()}, ${user.getDpi()}, ${user.getName()}, ${user.getAge()}, ${user.getIsValid()}, ${user.getPhone()});`;
        } catch (error) {
            console.error(error)
            throw new Error('Failed to save user')
        }
    }

    async getAll(): Promise<User[]> {
        try{
            const result = await this.sql`SELECT * FROM users`;
            return result.map(row => new User(
                UserId.create(row.id),
                UserEmail.create(row.email),
                UserDpi.create(row.dpi),
                UserName.create(row.name),
                UserAge.create(row.age),
                UserIsValid.create(row.is_valid),
                UserPhone.create(row.phone)
            ));
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve users');
        }
    }

    async getById(id: any): Promise<User> {
        try {
            const result = await this.sql`SELECT * FROM users WHERE id = ${id}`;
            if (result.length) {
                return new User(
                    UserId.create(result[0].id),
                    UserEmail.create(result[0].email),
                    UserDpi.create(result[0].dpi),
                    UserName.create(result[0].name),
                    UserAge.create(result[0].age),
                    UserIsValid.create(result[0].is_valid),
                    UserPhone.create(result[0].phone)
                );
            }
            throw new Error('User not found');
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve users');
        }
    }

    async update(id: any, email?: string, dpi?: string, name?: string, age?: number, is_valid?: boolean, phone?: string): Promise<void> {
        try {
            const user = await this.getById(id);
            console.log(email ?? user.getEmail(), dpi ?? user.getDpi(), name ?? user.getName(), age ?? user.getAge(), is_valid ?? user.getIsValid(), phone ?? user.getPhone());
            await this.sql`UPDATE users SET email = ${email ?? user.getEmail()}, dpi = ${dpi ?? user.getDpi()}, name = ${name ?? user.getName()}, age = ${age ?? user.getAge()}, is_valid = ${is_valid ?? user.getIsValid()}, phone = ${phone ?? user.getPhone()} WHERE id = ${id}`;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to update users');
        }
    }

    async delete(id: any): Promise<void> {
        try {
            await this.sql`DELETE FROM users WHERE id = ${id}`;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to delete users');
        }
    }

    async dzelete(id: any): Promise<void> {
        return this.delete(id);
    }
}