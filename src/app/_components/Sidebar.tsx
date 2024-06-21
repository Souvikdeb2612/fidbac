"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { routes } from "@/lib/sidebar-routes";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut } from "@/auth/helpers";
import { getSession, useSession } from "next-auth/react";
import logo from "../../../public/logo.png";

function Sidebar() {
  const router = useRouter();
  const [isSession, setIsSession] = useState<boolean | null>(null);
  const handleRootRoute = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem("currency");
    const sess = await getSession();
    setIsSession(!!sess);
    router.push("/");
  };

  const handleSignIn = async () => {
    await signIn();
    await getSession();
    router.push("/home");
  };

  const { data: session } = useSession();
  useEffect(() => {
    setIsSession(!!session);
  }, [session]);

  return (
    <aside className="fixed h-[calc(100vh-96px)] flex items-center flex-col overflow-y-auto bg-white">
      <Image
        unoptimized
        src={logo}
        alt="logo"
        width={80}
        height={80}
        onClick={handleRootRoute}
        className="cursor-pointer px-2"
      />
      <div className="h-full flex flex-col justify-between items-center">
        <div className="flex flex-col gap-y-4">
          {isSession &&
            routes?.map((route) => (
              <SidebarItem
                key={route.href}
                icon={route.icon}
                href={route.href}
              />
            ))}
        </div>
        {isSession ? (
          <div
            onClick={handleSignOut}
            className="text-muted-foreground hover:text-primary cursor-pointer"
          >
            <LogOut />
          </div>
        ) : (
          <div
            onClick={handleSignIn}
            className="text-muted-foreground hover:text-primary cursor-pointer"
          >
            <LogIn />
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
