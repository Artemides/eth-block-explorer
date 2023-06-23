import { AlchemyProvider } from "../Context/AlchemyProvider";
import { Dashboard } from "../Components/Dashboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AlchemyProvider>
        <Dashboard />
      </AlchemyProvider>
    </main>
  );
}
