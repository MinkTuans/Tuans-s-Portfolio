import { NextRequest, NextResponse } from "next/server";
import { checkAdminPassword, setAdminSessionCookie, clearAdminSessionCookie, isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  const authenticated = isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (checkAdminPassword(password)) {
      setAdminSessionCookie();
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false, error: "Mật khẩu quản trị không chính xác." }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }
}

export async function DELETE() {
  clearAdminSessionCookie();
  return NextResponse.json({ success: true });
}
