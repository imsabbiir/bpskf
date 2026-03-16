import { dbConnect } from "@/lib/mongodb";
import Volunteer from "@/model/volunteer";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { district: { $regex: search, $options: "i" } }
      ];
    }

    const totalVolunteers = await Volunteer.countDocuments(query);
    const volunteers = await Volunteer.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      volunteers,
      pagination: {
        total: totalVolunteers,
        page,
        limit,
        totalPages: Math.ceil(totalVolunteers / limit),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Fetching Volunteers failed!", error: err.message },
      { status: 500 }
    );
  }
}