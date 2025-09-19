import { Sql } from 'postgres';
import postgres from 'postgres';
import { User } from '../user/User';
import UserRepository from './interfaces/UserRepository';
import { createClient } from '@supabase/supabase-js';
import { UserId } from '../user/value-objects/UserId';
import { UserEmail } from '../user/value-objects/UserEmail';
import { UserDpi } from '../user/value-objects/UserDpi';
import { UserName } from '../user/value-objects/UserName';
import { UserAge } from '../user/value-objects/UserAge';
import { UserIsValid } from '../user/value-objects/UserIsValid';
import { UserPhone } from '../user/value-objects/UserPhone'; 

export default class SupabaseUserRepository implements UserRepository {
    private readonly sql: Sql;
    private client;

    constructor() {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
        const connectionString = process.env.DATABASE_URL;

        if (!supabaseUrl || !supabaseAnonKey || !connectionString) {
            throw new Error('Faltan variables de entorno requeridas');
        }
        
        this.sql = postgres(connectionString);
        this.client = createClient(supabaseUrl, supabaseAnonKey);
    }

    async save(user: User): Promise<void> {
        console.log('💾 Intentando guardar usuario en Supabase...');
        
        try {
            const userData = {
                id: user.getId(),          
                email: user.getEmail(),    
                dpi: user.getDpi(),       
                name: user.getName(),      
                age: user.getAge(),        
                isValid: user.getIsValid(), 
                phone: user.getPhone()       
            };

            console.log('📦 Datos a insertar:', userData);

            const { data, error } = await this.client
                .from('users')
                .insert([userData]);

            console.log('✅ Respuesta de Supabase - data:', data);
            
            if (error) {
                console.error('❌ Error de Supabase:', error);
                console.error('📋 Detalles del error:', {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    hint: error.hint
                });
                throw new Error(`Failed to save user: ${error.message}`);
            }

            console.log('🎉 Usuario guardado exitosamente en Supabase');

        } catch (error) {
            console.error('💥 Error completo en save():', error);
            throw new Error('Failed to save user');
        }
    }

    async getAll(): Promise<User[]> {
        try{
            const result = await this.sql`SELECT * FROM users`;
            return result.map(row => new User(
                UserId.create(parseInt(row.id)),
                UserEmail.create(row.email),
                UserDpi.create(row.dpi),
                UserName.create(row.name),
                UserAge.create(row.age),
                UserIsValid.create(Boolean(row.is_valid)),
                UserPhone.create(row.phone),
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
                    UserId.create(parseInt(result[0].id)),
                    UserEmail.create(result[0].email),
                    UserDpi.create(result[0].dpi),
                    UserName.create(result[0].name),
                    UserAge.create(result[0].age),
                    UserIsValid.create(Boolean(result[0].is_valid)),
                    UserPhone.create(result[0].phone)
                );
            }
            throw new Error('User not found');
        } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve users');
        }
    }

    async getByEmail(email: string): Promise<User> {
        try {
            const result = await this.sql`SELECT * FROM users WHERE email = ${email}`;
            if (result.length) {
                return new User(
                    UserId.create(parseInt(result[0].id)),
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