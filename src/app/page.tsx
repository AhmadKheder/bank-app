import AccountList from "@/components/AccountList";
import FundTransfer from "@/components/FundTransfer";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col w-full h-screen">
        <AccountList isDashboard={true} />
        <FundTransfer />
      </div>
    </main>
  );
}
