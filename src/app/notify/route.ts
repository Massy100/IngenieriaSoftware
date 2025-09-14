import { NextRequest, NextResponse } from "next/server";

import { User } from "@/domain/models/user/User";
import { UserDto } from "@/domain/models/user/UserDto";
import { UserDtoGenerator } from "@/domain/models/user/UserDtoGenerator";

import SupabaseUserRepository from "@/domain/models/repositories/SupabaseUserRepository";
import { UserValidator } from "@/domain/models/services/UserValidator";
import { UserFinder } from "@/domain/models/services/UserFinder";

import { BookSearcher } from "@/domain/models/book/BookSearcher";

// Import EmailService
// Import WhatsappService

const userRepository = new SupabaseUserRepository();
const userFinder = new UserFinder(userRepository);

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        if (!data.email) throw new Error('Email is required'); 

        const user = data.email ? await userFinder.run(data.email): null;
        if (!user) throw new Error('Email not registered');

        if (data.wa) {
            const notificationSender = new WhatsappService();
        } else {
            const notificationSender = new EmailService();
        }

        await notificationSender.send(user);
        return NextResponse.json({
            message: 'Notification sent successfully',
        });
    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json({
            message: 'Error sending notification',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const data = await request.json();
        
        const user = data.email ? await userFinder.run(data.email): null;
        
        if (!user) throw new Error('Email not registered');

        if  (user.getIsValid()) {
            const bookSearcher = new BookSearcher();
            const books = await bookSearcher.run();

            return NextResponse.json({
                message: 'User is valid',
                books: books
            });
        } else {
            throw new Error('User is not valid');
        }
    } catch (error) {
        console.error('Error validating user:', error);
        return NextResponse.json({
            message: 'Error validating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}