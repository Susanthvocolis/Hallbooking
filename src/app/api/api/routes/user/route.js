import { NextResponse } from 'next/server';
import { getUsers } from "../../controllers/userController.js";

export async function GET(request) {
    const userRole = request.headers.get("x-user-role");
    try {
        const data = await getUsers(userRole);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}