import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PATCH(req) {
  try {
    await dbConnect();

    // 1. Get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("user_token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Get Update Data from request
    const updateData = await req.json();

    // 4. Update the User in MongoDB
    // Using $set to ensure we only change the volunteer fields
    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      { $set: updateData },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    }, { status: 200 });

  } catch (err) {
    console.error("Update Error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}