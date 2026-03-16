// /pages/api/volunteers/[id].js
import { dbConnect } from "@/lib/mongodb";
import Volunteer from "@/model/volunteer";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const volunteer = await Volunteer.findById(id);
    if (!volunteer) return NextResponse.json({ message: "Volunteer not found" }, { status: 404 });

    return NextResponse.json(volunteer);
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}