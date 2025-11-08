import { NextRequest, NextResponse } from "next/server";
import { getProgress, setProgress } from "../../../actions/database";

// GET current progress
export async function GET() {
  const progress = await getProgress();
  return NextResponse.json({ progress });
}

// POST to update progress
export async function POST(req: NextRequest) {
  try {
    const { progress } = await req.json();
    if (typeof progress === "number") {
      await setProgress(progress);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: "Invalid number" }, { status: 400 });
  } catch (err) {
    console.error("POST /api/progress error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}