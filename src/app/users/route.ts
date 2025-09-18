import { NextRequest, NextResponse } from "next/server";

import { User } from "@/domain/models/user/User";
import { UserDto } from "@/domain/models/user/UserDto";
import { UserDtoGenerator } from "@/domain/models/user/UserDtoGenerator";

import SupabaseUserRepository from "@/domain/models/repositories/SupabaseUserRepository";

import { UserCreator } from "@/domain/models/services/UserCreator";
import { UserFinder } from "@/domain/models/services/UserFinder";
import { UserValidator } from "@/domain/models/services/UserValidator";

const userRepository = new SupabaseUserRepository();
const userCreator = new UserCreator(userRepository);
const userFinder = new UserFinder(userRepository);

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        const userDto = new UserDto(
            data.id, 
            data.email,
            data.dpi, 
            data.name, 
            data.age,
            false,
            data.phone
        );

        const user = UserDtoGenerator.fromPrimitives(userDto);

        await userCreator.run(user);
        
        return NextResponse.json({
            message: 'User created successfully',
        });

    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({
            message: 'Error creating user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });

    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');
        
        if (!email) {
            return NextResponse.json({
                message: 'Email parameter is required'
            }, { status: 400 });
        }

        const user = await userFinder.run(email);

        if (!user) {
            return NextResponse.json({
                message: 'Email not registered'
            }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({
            message: 'Error fetching user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}