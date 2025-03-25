import AccountList from "@/components/AccountList";
import FundTransfer from "@/components/FundTransfer";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <div className="flex flex-col w-full h-screen">
        <AccountList isDashboard={true} />
        <FundTransfer />
      </div>
    </SidebarProvider>
  );
}
