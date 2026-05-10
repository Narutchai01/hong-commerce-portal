"use client";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import { useEffect, useState } from "react";
import { Input } from "@/shadcn/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/shadcn/ui/menubar";

import {
  Search,
  ShoppingCart,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import { User as UserType, mockCart } from "@/data/mockUser";

export default function Navbar() {
  const router = useRouter();

  const pathname = usePathname();

  const [isLogin, setIsLogin] =
    useState(false);

  const [user, setUser] =
    useState<UserType | null>(null);

  useEffect(() => {
    const checkLogin = () => {
      const token =
        localStorage.getItem("token");

      const storedUser =
        localStorage.getItem("user");

      setIsLogin(!!token);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    checkLogin();

    window.addEventListener(
      "storage",
      checkLogin
    );

    return () => {
      window.removeEventListener(
        "storage",
        checkLogin
      );
    };
  }, []);
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/signup";

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setIsLogin(false);

    setUser(null);

    router.push("/");
  };
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const updateCart = () => {
      const storedCart = localStorage.getItem("cart");

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        const total = parsedCart.reduce(
          (sum: number, item: any) =>
            sum + item.quantity,
          0
        );

        setCartCount(total);
      }
    };

    updateCart();

    window.addEventListener(
      "cartUpdated",
      updateCart
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCart
      );
    };
  }, []);

  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <h1
            onClick={() =>
              router.push("/")
            }
            className="cursor-pointer text-3xl font-bold text-primary"
          >
            Logo
          </h1>

          {!isAuthPage && (
            <div className="relative w-[450px]">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search"
                className="h-10 rounded-md border-0 bg-gray-100 pl-10"
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-5">
          {!isLogin ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  router.push("/login")
                }
                className="font-medium transition hover:text-[#EE4D2D]"
              >
                Login
              </button>

              <div className="h-5 w-[1px] bg-gray-300" />

              <button
                onClick={() =>
                  router.push("/signup")
                }
                className="font-medium transition hover:text-[#EE4D2D]"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <>
              <button
                className="relative transition hover:text-[#EE4D2D]"
                onClick={() => router.push("/order")}
              >
                <ShoppingCart className="h-6 w-6" />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="relative transition hover:text-[#EE4D2D]">
                <Bell className="h-6 w-6" />

                {user &&
                  user.stats
                    .notifications >
                  0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-xs text-white">
                      {
                        user.stats
                          .notifications
                      }
                    </span>
                  )}
              </button>

              <Menubar className="border-0 shadow-none">
                <MenubarMenu>
                  <MenubarTrigger className="flex cursor-pointer items-center gap-1 px-0 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    <User className="h-6 w-6" />

                    <ChevronDown className="h-4 w-4" />
                  </MenubarTrigger>

                  <MenubarContent align="end">
                    <MenubarItem>
                      {user?.fullName}
                    </MenubarItem>

                    <MenubarItem>
                      Orders (
                      {
                        user?.stats
                          .orders
                      }
                      )
                    </MenubarItem>

                    <MenubarItem>
                      Settings
                    </MenubarItem>

                    <MenubarItem
                      onClick={
                        handleLogout
                      }
                      className="text-red-500"
                    >
                      Logout
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}