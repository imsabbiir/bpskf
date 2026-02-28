import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const user = await User.findById(id);
    if(!user){
        return NextResponse.json({ message: "Donor not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(
      { message: "Fatching Donor Details Failed!" },
      { status: 500 }
    );
  }
}
