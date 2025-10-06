// "use client";

import AdminLayout from "@/components/layouts/admin";

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout page="Quick Class Results">{children}</AdminLayout>;
}
