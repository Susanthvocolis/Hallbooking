import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["Owner", "Admin", "Member"] },
    image: { type: Buffer, required: false },
}, { timestamps: true, });

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema, "users");

export default UserModel;