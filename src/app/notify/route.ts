import { NextRequest, NextResponse } from "next/server";

// Import User
// Import UserDto
// Import DtoGenerator

// Import Repository
// Import UserValidator

// Import UserFinder

// Import EmailService
// Import WhatsappService

const userRepository = new UserRepository();
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