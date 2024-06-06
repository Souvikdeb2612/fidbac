"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  href: string;
}

function SidebarItem({ icon: Icon, href }: SidebarItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleRoute = () => {
    router.push(href);
  };

  return (
    <Button
      variant="ghost"
      onClick={handleRoute}
      className={cn("px-6 py-5 group", pathname === href ? "bg-muted" : "")}
    >
      {Icon && (
        <Icon
          size={22}
          className={cn(
            "text-slate-500 group-hover:text-primary",
            pathname === href ? "text-primary" : ""
          )}
        />
      )}
    </Button>
  );
}

export default SidebarItem;
