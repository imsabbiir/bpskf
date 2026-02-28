import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user"; // Ensure this matches your new model filename
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    
    // 1. Get Parameters
    const search = searchParams.get("search");
    const verified = searchParams.get("verified"); // e.g., 'pending', 'approved', 'rejected'
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    let query = {};

    // 2. Filter by Verification Status
    // In the new schema, verification status is stored in donor.status
    if (verified) {
      query["donor.status"] = verified;
    }

    // 3. Search Logic using Dot Notation for Nested Fields
    if (search) {
      query.$or = [
        { "common.name": { $regex: search, $options: "i" } },
        { "common.address.city": { $regex: search, $options: "i" } },
        { "common.address.district": { $regex: search, $options: "i" } },
        { "common.address.upazila": { $regex: search, $options: "i" } },
        { "common.phone_number": { $regex: search, $options: "i" } },
      ];
    }

    // 4. Execute Query with Pagination
    const users = await User.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 5. Get Total Count for Pagination UI
    const totalDonors = await User.countDocuments(query);

    return NextResponse.json({
      donors: users,
      pagination: {
        total: totalDonors,
        page,
        limit,
        totalPages: Math.ceil(totalDonors / limit),
      },
    });
  } catch (err) {
    console.error("GET API Error:", err.message);
    return NextResponse.json(
      { message: "API Error", error: err.message },
      { status: 500 }
    );
  }
}