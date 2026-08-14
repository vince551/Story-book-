"use client";

import { BookOpen, Menu, X, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitcher";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header sticky top-0 z-50 backdrop-blur-xl">
      <div className="mx-auto flex h-[74px] max-w-7xl items-center gap-5 px-5 sm:px-8">
        <Link href="/" className="brand flex items-center gap-2.5 text-xl font-black tracking-[-.05em]">
          <span className="brand-mark grid size-9 place-items-center rounded-xl"><BookOpen size={18} /></span>
          StoryBook
        </Link>
        <nav className="hidden gap-7 text-[13px] font-bold md:flex nav-links">
          <Link href="/discover">Discover</Link>
          <Link href="/community">Community</Link>
          <Link href="/library">My Library</Link>
          <Link href="/challenges">Challenges</Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeSwitcher />
          <Link href="/share" className="share-button hidden rounded-full px-4 py-2.5 text-xs font-bold text-white sm:block">
            <Plus size={14} className="mr-1 inline" /> Share a review
          </Link>
          <button onClick={() => setOpen(!open)} aria-label="Open navigation" className="menu-button rounded-full p-2.5 md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu border-t px-5 py-5 md:hidden">
          <div className="grid gap-4 text-sm font-bold">
            <Link onClick={() => setOpen(false)} href="/discover">Discover</Link>
            <Link onClick={() => setOpen(false)} href="/community">Community</Link>
            <Link onClick={() => setOpen(false)} href="/library">My Library</Link>
            <Link onClick={() => setOpen(false)} href="/challenges">Challenges</Link>
            <Link onClick={() => setOpen(false)} href="/share" className="share-button rounded-2xl py-3 text-center text-white">Share a review</Link>
          </div>
        </div>
      )}
    </header>
  );
}
