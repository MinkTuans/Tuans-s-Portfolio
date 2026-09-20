import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wolf CMS • Quản Trị Nội Dung",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-steppe-950 text-steppe-100 selection:bg-tech-emerald selection:text-steppe-950">
      {children}
    </div>
  );
}
