"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, KeyRound, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.refresh();
      } else {
        setError(data.error || "Mật khẩu không chính xác.");
      }
    } catch {
      setError("Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-steppe-900 border border-steppe-800 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-amber-sun/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-steppe-850 border border-steppe-700 flex items-center justify-center text-amber-sun mb-4 shadow-inner">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-display font-bold text-steppe-50">
            Wolf CMS Quản Trị
          </h1>
          <p className="mt-1 text-xs text-steppe-400 font-mono">
            Khu vực quản lý nội dung độc quyền của Phạm Minh Tuấn
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 flex items-center gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-mono text-steppe-300 uppercase tracking-wider mb-2">
              Khóa Bảo Mật (Admin Password)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-steppe-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu truy cập..."
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-steppe-950 border border-steppe-750 text-sm font-mono text-steppe-100 placeholder-steppe-600 focus:outline-none focus:border-amber-sun transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl text-sm font-medium text-steppe-950 bg-amber-sun hover:bg-amber-warm transition-colors flex items-center justify-center gap-2 font-sans font-semibold disabled:opacity-50 shadow-lg shadow-amber-sun/10"
          >
            {isLoading ? (
              <span>Đang kiểm tra...</span>
            ) : (
              <>
                <span>Mở Khóa Quản Trị</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-steppe-800 text-center">
          <a
            href="/"
            className="text-xs font-mono text-steppe-400 hover:text-steppe-200 transition-colors"
          >
            ← Trở lại Portfolio công khai
          </a>
        </div>
      </div>
    </div>
  );
}
