import { Sidebar } from "@/components/ui/sidebar/Sidebar";
import { TopMenu } from "@/components/ui/top-menu/topMenu";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-200">
      <TopMenu />
      <Sidebar />

      <div className="px-1 sm:px-10">
        {children}
      </div>
    </main>
  );
}