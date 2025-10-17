import argon2 from "argon2";
// import nodemailer from "nodemailer";
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import { createUser } from "../../controllers/userController.js";

export async function POST(request) {
    try {
        const reqData = await request.formData()
        const fullName = reqData.get('fullName');
        const email = reqData.get('email');
        const password = reqData.get('password');
        const role = reqData.get('role') || 'Member'; // Default to 'User' if not provided
        const image = reqData.get('image');

        // const imageBuffer = image ? await image.arrayBuffer() : null;
        // const imageData = imageBuffer ? Buffer.from(imageBuffer) : null;
        // const imagePath = path.join(process.cwd(), 'public', 'Images', image.name);
        // if (imageData) {
        //     await writeFile(imagePath, imageData);
        // }
        const hashedPassword = await argon2.hash(password);

        console.log("Received data:", reqData);
        const data = await createUser({
            fullName,
            email,
            password: hashedPassword,
            role,
            // image: `/Images/${image.name}`,
        })
        // const transporter = nodemailer.createTransport({
        //     service: "gmail", // You can use SMTP settings instead
        //     host: "smtp.gmail.com",
        //     port: 587,
        //     secure: false,
        //     auth: {
        //         user: process.env.NEXT_PUBLIC_SMTP_USER, // Your email
        //         pass: process.env.NEXT_PUBLIC_SMTP_PASS, // Your app password
        //     },
        // });

        // await transporter.sendMail({
        //     from: `"Admin" <${process.env.NEXT_PUBLIC_SMTP_USER}>`,
        //     to: email,
        //     subject: "Your ID Number",
        //     text: `Hello ${firstName} ${lastName},\n\n Welcome to Nomo Mission Vande Gaumathram Trust \n\n your ID number is ${uniqueId}.`,
        // });
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}