import { NextResponse } from 'next/server';
import { changePassword } from "../../controllers/userController.js";

export async function PUT(request) {
    try {
        const reqData = await request.json();
        const { userId, oldPassword, newPassword } = reqData;
       const response = await changePassword(userId, oldPassword, newPassword);
       return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ message: "Error changing password", status: 500, error: error.message });
    }
}