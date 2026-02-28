import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req) {
  try {
    await dbConnect();
    const { phone, password } = await req.json();
    if (!phone || !password) {
      return NextResponse.json(
        { message: "Phone and password are required" },
        { status: 400 },
      );
    }
    const user = await User.findOne({ "common.phone_number": phone });
    if (!user) {
      return NextResponse.json(
        { message: "User is not available" },
        { status: 401 },
      );
    }
    // const isMatch = await bcrypt.compare(password, admin.password);

    if (password !== user.password) {
      return NextResponse.json(
        { message: "Password Dosen't Match!" },
        { status: 401 },
      );
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const response = NextResponse.json(
      {
        message: "User Login Successfull!",
        user: {
          id: user._id,
          name: user.common.name,
          phone: user.common.phone_number,
        },
      },
      { status: 200 },
    );
    response.cookies.set("user_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (err) {
    return NextResponse.json({ message: "User Login Faild!" }, { status: 500 });
  }
}
