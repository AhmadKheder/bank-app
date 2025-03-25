import AccountList from "@/components/AccountList";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <div className="w-full h-screen">
        <AccountList  />
      </div>
    </SidebarProvider>
  );
}
