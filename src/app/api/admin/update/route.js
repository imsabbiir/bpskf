import { dbConnect } from "@/lib/mongodb";
import Admin from "@/model/admin";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  try {
    await dbConnect();

    // 1. Get token from cookies
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify token to get Admin ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded.id;

    // 3. Get data from request body
    const { name, email, phone, image } = await req.json();

    // 4. Update Admin in MongoDB
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { name, email, phone, image },
      { new: true } // returns the updated document
    ).select("-password"); // Don't send password back to frontend

    if (!updatedAdmin) {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully!",
      admin: updatedAdmin
    }, { status: 200 });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Update failed!" }, { status: 500 });
  }
}