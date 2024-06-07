"use client";

import Image from "next/image";
import React from "react";
import SidebarItem from "./SidebarItem";
import { routes } from "@/lib/sidebar-routes";
import { useRouter } from "next/navigation";
import { LogIn, LogOut } from "lucide-react";
import { signIn, signOut } from "@/auth/helpers";
import { getSession, useSession } from "next-auth/react";

function Sidebar() {
  const router = useRouter();
  const handleRootRoute = () => {
    router.push("/");
  };

  const handleSignOut = async () => {
    await signOut();
    await getSession();
    router.push("/");
  };

  const handleSignIn = async () => {
    await signIn();
    await getSession();
    router.push("/home");
  };

  const { data: session } = useSession();

  return (
    <aside className="fixed h-[calc(100vh-96px)] flex items-center flex-col overflow-y-auto bg-white">
      <Image
        src="/logo.png"
        alt="Logo"
        width={80}
        height={80}
        onClick={handleRootRoute}
        className="cursor-pointer px-2"
      />
      <div className="h-full flex flex-col justify-between items-center">
        <div className="flex flex-col gap-y-4">
          {session &&
            routes?.map((route) => (
              <SidebarItem
                key={route.href}
                icon={route.icon}
                href={route.href}
              />
            ))}
        </div>
        {session ? (
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
