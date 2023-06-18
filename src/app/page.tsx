import { AlchemyProvider } from "../Context/AlchemyProvider";
import { Block } from "../Components/Block";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AlchemyProvider>
        <Block />
      </AlchemyProvider>
    </main>
  );
}
