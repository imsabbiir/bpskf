import { dbConnect } from "@/lib/mongodb";
import Donor from "@/model/donor";
import { NextResponse } from "next/server";

const calculateAvailability = (dateStr) => {
  if (!dateStr) return true;
  const [d, m, y] = dateStr.split("/");
  const lastDate = new Date(`${y}-${m}-${d}`);
  const today = new Date();
  const diff = (today - lastDate) / (1000 * 3600 * 24);
  return diff >= 120;
};

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const group = searchParams.get("group")?.replace(' ', '+');
    const availability = searchParams.get("availability");
    
    // Pagination Params (with defaults)
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    let query = { verified: "approved" };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { district: { $regex: search, $options: "i" } },
      ];
    }

    if (group) {
      query.blood_group = group;
    }

    // 1. Fetch from DB
    let donors = await Donor.find(query).sort({ createdAt: -1 });

    // 2. Filter by Availability (JS Level)
    if (availability) {
      donors = donors.filter((d) => {
        const isAvail = calculateAvailability(d.last_donation_date);
        return availability === "available" ? isAvail : !isAvail;
      });
    }

    // 3. Manual Pagination after JS Filtering
    const totalDonors = donors.length;
    const totalAvailable = donors.filter(d => calculateAvailability(d.last_donation_date)).length;
    const paginatedDonors = donors.slice(skip, skip + limit);

    return NextResponse.json({
      donors: paginatedDonors,
      totalAvailable: totalAvailable,
      pagination: {
        total: totalDonors,
        page,
        limit,
        totalPages: Math.ceil(totalDonors / limit),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Fetching Donors crashed!", error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const donor = await Donor.create(body);
    return NextResponse.json(donor, { status: 201 });
  } catch (error) {
    console.error("POST /api/users ERROR:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
