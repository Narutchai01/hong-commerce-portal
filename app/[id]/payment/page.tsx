"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import PaymentCard from "@/components/paymentCard";

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <PaymentCard />
      </main>

      <Footer />
    </div>
  );
}