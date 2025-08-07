'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import * as Client from 'hello_world';

export default function Home() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchGreeting = async () => {
      const contract = new Client.Client({
        ...Client.networks.testnet,
        rpcUrl: 'https://soroban-testnet.stellar.org:443',
      });

      try {
        const { result } = await contract.hello({ to: "Devs!" });
        setGreeting(result.join(" "));
      } catch (err) {
        console.error("Contract call failed:", err);
      }
    };

    fetchGreeting();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>{greeting || "Loading..."}</h1>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {/* the rest of your code */}
      </main>
      {/* footer */}
    </div>
  );
}
