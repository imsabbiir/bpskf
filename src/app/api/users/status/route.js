import { dbConnect } from "@/lib/mongodb";
import User from "@/model/user";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    await dbConnect();
    const { ids, status } = await request.json();

    if (!ids || !status) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    if (status === "approved") {
      // 1. Fetch users to check if they already have a password at the root
      const users = await User.find({ _id: { $in: ids } }, "password");
      
      // Helper to generate a 6-digit random string
      const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();

      const bulkOps = users.map((user) => {
        // Check if password exists at root level
        const hasPassword = user.password && user.password.toString().trim() !== "";

        return {
          updateOne: {
            filter: { _id: user._id },
            update: {
              $set: {
                "donor.status": "approved",
                // Set new random PIN only if password field is empty
                "password": hasPassword ? user.password : generatePin()
              }
            }
          }
        };
      });

      if (bulkOps.length > 0) {
        await User.bulkWrite(bulkOps);
      }
    } else {
      // 2. Simple status update for 'blocked' or 'pending'
      await User.updateMany(
        { _id: { $in: ids } },
        { $set: { "donor.status": status } }
      );
    }

    return NextResponse.json({ message: `Success: Status set to ${status}` });
  } catch (err) {
    return NextResponse.json(
      { message: "API Error", error: err.message },
      { status: 500 }
    );
  }
}