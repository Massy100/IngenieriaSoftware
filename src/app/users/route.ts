import { NextRequest, NextResponse } from "next/server";

import { User } from "@/domain/models/user/User";
import { UserDto } from "@/domain/models/user/UserDto";
import { UserDtoGenerator } from "@/domain/models/user/UserDtoGenerator";

// Import Repository
// Import UserValidator

// Import UserCreator
// Import UserFinder

const userRepository = new UserRepository();
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

        const user = UserDtoGenerator.fromPrimitive(userDto);

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

export async function GET(request: NextRequest) {
    try {
        const data = await request.json();
        
        const user = data.email ? await userFinder.run(data.email): null;

        if (!user) throw new Error('Email not registered');

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({
            message: 'Error fetching user',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}