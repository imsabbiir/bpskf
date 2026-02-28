import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";

// Updated to handle YYYY-MM-DD format from the new JSON/Model
const calculateAvailability = (dateStr) => {
  if (!dateStr) return true;
  const lastDate = new Date(dateStr);
  const today = new Date();
  const diff = (today - lastDate) / (1000 * 3600 * 24);
  return diff >= 120; // 4 months rule
};

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const group = searchParams.get("group")?.replace(' ', '+');
    const availability = searchParams.get("availability");
    
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Updated path to match nested 'donor.status'
    let query = { "donor.status": "approved" };

    if (search) {
      query.$or = [
        { "common.name": { $regex: search, $options: "i" } },
        { "common.address.city": { $regex: search, $options: "i" } },
        { "common.address.district": { $regex: search, $options: "i" } },
      ];
    }

    if (group) {
      // Updated path to match nested 'common.blood_group'
      query["common.blood_group"] = group;
    }

    // 1. Fetch from DB
    let users = await User.find(query).sort({ createdAt: -1 });

    // 2. Filter by Availability (JS Level)
    if (availability) {
      users = users.filter((u) => {
        const isAvail = calculateAvailability(u.donor.last_donation_date);
        return availability === "available" ? isAvail : !isAvail;
      });
    }

    // 3. Manual Pagination after JS Filtering
    const totalDonors = users.length;
    const totalAvailable = users.filter(u => 
      calculateAvailability(u.donor.last_donation_date)
    ).length;
    
    const paginatedDonors = users.slice(skip, skip + limit);

    return NextResponse.json({
      users: paginatedDonors,
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

    // 1. LOG THE INCOMING DATA (Check your terminal for this!)
    console.log("--- Incoming Data ---", JSON.stringify(body, null, 2));

    // 2. SANITIZE DATA
    if (body.common) {
      // Ensure phone is only digits
      if (body.common.phone_number) {
        body.common.phone_number = body.common.phone_number.replace(/\D/g, '');
      }
      // Ensure gender is exactly 'male', 'female', or 'other'
      if (body.common.gender) {
        body.common.gender = body.common.gender.toLowerCase().trim();
      }
    }

    // Ensure weight is a number
    if (body.donor && body.donor.weight !== undefined) {
      body.donor.weight = Number(body.donor.weight) || 0;
    }

    // 3. CAPTURE METADATA
    const ip = req.headers.get("x-forwarded-for")?.split(',')[0] || "127.0.0.1";
    const device = req.headers.get("user-agent") || "Unknown Device";

    const finalData = {
      ...body,
      ip_addresses: {
        ip: ip,
        device: device,
        created_at: new Date().toISOString().split('T')[0]
      }
    };

    // 4. CREATE USER
    const newUser = await User.create(finalData);

    return NextResponse.json({ success: true, id: newUser._id }, { status: 201 });

  } catch (error) {
    // THIS PART IS CRITICAL: It tells you WHY it's failing
    console.error("❌ MONGOOSE ERROR:", error.message);

    if (error.name === "ValidationError") {
      // Get the specific field that failed (e.g., "common.blood_group")
      const errorField = Object.keys(error.errors)[0];
      const errorMessage = error.errors[errorField].message;
      
      return NextResponse.json(
        { message: `${errorField}: ${errorMessage}` }, 
        { status: 400 }
      );
    }

    if (error.code === 11000) {
      return NextResponse.json({ message: "Phone number already exists." }, { status: 400 });
    }

    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}