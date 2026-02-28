import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const selectedYear = parseInt(searchParams.get("year")) || new Date().getFullYear();

    // 1. Find the earliest donation date to build the dynamic year list
    const firstDonation = await User.aggregate([
      { $unwind: "$donor.donor_history" },
      { $project: { date: { $toDate: "$donor.donor_history" } } },
      { $sort: { date: 1 } },
      { $limit: 1 }
    ]);

    const startYear = firstDonation.length > 0 
      ? new Date(firstDonation[0].date).getFullYear() 
      : 2024; // Default if no history exists

    const [approvedDonors, pendingDonors, approvedVolunteers, recentDonors, historyStats] = await Promise.all([
      User.countDocuments({ "donor.status": "approved" }),
      User.countDocuments({ "donor.status": "pending" }),
      User.countDocuments({ "volunteer.status": "approved" }),
      User.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .select("common.name common.blood_group donor.status common.image createdAt"),

    
      
      // 2. Aggregate counts for the selected year
      User.aggregate([
        { $unwind: "$donor.donation_history" },
        {
          $addFields: {
            donationDate: { $toDate: "$donor.donation_history" }
          }
        },
        {
          $match: {
            $expr: { $eq: [{ $year: "$donation_date" }, selectedYear] }
          }
        },
        {
          $group: {
            _id: { month: { $month: "$donation_date" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id.month": 1 } }
      ])
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = monthNames.map((name, index) => {
      const found = historyStats.find(item => item._id.month === index + 1);
      return { name, donations: found ? found.count : 0 };
    });

    return NextResponse.json({
      success: true,
      stats: { approved: approvedDonors, pending: pendingDonors, volunteers: approvedVolunteers },
      recentDonors,
      chartData,
      startYear // Send this to the frontend
    }, { status: 200 });

  } catch (err) {
    console.error("Aggregation Error:", err);
    return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
  }
}