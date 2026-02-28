import { dbConnect } from "@/lib/mongodb";
import Admin from "@/model/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    // 1. Authenticate via Cookie
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Get passwords from body
    const { currentPassword, newPassword } = await req.json();

    // 3. Find Admin
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    // 4. Check if current password is correct
    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Current password is wrong!" }, { status: 400 });
    }

    // 5. Hash new password and Save
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(newPassword, salt);
    await admin.save();

    return NextResponse.json({ message: "Password changed successfully!" }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error during password reset" }, { status: 500 });
  }
}