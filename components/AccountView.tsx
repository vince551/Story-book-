"use client";

import AuthCard from "@/components/AuthCard";
import AccountPanel from "@/components/AccountPanel";
import { useAuth } from "@/components/AuthProvider";

export default function AccountView() {
  const { user, loading } = useAuth();
  if (loading) return <div className="paper-card w-full max-w-2xl p-9 text-center text-sm text-[var(--muted)]">Loading your reading identity…</div>;
  return user ? <AccountPanel /> : <AuthCard />;
}
