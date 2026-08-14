import SiteHeader from "@/components/SiteHeader";
import AccountView from "@/components/AccountView";

export default function AccountPage() {
  return <><SiteHeader /><main className="mx-auto min-h-[calc(100vh-74px)] max-w-7xl px-5 py-16 sm:px-8 lg:py-20"><div className="mb-10 text-center"><p className="eyebrow">StoryBook account</p><h1 className="section-title mt-2">Make your reading life yours.</h1></div><div className="flex justify-center"><AccountView /></div></main></>;
}
