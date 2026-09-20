import React from "react";
import { isAdminAuthenticated } from "@/lib/auth";
import { getPortfolioData } from "@/lib/data-service";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authenticated = isAdminAuthenticated();

  if (!authenticated) {
    return <AdminLoginForm />;
  }

  const data = await getPortfolioData();
  return <AdminDashboard initialData={data} />;
}
