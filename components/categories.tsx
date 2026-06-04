"use client";

import { useRouter } from "next/navigation";

import {
  Laptop,
  Shirt,
  House,
  HeartPulse,
  Gamepad2,
  Utensils,
  Dumbbell,
  PawPrint,
} from "lucide-react";

const categories = [
  { id: "tech", name: "Tech", icon: Laptop },
  { id: "fashion", name: "Fashion", icon: Shirt },
  { id: "home", name: "Home", icon: House },
  { id: "beauty", name: "Beauty", icon: HeartPulse },
  { id: "gaming", name: "Gaming", icon: Gamepad2 },
  { id: "food", name: "Food", icon: Utensils },
  { id: "sports", name: "Sports", icon: Dumbbell },
  { id: "pets", name: "Pets", icon: PawPrint },
];

export default function Categories() {
  const router = useRouter();

  return (
    <section className="px-4 pb-6 pt-5">
      <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
        {categories.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() =>
                router.push(
                  `/allProduct?category=${item.id}`
                )
              }
              className="group flex flex-col items-center gap-3 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 transition group-hover:bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>

              <span className="text-sm font-medium">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}