import { dbConnect } from "@/lib/mongodb";
import Admin from "@/model/admin";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await dbConnect();

    // 1. Get token from cookie
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find admin by id
    const admin = await Admin.findById(decoded.id).select(
      "_id name phone email role image createdAt"
    );

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found" },
        { status: 404 }
      );
    }

    // 4. Return admin data
    return NextResponse.json(
      {
        admin,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
