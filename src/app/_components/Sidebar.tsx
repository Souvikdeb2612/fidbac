"use client";

import Image from "next/image";
import React from "react";
import SidebarItem from "./SidebarItem";
import { routes } from "@/lib/sidebar-routes";

function Sidebar() {
  return (
    <aside className="fixed h-screen flex items-center flex-col overflow-y-auto bg-white">
      <Image src="/logo.png" alt="Logo" width={80} height={80} />
      <div>
        <div className="flex flex-col gap-y-4">
          {routes?.map((route) => (
            <SidebarItem key={route.href} icon={route.icon} href={route.href} />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
