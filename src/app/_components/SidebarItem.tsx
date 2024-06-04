"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  icon: LucideIcon;
  href: string;
}

function SidebarItem({ icon: Icon, href }: SidebarItemProps) {
  const router = useRouter();

  const handleRoute = () => {
    router.push(href);
  };
  return (
    <Button variant="ghost" onClick={handleRoute} className="px-6 py-5 group">
      {Icon && (
        <Icon
          size={22}
          className={cn("text-slate-500 group-hover:text-primary")}
        />
      )}
    </Button>
  );
}

export default SidebarItem;
