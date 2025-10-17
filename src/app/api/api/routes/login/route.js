import { NextResponse } from 'next/server';
import { loginUser} from "../../controllers/userController.js";


export async function POST(request) {
    try {
        const requestData = await request.json();
        const data = await loginUser(requestData);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}