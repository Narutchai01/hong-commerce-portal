"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeBanner() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden rounded-md px-4 pt-4">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src="/images/banner.png"
          alt="banner"
          width={1600}
          height={600}
          className="h-[500px] w-full object-cover brightness-50"
        />

        <div className="absolute inset-0 flex items-center">
          <div className="ml-10 max-w-md text-white">
            <span className="rounded bg-primary px-3 py-1 text-sm font-semibold">
              MEGA SALE
            </span>

            <h1 className="mt-4 text-5xl font-bold leading-tight">
              Up to 70% Off
              <br />
              New Collections
            </h1>

            <button
              onClick={() => router.push("/allProduct")}
              className="mt-6 rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
