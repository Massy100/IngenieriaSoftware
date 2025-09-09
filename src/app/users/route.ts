import { NextRequest, NextResponse } from "next/server";

// Import User
// Import UserDto
// Import DtoGenerator

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

        const userDto = UserDto(
            data.id, 
            data.email, 
            data.name, 
            data.age,
            false
        );

        const user = DtoGenerator.fromPrimitive(userDto);

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