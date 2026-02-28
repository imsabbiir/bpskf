import { dbConnect } from "@/lib/mongodb";
import Admin from "@/model/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req) {
  try {
    await dbConnect();
    const { phone, password } = await req.json();
    if (!phone || !password) {
      return NextResponse.json(
        { message: "Phone adn password are required" },
        { status: 400 },
      );
    }
    const admin = await Admin.findOne({ phone: phone });
    if (!admin) {
      return NextResponse.json(
        { message: "User is not available" },
        { status: 401 },
      );
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password Dosen't Match!" },
        { status: 401 },
      );
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const response = NextResponse.json(
      {
        message: "Admin Login Successfull!",
        admin: {
          id: admin._id,
          name: admin.name,
          phone: admin.phone,
        },
      },
      { status: 200 },
    );
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      { message: "Admin Login Faild!" },
      { status: 500 },
    );
  }
}
