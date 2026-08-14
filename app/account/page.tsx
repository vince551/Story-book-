import SiteHeader from "@/components/SiteHeader";
import AuthCard from "@/components/AuthCard";

export default function AccountPage() {
  return <><SiteHeader /><main className="mx-auto grid min-h-[calc(100vh-74px)] max-w-7xl place-items-center px-5 py-16 sm:px-8"><AuthCard /></main></>;
}
