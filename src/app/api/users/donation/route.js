import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await dbConnect();

    // 1. Authenticate User
    const token = req.cookies.get("user_token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { formData, editingIndex } = await req.json();

    // 2. Find User
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // 3. Update History Logic
    let history = [...(user.donor?.donation_history || [])];

    if (editingIndex !== null) {
      // EDIT: Update specific index
      history[editingIndex] = formData;
    } else {
      // ADD: Push new donation
      history.push(formData);
    }

    // 4. Update the User Document
    // We update history and also automatically set the last_donation_date 
    // to the most recent date found in the history array
    user.donor.donation_history = history;
    
    if (history.length > 0) {
      const sortedHistory = [...history].sort((a, b) => 
        new Date(b.donation_date) - new Date(a.donation_date)
      );
      user.donor.last_donation_date = sortedHistory[0].donation_date;
    }

    await user.save();

    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    console.error("DONATION_UPDATE_ERROR:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}