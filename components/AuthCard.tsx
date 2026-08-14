"use client";

import { FormEvent, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AuthCard() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const supabase = createSupabaseBrowserClient();
    if (!supabase) { setMessage("Connect Supabase to enable accounts."); return; }
    setBusy(true);
    const result = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    setBusy(false);
    setMessage(result.error?.message ?? (mode === "signup" ? "Check your email to confirm your account." : "Welcome back."));
  }

  return (
    <form onSubmit={submit} className="paper-card mx-auto w-full max-w-md p-7 sm:p-9">
      <p className="eyebrow">Your reading identity</p>
      <h1 className="mt-2 text-3xl font-black tracking-tight">{mode === "signin" ? "Welcome back." : "Join StoryBook."}</h1>
      <p className="mt-2 text-sm leading-6 text-black/50">Save your shelf, join conversations and keep your reading life in one place.</p>
      <div className="mt-7 grid gap-4">
        <label className="field">EMAIL<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
        <label className="field">PASSWORD<input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" /></label>
        <button disabled={busy} className="share-button rounded-2xl py-3.5 text-sm font-bold text-white disabled:opacity-60">{busy ? "Working…" : mode === "signin" ? "Sign in" : "Create account"}</button>
      </div>
      {message && <p className="mt-4 rounded-2xl bg-black/5 p-3 text-xs leading-5 text-black/60">{message}</p>}
      <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }} className="mt-5 text-xs font-bold text-[var(--accent)]">
        {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
      </button>
    </form>
  );
}
