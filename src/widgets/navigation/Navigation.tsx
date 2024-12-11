"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./config";
import { cn } from "@/shared/lib/utils";
interface Props {
  children?: React.ReactNode;
}
export function Navigation({ children }: Props) {
  const pathname = usePathname() || "";

  const isActive = React.useCallback(
    (itemPath: string, aliases: string[] = []) => {
      if (pathname === itemPath) return true;

      const pathsToCheck = [itemPath, ...aliases];
      return pathsToCheck.some((path) => {
        const regex = new RegExp(
          `^${path.replace(/\[.*?\]/g, "[^/]+")}(/.*)?$`
        );
        return regex.test(pathname);
      });
    },
    [pathname]
  );

  return (
    <div className="border-t px-4 flex flex-col gap-1 pt-2">
      {children}
      <nav className="flex justify-between items-center w-full bg-background ">
        {navItems.map((item) => {
          const active = isActive(item.path, item.aliases);
          return (
            <Link
              key={item.label}
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 hover:text-primary",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
