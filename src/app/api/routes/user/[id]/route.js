import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import * as argon2 from "argon2";
import {getUserById, updateUser, deleteUser } from "@/app/api/controllers/userController";

export async function GET(request, { params }) {
  // const userId = request.headers.get("x-user-id");
    const { id } = await params;
    try {
        const data = await getUserById(id)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
  // const userId = request.headers.get("x-user-id");
    const { id } = await params;
  try {
    const reqData = await request.formData();
    // const userId = reqData.get("userId"); // user id to update

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Collect updatable fields
    const updateFields = {};

    const fields = [
      "firstName",
      "email",
      "role"
    ];

    for (const field of fields) {
      const value = reqData.get(field);
      if (value) {
        updateFields[field] = value;
      }
    }

    // Handle password update if provided
    const password = reqData.get("password");
    if (password) {
      updateFields.password = await argon2.hash(password);
    }

    // Handle image update if provided
    // const image = reqData.get("image");
    // if (image && image.size > 0) {
    //   const imageBuffer = await image.arrayBuffer();
    //   const imageData = Buffer.from(imageBuffer);
    //   const imagePath = path.join(process.cwd(), "public", "Images", image.name);
    //   await writeFile(imagePath, imageData);
    //   updateFields.image = `/Images/${image.name}`;
    // }

    // Update user in DB
    const updatedUser = await updateUser(id, updateFields);

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        const data = await deleteUser(id)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}