import { NextRequest, NextResponse } from "next/server";

// Casos de uso
import { CreateUserUseCase } from "@/domain/models/use-cases/user/CreateUserUseCase";
import { GetUserUseCase } from "@/domain/models/use-cases/user/GetUserUseCase";
import { GetAllUsersUseCase } from "@/domain/models/use-cases/user/GetAllUsersUseCase";

// Servicios y repositorios
import SupabaseUserRepository from "@/domain/models/repositories/SupabaseUserRepository";
import { UserCreator } from "@/domain/models/services/UserCreator";
import { UserFinder } from "@/domain/models/services/UserFinder";

// Inicialización de dependencias
const userRepository = new SupabaseUserRepository();
const userCreator = new UserCreator(userRepository);
const userFinder = new UserFinder(userRepository);

const createUserUseCase = new CreateUserUseCase(userCreator);
const getUserUseCase = new GetUserUseCase(userFinder);
const getAllUsersUseCase = new GetAllUsersUseCase();

// Handler especializado para POST
async function handlePostRequest(request: NextRequest): Promise<NextResponse> {
    try {
        const data = await request.json();
        const result = await createUserUseCase.execute(data);
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({
            message: 'Error creating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// Handler especializado para GET con email
async function handleGetUserByEmail(email: string): Promise<NextResponse> {
    try {
        const user = await getUserUseCase.execute(email);
        return NextResponse.json(user);

    } catch (error) {
        if (error instanceof Error && error.message === 'Email not registered') {
            return NextResponse.json({
                message: 'Email not registered'
            }, { status: 404 });
        }
        
        console.error('Error fetching user:', error);
        return NextResponse.json({
            message: 'Error fetching user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// Handler especializado para GET todos los usuarios
async function handleGetAllUsers(): Promise<NextResponse> {
    try {
        const allUsers = await getAllUsersUseCase.execute();
        return NextResponse.json(allUsers);

    } catch (error) {
        console.error('Error fetching all users:', error);
        return NextResponse.json({
            message: 'Error fetching users',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// Handler principal para GET, Responsabilidad: solo coordina
async function handleGetRequest(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
        return await handleGetAllUsers();
    }
    
    return await handleGetUserByEmail(email);
}

// Exportaciones principales, Responsabilidad: solo delegación
export async function POST(request: NextRequest): Promise<NextResponse> {
    return await handlePostRequest(request);
}

export async function GET(request: Request): Promise<NextResponse> {
    return await handleGetRequest(request);
}