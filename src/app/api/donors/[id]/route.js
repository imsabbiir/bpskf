import { dbConnect } from "@/lib/mongodb";
import Donor from "@/model/donor";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const donor = await Donor.findById(id);
    if(!donor){
        return NextResponse.json({ message: "Donor not found" }, { status: 404 });
    }
    return NextResponse.json(donor);
  } catch (err) {
    return NextResponse.json(
      { message: "Fatching Donor Details Failed!" },
      { status: 500 }
    );
  }
}
