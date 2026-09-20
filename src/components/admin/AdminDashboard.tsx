"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PortfolioData, ProjectCaseStudy, SkillCategory, ExperienceItem } from "@/types/portfolio";
import {
  Layers,
  Sparkles,
  Save,
  RotateCw,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Briefcase,
  Wrench,
  User,
  Check,
} from "lucide-react";

interface AdminDashboardProps {
  initialData: PortfolioData;
}

export default function AdminDashboard({ initialData }: AdminDashboardProps) {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData>(initialData);
  const [activeTab, setActiveTab] = useState<"projects" | "skills" | "experience" | "profile" | "json">("projects");
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  // Save changes to Single Source of Truth + trigger README update
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        showNotification("success", "Đã lưu dữ liệu và tự động đồng bộ README.md!");
      } else {
        showNotification("error", resData.error || "Lỗi khi lưu dữ liệu.");
      }
    } catch {
      showNotification("error", "Lỗi kết nối khi gửi dữ liệu.");
    } finally {
      setIsSaving(false);
    }
  };

  // Trigger manual README sync
  const handleSyncReadme = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      const resData = await res.json();
      if (res.ok && resData.success) {
        showNotification("success", "File README.md trên GitHub đã được đồng bộ mới nhất!");
      } else {
        showNotification("error", resData.error || "Lỗi đồng bộ README.");
      }
    } catch {
      showNotification("error", "Không thể kết nối đến API đồng bộ.");
    } finally {
      setIsSyncing(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Top Admin Sticky Bar */}
      <header className="sticky top-0 z-40 bg-steppe-900/90 backdrop-blur-md border-b border-steppe-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-sun/10 border border-amber-sun/30 flex items-center justify-center text-amber-sun font-display font-bold">
            🐺
          </div>
          <div>
            <h1 className="text-sm font-display font-bold text-steppe-50">
              Wolf Portfolio CMS
            </h1>
            <p className="text-[11px] font-mono text-steppe-400">
              Single Source of Truth • Auto-syncing README.md
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-steppe-300 hover:text-white bg-steppe-850 hover:bg-steppe-800 border border-steppe-750 transition-colors"
          >
            <span>Xem Website</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={handleSyncReadme}
            disabled={isSyncing}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono text-steppe-100 bg-steppe-800 hover:bg-steppe-750 border border-steppe-700 transition-colors disabled:opacity-50"
            title="Đồng bộ ngay dữ liệu sang file README.md"
          >
            <RotateCw className={`w-3.5 h-3.5 text-tech-emerald ${isSyncing ? "animate-spin" : ""}`} />
            <span>{isSyncing ? "Đang Sync..." : "Sync README"}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-steppe-950 bg-amber-sun hover:bg-amber-warm transition-colors shadow-sm disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? "Đang Lưu..." : "Lưu Dữ Liệu"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-steppe-400 hover:text-red-300 hover:bg-steppe-800 transition-colors"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-2xl text-xs font-mono ${
              notification.type === "success"
                ? "bg-steppe-900 border-tech-emerald/50 text-tech-emerald"
                : "bg-red-950 border-red-700 text-red-200"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-tech-emerald flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-steppe-900/90 border border-steppe-800 max-w-fit mb-8 overflow-x-auto">
          {[
            { id: "projects", label: "Dự Án (Projects)", icon: Layers },
            { id: "skills", label: "Kỹ Năng (Skills)", icon: Wrench },
            { id: "experience", label: "Kinh Nghiệm (Experience)", icon: Briefcase },
            { id: "profile", label: "Hồ Sơ & Contact", icon: User },
            { id: "json", label: "JSON Raw Editor", icon: FileCode },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                  isActive
                    ? "bg-steppe-800 text-amber-sun shadow-sm border border-steppe-700 font-semibold"
                    : "text-steppe-400 hover:text-steppe-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-bold text-steppe-50">
                  Quản Lý Dự Án ({data.projects.length})
                </h2>
                <p className="text-xs text-steppe-400 font-mono mt-0.5">
                  Chỉnh sửa các trường dữ liệu Case Study và phần &quot;WHAT I ACTUALLY BUILT&quot;
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {data.projects.map((proj, pIdx) => (
                <div
                  key={proj.id}
                  className="p-6 rounded-3xl bg-steppe-900/60 border border-steppe-800 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-steppe-850">
                    <span className="text-base font-display font-bold text-steppe-100">
                      {pIdx + 1}. {proj.name}
                    </span>
                    <span className="text-xs font-mono text-amber-sun px-2.5 py-0.5 rounded bg-steppe-850 border border-steppe-750">
                      {proj.timeframe}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-steppe-400 mb-1">Tên Dự Án</label>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].name = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100 focus:outline-none focus:border-amber-sun"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-steppe-400 mb-1">Vai Trò (Role)</label>
                      <input
                        type="text"
                        value={proj.role}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[pIdx].role = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100 focus:outline-none focus:border-amber-sun"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-steppe-400 mb-1">Mô Tả Ngắn (Tagline)</label>
                    <input
                      type="text"
                      value={proj.tagline}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[pIdx].tagline = e.target.value;
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs text-steppe-100 focus:outline-none focus:border-amber-sun"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-tech-emerald mb-1">
                      WHAT I ACTUALLY BUILT (Từng đóng góp trực tiếp - mỗi dòng 1 ý)
                    </label>
                    <textarea
                      rows={4}
                      value={proj.myContribution.join("\n")}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[pIdx].myContribution = e.target.value.split("\n").filter(Boolean);
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100 focus:outline-none focus:border-tech-emerald"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-steppe-400 mb-1">
                      Technologies (phân cách bằng dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={proj.technologies.join(", ")}
                      onChange={(e) => {
                        const updated = [...data.projects];
                        updated[pIdx].technologies = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
                        setData({ ...data, projects: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100 focus:outline-none focus:border-amber-sun"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-steppe-50">
              Quản Lý Hệ Sinh Thái Kỹ Năng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.skillCategories.map((cat, cIdx) => (
                <div key={cat.id} className="p-6 rounded-3xl bg-steppe-900/60 border border-steppe-800 space-y-4">
                  <h3 className="text-base font-display font-bold text-amber-sun">
                    {cat.title}
                  </h3>
                  <div className="space-y-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div key={skill.id} className="p-2.5 rounded-xl bg-steppe-950 border border-steppe-800 text-xs flex items-center justify-between gap-2">
                        <div>
                          <span className="font-mono font-semibold text-steppe-100">{skill.name}</span>
                          {skill.roleOrContext && (
                            <p className="text-[11px] text-steppe-400 mt-0.5">{skill.roleOrContext}</p>
                          )}
                        </div>
                        <button
                          onClick={() => {
                            const updated = [...data.skillCategories];
                            updated[cIdx].skills = updated[cIdx].skills.filter((_, i) => i !== sIdx);
                            setData({ ...data, skillCategories: updated });
                          }}
                          className="text-steppe-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCE */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-steppe-50">
              Kinh Nghiệm Doanh Nghiệp
            </h2>
            {data.experience.map((exp, eIdx) => (
              <div key={exp.id} className="p-6 rounded-3xl bg-steppe-900/60 border border-steppe-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-steppe-400 mb-1">Công Ty</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[eIdx].company = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100 focus:outline-none focus:border-amber-sun"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-steppe-400 mb-1">Thời Gian</label>
                    <input
                      type="text"
                      value={exp.timeframe}
                      onChange={(e) => {
                        const updated = [...data.experience];
                        updated[eIdx].timeframe = e.target.value;
                        setData({ ...data, experience: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100 focus:outline-none focus:border-amber-sun"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-steppe-400 mb-1">
                    Trách Nhiệm & Thành Tựu Thực Tế (Mỗi dòng 1 ý)
                  </label>
                  <textarea
                    rows={4}
                    value={exp.accomplishments.join("\n")}
                    onChange={(e) => {
                      const updated = [...data.experience];
                      updated[eIdx].accomplishments = e.target.value.split("\n").filter(Boolean);
                      setData({ ...data, experience: updated });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100 focus:outline-none focus:border-amber-sun"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PROFILE & CONTACT */}
        {activeTab === "profile" && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="text-xl font-display font-bold text-steppe-50">
              Thông Tin Hồ Sơ & Liên Hệ
            </h2>
            <div className="p-6 rounded-3xl bg-steppe-900/60 border border-steppe-800 space-y-4">
              <div>
                <label className="block text-xs font-mono text-steppe-400 mb-1">Họ và Tên</label>
                <input
                  type="text"
                  value={data.profile.fullName}
                  onChange={(e) => setData({ ...data, profile: { ...data.profile, fullName: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-steppe-400 mb-1">Bio Ngắn Gọn (Hero)</label>
                <textarea
                  rows={3}
                  value={data.profile.conciseBio}
                  onChange={(e) => setData({ ...data, profile: { ...data.profile, conciseBio: e.target.value } })}
                  className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs text-steppe-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-steppe-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={data.profile.contact.email}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, contact: { ...data.profile.contact, email: e.target.value } } })}
                    className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-steppe-400 mb-1">Điện Thoại</label>
                  <input
                    type="text"
                    value={data.profile.contact.phone}
                    onChange={(e) => setData({ ...data, profile: { ...data.profile, contact: { ...data.profile.contact, phone: e.target.value } } })}
                    className="w-full px-3 py-2 rounded-xl bg-steppe-950 border border-steppe-750 text-xs font-mono text-steppe-100"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: JSON RAW EDITOR */}
        {activeTab === "json" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-steppe-50">
                Single Source of Truth JSON
              </h2>
              <span className="text-xs font-mono text-steppe-400">
                Tự động đồng bộ với README.md khi Lưu
              </span>
            </div>
            <textarea
              rows={24}
              value={JSON.stringify(data, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setData(parsed);
                } catch {
                  // Wait for valid JSON
                }
              }}
              className="w-full p-4 rounded-2xl bg-steppe-950 border border-steppe-800 text-xs font-mono text-steppe-200 focus:outline-none focus:border-amber-sun leading-relaxed"
            />
          </div>
        )}

      </div>
    </div>
  );
}
