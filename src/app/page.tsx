"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { spartan } from "./fonts";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/home");
  };
  return (
    <main className="grid sm:grid-cols-2 items-center h-[calc(100vh-96px)] justify-items-center">
      <div className="max-sm:hidden blob1">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M79.5,59.5Q73,69,64.5,77Q56,85,42,87Q28,89,20,76.5Q12,64,19,52.5Q26,41,28,28.5Q30,16,43.5,13.5Q57,11,65,21Q73,31,79.5,40.5Q86,50,79.5,59.5Z"
            stroke="none"
            strokeWidth="0"
            fill="#DFE7ED"
          ></path>
        </svg>
      </div>
      <div className="text-end z-10">
        <h1 className="font-semibold text-3xl text-muted-foreground">
          Manage your expenses easily with{" "}
          <span
            className={cn(
              "my-2 block text-primary tracking-tighter",
              spartan.className
            )}
          >
            fidbac tracker
          </span>
        </h1>
        <Button onClick={handleStart} className="mt-4 max-sm:w-full">
          Get Started
        </Button>
      </div>
      <Image
        src="https://illustrations.popsy.co/gray/finance-growth.svg"
        alt="home"
        width={500}
        height={500}
      />
    </main>
  );
}
