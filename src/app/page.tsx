import AccountList from "@/components/AccountList";
import FundTransfer from "@/components/FundTransfer";

export default function Home() {
  return (
    <main className="p-4">
      <AccountList />
      <FundTransfer />
    </main>
  );
}
