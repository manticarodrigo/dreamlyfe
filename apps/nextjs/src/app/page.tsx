import { Button } from "@dreamlyfe/ui/button";

import { HydrateClient } from "~/trpc/server";

export const runtime = "edge";

export default function HomePage() {
  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            DreamLyfe
          </h1>
          <Button>Get Started</Button>
          <Button variant="secondary">Get Started</Button>
          <Button variant="outline">Get Started</Button>
        </div>
      </main>
    </HydrateClient>
  );
}
