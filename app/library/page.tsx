import SiteHeader from "@/components/SiteHeader";
import LiveLibrary from "@/components/LiveLibrary";

export default function Library(){return <><SiteHeader/><main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="eyebrow">Your reading life</p><h1 className="section-title mt-2">My library.</h1><p className="mt-5 text-sm text-[var(--muted)]">A synced shelf for your next chapter, current reads and finished favorites.</p></div><div className="flex gap-2"><span className="rounded-full bg-[var(--card)] px-4 py-2 text-xs font-bold"><BookIcon/> synced shelf</span><span className="rounded-full bg-[var(--card)] px-4 py-2 text-xs font-bold"><ClockIcon/> reading streak</span></div></div><div className="mt-10"><LiveLibrary/></div></main></>}
function BookIcon(){return <span className="mr-1 inline-block">▣</span>} function ClockIcon(){return <span className="mr-1 inline-block">◷</span>}
