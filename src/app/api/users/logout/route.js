import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    // Clear the 'user_token' cookie by setting its expiry to the past
    response.cookies.set("user_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0), // Immediate expiration
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error during logout" },
      { status: 500 }
    );
  }
}