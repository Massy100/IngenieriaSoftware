import { NextRequest, NextResponse } from "next/server";

// Casos de uso 
import { SendNotificationUseCase } from "@/domain/models/use-cases/book/SendNotificationUseCase";
import { ValidateUserUseCase } from "@/domain/models/use-cases/book/ValidateUserUseCase";
import { GetUserBooksUseCase } from "@/domain/models/use-cases/book/GetUserBooksUseCase";

// Servicios y repositorios
import SupabaseUserRepository from "@/domain/models/repositories/SupabaseUserRepository";
import { UserFinder } from "@/domain/models/services/UserFinder";
import { InMemoryBookRepository } from "@/infrastructure/repositories/book/InMemoryBookRepository";
import { BookSearcher } from "@/domain/models/book/BookSearcher";
import { WhatsappNotificationSender } from "@/domain/models/notification/WhatsAppNotificationSender";
import { EmailNotificationSender } from "@/domain/models/notification/EmailNotificationSender";

// Inicialización de dependencias
const userRepository = new SupabaseUserRepository();
const userFinder = new UserFinder(userRepository);

// Handler especializado para enviar notificaciones
async function handleSendNotification(request: NextRequest): Promise<NextResponse> {
    try {
        const data = await request.json();

        if (!data.email) {
            throw new Error('Email is required');
        }

        const user = await userFinder.run(data.email);
        if (!user) {
            throw new Error('Email not registered');
        }

        await userRepository.update(
            user.getId(),
            undefined,
            undefined, 
            undefined, 
            undefined, 
            true, 
            undefined);

        if (data.wa) {
            await new WhatsappNotificationSender().send(user); 
        } else {
            await new EmailNotificationSender().send(user);
        }

        return NextResponse.json({
            message: 'Notification sent successfully',
            channel: data.wa ? 'whatsapp' : 'email'
        });

    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json({
            message: 'Error sending notification',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// Handler especializado para validar usuario y obtener libros
async function handleValidateUserAndGetBooks(request: NextRequest): Promise<NextResponse> {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        
        if (!email) {
            throw new Error('Email is required');
        }

        const user = await userFinder.run(email);
        if (!user) {
            throw new Error('Email not registered');
        }

        if (!user.getIsValid()) {
            throw new Error('User is not valid');
        }

        const bookRepository = new InMemoryBookRepository();
        const bookSearcher = new BookSearcher(bookRepository, userFinder);
        const books = await bookSearcher.run(user.getEmail());

        return NextResponse.json({
            message: 'User is valid',
            books: books
        });

    } catch (error) {
        console.error('Error validating user:', error);
        return NextResponse.json({
            message: 'Error validating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// Handler especializado para extraer email
function extractEmailFromRequest(request: NextRequest): string {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
        throw new Error('Email is required');
    }
    
    return email;
}

// Handler especializado para validar usuario
async function validateUser(email: string) {
    const user = await userFinder.run(email);
    
    if (!user) {
        throw new Error('Email not registered');
    }
    
    if (!user.getIsValid()) {
        throw new Error('User is not valid');
    }
    
    return user;
}

// Handler especializado para obtener libros de usuario
async function getUserBooks(userEmail: string) {
    const bookRepository = new InMemoryBookRepository();
    const bookSearcher = new BookSearcher(bookRepository, userFinder);
    return await bookSearcher.run(userEmail);
}

// Handler principal para GET 
async function handleGetRequestRefactored(request: NextRequest): Promise<NextResponse> {
    try {
        const email = extractEmailFromRequest(request);
        const user = await validateUser(email);
        const books = await getUserBooks(user.getEmail());

        return NextResponse.json({
            message: 'User is valid',
            books: books
        });

    } catch (error) {
        console.error('Error validating user:', error);
        return NextResponse.json({
            message: 'Error validating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// Exportaciones principales, Responsabilidad: solo delegación
export async function POST(request: NextRequest): Promise<NextResponse> {
    return await handleSendNotification(request);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    return await handleGetRequestRefactored(request);
}