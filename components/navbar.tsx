"use client";

import { Input } from "@/shadcn/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/shadcn/ui/menubar";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold text-primary">
            <Link href="/home">
              Logo
            </Link>
          </h1>

          <div className="relative w-[450px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search"
              className="h-10 rounded-md border-0 bg-gray-100 pl-10 focus-visible:ring-1 focus-visible:ring-[#EE4D2D]"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button className="transition hover:text-[#EE4D2D]">
            <ShoppingCart className="h-6 w-6" />
          </button>

          <button className="transition hover:text-[#EE4D2D]">
            <Bell className="h-6 w-6" />
          </button>

          <Menubar className="border-0 shadow-none">
            <MenubarMenu>
              <MenubarTrigger className="flex cursor-pointer items-center gap-1 px-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                <User className="h-6 w-6" />
                <ChevronDown className="h-4 w-4" />
              </MenubarTrigger>

              <MenubarContent align="end">
                <MenubarItem>Profile</MenubarItem>
                <MenubarItem>Orders</MenubarItem>
                <MenubarItem>Settings</MenubarItem>
                <MenubarItem className="text-red-500">
                  Logout
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </nav>
  );
}