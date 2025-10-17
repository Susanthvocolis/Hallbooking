import argon2 from "argon2";
import jwt from 'jsonwebtoken';
import DBconnection from "../config/dbconfig.js";
import UserModel from "../models/userModel.js";


DBconnection();

export const createUser = async (userData) => {
    let exist = await UserModel.findOne({ email: userData.email })
    if (exist) {
        return { message: "User Already Exist", status: 200 }
    }
    let newUser = new UserModel(userData);
    const result = await newUser.save()
    if (result) {
        return { message: "User Registered Successfully", status: 200 };
    }
    return { message: "Error adding user", status: 500, error: error.message };
}

export const loginUser = async (credentials) => {
    try {
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) {
            return { message: "User not found", status: 404 };
        }
        const storedHash = user.password;
        if (!storedHash.startsWith("$argon2")) {
            return { message: "Invalid User Credentials!", status: 401 };
        }
        const isPasswordMatched = await argon2.verify(storedHash, credentials.password);
        if (!isPasswordMatched) {
            return { message: 'Invalid Password!', status: 401 };
        }
        const payload = {
            id: user?._id,
            fullName: user?.fullName,
            email: user?.email,
            role: user?.role,
            profileImage: user?.image,
        };
        const jwtToken = jwt.sign(payload, process.env.NEXT_PUBLIC_SECRET_KEY, { expiresIn: '12h' });
        return { jwtToken, message: "Login Successfully", status: 200 };
    } catch (error) {
        return { message: "Error logging in", status: 500, error: error.message };
    }
}

export const getUserById = async (id) => {
    try {
        const dbResponse = await UserModel.findById({ _id: id });
        if (dbResponse) {
            return { data: dbResponse, status: 200 };
        }
    } catch (error) {
        return { error: error.message, status: 500 };
    }
}

export const updateUser = async (userId, updateData) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        if (!updatedUser) {
            return { message: "User not found", status: 404 };
        }
        return { message: "User Data Updated Successfully", data: updatedUser, status: 200 };
    } catch (error) {
        return { message: "Error updating user", status: 500, error: error.message };
    }
}

export const deleteUser = async (userId) => {
    try {
        const dbResponse = await UserModel.findByIdAndDelete(userId);
        if (dbResponse) {
            return { message: "User Delete Successfully!", status: 200, }
        } else {
            return { message: "User Delete failed!", status: 404, }
        }
    } catch { }
}

export const changePassword = async (userId, oldPassword, newPassword) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return { message: "User not found", status: 404 };
        }
        const storedHash = user.password;
        if (!storedHash.startsWith("$argon2")) {
            return { message: "Invalid User Credentials!", status: 401 };
        }
        const isMatch = await argon2.verify(storedHash, oldPassword);
        if (!isMatch) {
            return { message: "Old password is incorrect", status: 400 };
        }
        const hashedNewPassword = await argon2.hash(newPassword);
        user.password = hashedNewPassword;
        await user.save();
        return { message: "Password changed successfully", status: 200 };
    } catch (error) {
        return { message: "Error changing password", status: 500, error: error.message };
    }
}