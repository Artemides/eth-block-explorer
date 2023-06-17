import { AlchemyProvider } from "./Components/AlchemyProvider";
import { Box } from "./Components/Box";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AlchemyProvider>
        <Box />
      </AlchemyProvider>
    </main>
  );
}
