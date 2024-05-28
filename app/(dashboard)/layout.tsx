import { Sidebar } from "@/app/(dashboard)/_components/sidebar";
import { OrgSidebar } from "@/app/(dashboard)/_components/org-sidebar";
import { Navbar } from "@/app/(dashboard)/_components/navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className={"h-full"}>
      <Sidebar />
      <div className="h-full pl-[60px]">
        <div className={"flex h-full gap-x-3"}>
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
