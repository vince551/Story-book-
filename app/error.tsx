"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {}, []);
  return <main className="grid min-h-screen place-items-center bg-[#070812] p-6 text-center"><div className="max-w-md"><div className="mx-auto grid size-14 place-items-center rounded-2xl border border-white/10 bg-white/5 text-violet-300"><RefreshCcw/></div><h1 className="mt-6 text-3xl font-black">That chapter hit a snag.</h1><p className="mt-3 text-sm leading-6 text-slate-500">Something went wrong while loading StoryBook. Your reading list is safe; try the page again.</p><button onClick={reset} className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-slate-950">Try again</button></div></main>;
}