import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db"; 
import User from "@/models/User"; 

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) return NextResponse.json({ success: false }, { status: 400 });

    await connectDB();
    const user = await User.findOne({ email });

    if (!user) return NextResponse.json({ success: false }, { status: 404 });

    return NextResponse.json({
      success: true,
      role: user.role,
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}