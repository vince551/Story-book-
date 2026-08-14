"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BookMarked, CheckCircle2, Clock3, Heart, LogIn } from "lucide-react";
import { books } from "@/lib/books";
import { getCurrentUser, getMyShelves } from "@/lib/storybook";

export default function LiveLibrary(){
 const [rows,setRows]=useState<any[]>([]); const [loading,setLoading]=useState(true); const [signed,setSigned]=useState(false);
 useEffect(()=>{(async()=>{const user=await getCurrentUser();setSigned(!!user);if(user){const shelves=await getMyShelves();setRows(shelves);}setLoading(false)})()},[]);
 const joined=rows.map(row=>({...row,book:books.find(b=>b.id===row.book_id)})).filter(x=>x.book);
 if(loading)return <div className="paper-card p-10 text-sm text-[var(--muted)]">Loading your shelf…</div>;
 if(!signed)return <div className="paper-card p-12 text-center"><LogIn className="mx-auto mb-5 text-accent" size={32}/><h2 className="text-xl font-black">Your synced shelf starts here.</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Sign in to keep your books and reading progress synced across your devices.</p><Link href="/account" className="share-button mt-6 inline-block rounded-full px-5 py-3 text-sm font-bold">Sign in</Link></div>;
 return <>{joined.length?<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{joined.map(({book,status,progress}:any)=><Link href={`/books/${book.id}`} key={book.id}><div className="paper-card lift p-5"><div className={`mb-5 grid h-36 place-items-center rounded-2xl bg-gradient-to-br ${book.tone?"from-[#2c204b] via-[#7456b8] to-[#cbb9ff]":"from-[#222] to-[#888]"} p-5 text-center text-white shadow-lg`}><b className="serif text-xl">{book.title}</b></div><p className="text-xs text-[var(--muted)]">{book.author}</p><h3 className="mt-1 font-black">{book.genre}</h3><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[var(--line)]"><div className="h-full rounded-full bg-accent" style={{width:`${progress}%`}}/></div><div className="mt-3 flex justify-between text-xs text-[var(--muted)]"><span>{status.replaceAll("_"," ")}</span><span>{progress}%</span></div><div className="mt-4 flex justify-between text-xs opacity-60"><span><CheckCircle2 size={13} className="mr-1 inline"/> Synced</span><Heart size={14}/></div></div></Link>)}</div>:<div className="paper-card p-14 text-center"><BookMarked className="mx-auto mb-5 text-accent" size={30}/><h2 className="text-xl font-black">Your synced shelf is waiting.</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">Save a book from a book page and it will appear here on every device.</p><Link href="/discover" className="share-button mt-6 inline-block rounded-full px-5 py-3 text-sm font-bold">Discover books</Link></div>}</>;
}
