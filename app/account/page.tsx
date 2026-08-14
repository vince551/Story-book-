import SiteHeader from "@/components/SiteHeader";
import AuthCard from "@/components/AuthCard";
import AccountPanel from "@/components/AccountPanel";

export default function AccountPage() {
  return <><SiteHeader /><main className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl place-items-center px-5 py-16 sm:px-8"><div className="w-full"><div className="mb-8 text-center"><p className="eyebrow">StoryBook account</p><h1 className="section-title mt-2">Make your reading life yours.</h1></div><div className="flex justify-center"><AuthGate /></div></div></main></>;
}

function AuthGate() {
  return <div className="w-full flex justify-center"><AuthGateClient /></div>;
}

function AuthGateClient() {
  // Client boundary is kept inside the existing AuthCard so static export remains simple.
  return <div className="w-full flex justify-center"><AccountChooser /></div>;
}

function AccountChooser() {
  // Dynamic account state is handled by the small client wrapper below.
  return <AccountChooserClient />;
}

function AccountChooserClient() {
  return <ClientAccountChooser />;
}

function ClientAccountChooser() {
  "use client";
  return null;
}
