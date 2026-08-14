import Link from "next/link";
import { ArrowUpRight, BookOpen, Flame, Heart, Quote, Sparkles, Star, Users } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import BookCard from "@/components/BookCard";
import { books } from "@/lib/books";

const moods = ["A little wonder", "Quiet & reflective", "Big ideas", "African voices", "Self growth"];
const activity = [
  { name: "Maya", action: "finished", book: "Things Fall Apart", time: "4m ago", avatar: "M" },
  { name: "Jon", action: "reviewed", book: "The Alchemist", time: "18m ago", avatar: "J" },
  { name: "Aisha", action: "saved", book: "Atomic Habits", time: "32m ago", avatar: "A" },
];

export default function Home() {
  return <><SiteHeader/><main>
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 lg:pb-28 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_.82fr]">
        <div className="fade-up">
          <div className="mb-6 flex flex-wrap items-center gap-2"><span className="eyebrow">StoryBook / 2026</span><span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[10px] font-black text-[var(--accent)]">New reading ritual</span></div>
          <h1 className="hero-title">Read deeply.<br/><span>Live more.</span></h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-black/55">A beautiful place for books, ideas and the people who make reading feel alive. Discover your next story, build your shelf and share what stayed with you.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/discover" className="share-button rounded-full px-6 py-3.5 text-sm font-bold text-white">Discover books <ArrowUpRight size={16} className="ml-1 inline"/></Link><Link href="/community" className="rounded-full border border-black/10 bg-white/65 px-6 py-3.5 text-sm font-bold">Meet readers</Link></div>
          <div className="mt-10 flex flex-wrap gap-7 text-xs text-black/40"><span><b className="text-black">12.4k</b><br/>curious readers</span><span><b className="text-black">38k</b><br/>shared thoughts</span><span><b className="text-black">94%</b><br/>would recommend</span></div>
        </div>
        <div className="relative mx-auto h-[480px] w-full max-w-[510px] fade-up">
          <div className="absolute inset-10 rounded-full bg-[#d9cbff] blur-3xl"/>
          <div className="absolute left-[8%] top-[8%] h-[365px] w-[250px] -rotate-[8deg] rounded-[5px_22px_22px_5px] bg-gradient-to-br from-[#18151d] via-[#6242a5] to-[#d8c4ff] p-8 text-white shadow-2xl transition-transform duration-500 hover:-translate-y-3 hover:rotate-[-5deg]"><div className="flex h-full flex-col justify-between"><span className="text-[9px] font-black tracking-[.25em] opacity-60">STORYBOOK / EDITION 01</span><div><p className="mb-3 text-[10px] uppercase tracking-[.2em] opacity-50">The reading life</p><h2 className="text-5xl font-black leading-[.84] tracking-[-.07em]">Make<br/>time for<br/><i className="font-serif font-normal">stories.</i></h2></div><span className="text-[10px] opacity-45">Read · Reflect · Repeat</span></div></div>
          <div className="absolute bottom-[1%] right-[2%] w-[230px] rotate-[8deg] rounded-[4px_18px_18px_4px] bg-white p-3 shadow-2xl transition-transform duration-500 hover:-translate-y-3 hover:rotate-[4deg]"><div className="flex h-[255px] flex-col justify-between rounded-[15px] bg-gradient-to-br from-[#193f38] via-[#347461] to-[#d4d8ae] p-6 text-white"><span className="text-[9px] tracking-[.2em]">COMMUNITY FAVORITE</span><strong className="text-4xl leading-[.82]">Things<br/>Fall<br/>Apart</strong><span className="text-[10px] opacity-60">Chinua Achebe</span></div></div>
          <div className="absolute right-0 top-5 rounded-2xl border border-black/10 bg-white/90 p-3 shadow-xl backdrop-blur"><div className="flex items-center gap-2"><span className="grid size-9 place-items-center rounded-full bg-[#e8defc] text-[#6242a5]"><Star size={14} fill="currentColor"/></span><span className="text-xs"><b>4.9</b><br/><span className="text-black/40">community rating</span></span></div></div>
        </div>
      </div>
    </section>

    <section className="border-y border-black/5 bg-[#eee9df]"><div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16"><div className="flex items-center justify-between"><div><p className="eyebrow">Find your mood</p><h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">What do you want to feel?</h2></div><Sparkles className="hidden text-[var(--accent)] sm:block"/></div><div className="mt-7 flex gap-3 overflow-x-auto pb-2 hide-scroll">{moods.map((m,i)=><Link key={m} href={`/discover?mood=${encodeURIComponent(m)}`} className={`shrink-0 rounded-full border px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 ${i===0?"border-transparent bg-[var(--dark)] text-white":"border-black/10 bg-white/70"}`}>{m}</Link>)}</div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24"><div className="flex items-end justify-between gap-6"><div><p className="eyebrow">Editor's shelf</p><h2 className="section-title">Start somewhere good.</h2></div><Link href="/discover" className="hidden text-sm font-bold md:block">Explore all <ArrowUpRight size={15} className="ml-1 inline"/></Link></div><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{books.slice(0,6).map(b=><Link href={`/books/${b.id}`} key={b.id}><BookCard book={b}/></Link>)}</div></section>

    <section className="bg-[var(--dark)] text-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20"><div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow light">The pulse of StoryBook</p><h2 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-5xl">Readers are here<br/><span className="font-serif font-normal italic text-[#cbb8ff]">right now.</span></h2><Link href="/community" className="mt-7 inline-block rounded-full bg-white px-5 py-3 text-sm font-bold text-black">Open community</Link></div><div className="grid gap-3">{activity.map(a=><div key={a.name+a.time} className="dark-card flex-row items-center gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#30293b] text-sm font-black text-[#d9caff]">{a.avatar}</span><div className="min-w-0 flex-1"><p className="text-sm"><b>{a.name}</b> {a.action} <b>{a.book}</b></p><span>{a.time}</span></div><Heart size={17}/></div>)}</div></div></div></section>

    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">A better reading habit</p><h2 className="section-title">Make reading feel like yours.</h2><p className="mt-6 max-w-md leading-7 text-black/50">Track the books that matter, celebrate small streaks and turn your private reading life into a shared source of inspiration.</p></div><div className="grid gap-4 sm:grid-cols-2"><div className="paper-card p-7"><Flame className="mb-12 text-[#d26d55]"/><p className="text-4xl font-black">7 days</p><h3 className="mt-2 font-bold">Current streak</h3><p className="mt-2 text-sm leading-6 text-black/45">A tiny daily ritual becomes a life you remember.</p></div><div className="paper-card p-7"><BookOpen className="mb-12 text-[var(--accent)]"/><p className="text-4xl font-black">12</p><h3 className="mt-2 font-bold">Books this year</h3><p className="mt-2 text-sm leading-6 text-black/45">Your shelf is a portrait of your curiosity.</p></div><div className="paper-card p-7 sm:col-span-2"><Quote className="mb-10 text-[var(--accent)]"/><p className="font-serif text-2xl leading-tight sm:text-3xl">“A good book is not finished when you close it. It keeps unfolding in conversation.”</p><p className="mt-5 text-xs font-bold uppercase tracking-widest text-black/35">The StoryBook principle</p></div></div></div></section>

    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8"><div className="overflow-hidden rounded-[32px] bg-[#e9defb] p-8 sm:p-12 lg:p-16"><div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]"><div><p className="eyebrow text-[#6242a5]">Your next chapter</p><h2 className="mt-3 max-w-2xl text-4xl font-black tracking-[-.05em] sm:text-6xl">Find a story worth staying up for.</h2></div><Link href="/discover" className="rounded-full bg-[var(--dark)] px-6 py-3.5 text-center text-sm font-bold text-white">Browse the library <ArrowUpRight size={15} className="ml-1 inline"/></Link></div></div></section>
  </main><footer className="border-t border-black/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-xs text-black/40 sm:flex-row sm:items-center sm:justify-between sm:px-8"><span>© 2026 StoryBook</span><span>Read · Reflect · Share</span></div></footer></>;
}
