import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/auth";
import { syncReadmeNow } from "@/lib/data-service";

export async function POST() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncReadmeNow();
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "File README.md đã được đồng bộ chuẩn xác từ dữ liệu Portfolio!" });
}
