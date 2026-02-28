import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await dbConnect();

    // 1. Get token from cookies
    const token = req.cookies.get("user_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
    }

    // 3. Find user by id (Corrected variable names from 'admin' to 'user')
    const user = await User.findById(decoded.id).select(
      "_id common ip_addresses donor volunteer createdAt"
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 4. Return user data
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error("GET_USER_ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}