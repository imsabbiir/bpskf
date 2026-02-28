import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";

export async function GET() {
  await dbConnect();

  try {
    const results = await User.aggregate([
      // 1. Initial Filter
      { $match: { "donor.donation_history": { $exists: true, $not: { $size: 0 } } } },
      
      // 2. Unwind history so each donation is a document
      { $unwind: "$donor.donation_history" },

      // 3. Multi-pipeline processing
      {
        $facet: {
          // PIPELINE 1: For the Table (Detailed History)
          "detailedHistory": [
            {
              $project: {
                _id: 0,
                donor_name: "$common.name",
                blood_group: "$common.blood_group",
                phone: "$common.phone_number",
                image: "$common.image",
                patient_name: "$donor.donation_history.patient_name",
                hospital_name: "$donor.donation_history.hospital_name",
                location: "$donor.donation_history.location",
                donation_date: "$donor.donation_history.donation_date",
              }
            },
            { $sort: { donation_date: -1 } },
            { $limit: 50 } // Adjust limit as needed
          ],

          // PIPELINE 2: For the Chart (Monthly Counts)
          "chartStats": [
            {
              $project: {
                year: { $year: { $toDate: "$donor.donation_history.donation_date" } },
                month: { $month: { $toDate: "$donor.donation_history.donation_date" } },
              }
            },
            {
              $group: {
                _id: { year: "$year", month: "$month" },
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ]);

    // Extract the results from the facet
    const { detailedHistory, chartStats } = results[0];

    // --- TRANSFORM CHART DATA TO YEAR-BASED OBJECT ---
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYear = new Date().getFullYear();
    const historicalDonations = {};

    for (let y = 2018; y <= currentYear; y++) {
      historicalDonations[y] = monthNames.map(name => ({ name, donations: 0 }));
    }

    chartStats.forEach(item => {
      const { year, month } = item._id;
      if (historicalDonations[year]) {
        historicalDonations[year][month - 1].donations = item.count;
      }
    });

    return NextResponse.json({ 
      success: true, 
      historicalDonations, // Array 1: Chart Data
      allDonations: detailedHistory // Array 2: Detailed Table Data
    });

  } catch (error) {
    console.error("Aggregation Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}