"use client";

import { useEffect, useState } from "react";
import { LogOut, Save, UserRound } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export default function AccountPanel() {
  const { user, loading, signOut } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return;
    supabase.from("profiles").select("display_name,username,bio").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) { setDisplayName(data.display_name ?? ""); setUsername(data.username ?? ""); setBio(data.bio ?? ""); }
    });
  }, [user]);

  async function saveProfile() {
    if (!user) return;
    const supabase = createSupabaseBrowserClient();
    if (!supabase) return setMessage("Add your Supabase environment variables first.");
    setBusy(true); setMessage("");
    const { error } = await supabase.from("profiles").upsert({ id: user.id, display_name: displayName, username, bio }, { onConflict: "id" });
    setBusy(false); setMessage(error ? error.message : "Profile saved ✓");
  }

  if (loading) return <div className="paper-card w-full max-w-2xl p-9 animate-pulse">Loading your reading identity…</div>;
  if (!user) return <div className="paper-card w-full max-w-2xl p-9 text-center"><UserRound className="mx-auto mb-4" size={34}/><h1 className="text-2xl font-black">Your reader profile</h1><p className="mt-2 text-sm text-[var(--muted)]">Sign in to build your profile, sync your shelf and join the community.</p></div>;

  return <section className="w-full max-w-2xl">
    <div className="paper-card p-7 sm:p-9">
      <div className="flex items-center gap-4"><div className="grid size-16 place-items-center rounded-full bg-accent-soft text-accent text-xl font-black">{(displayName || user.email || "R").slice(0,1).toUpperCase()}</div><div><p className="eyebrow">Your reading identity</p><h1 className="mt-1 text-3xl font-black">{displayName || "Reader"}</h1><p className="text-sm text-[var(--muted)]">{user.email}</p></div></div>
      <div className="mt-8 grid gap-4"><label className="field">DISPLAY NAME<input value={displayName} onChange={e=>setDisplayName(e.target.value)} placeholder="Your name"/></label><label className="field">USERNAME<input value={username} onChange={e=>setUsername(e.target.value.replace(/\s/g, "").toLowerCase())} placeholder="yourhandle"/></label><label className="field">BIO<textarea value={bio} onChange={e=>setBio(e.target.value)} maxLength={240} placeholder="What do you love reading?"/></label></div>
      <div className="mt-6 flex flex-wrap items-center gap-3"><button onClick={saveProfile} disabled={busy} className="share-button rounded-full px-5 py-3 text-sm font-bold"><Save size={15} className="mr-2 inline"/>{busy?"Saving…":"Save profile"}</button><button onClick={signOut} className="menu-button rounded-full px-5 py-3 text-sm font-bold"><LogOut size={15} className="mr-2 inline"/>Sign out</button></div>
      {message && <p className="mt-4 rounded-2xl bg-accent-soft p-3 text-xs text-accent">{message}</p>}
    </div>
  </section>;
}
