"use client";

import { mockUser } from "@/data/mockUser";
import { ShieldCheck, Lock, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  totalItems?: number;
  subtotal: number;
  shippingFee: number;
  total: number;
}

export default function PlaceOrder({
  totalItems = 0,
  subtotal,
  shippingFee,
  total,
}: Props) {
  const router = useRouter();

    const handlePlaceOrder = () => {
        const storedOrder =
            localStorage.getItem("currentOrder");

    if (!storedOrder) {
      alert("No order found");
      return;
    }

    const order = JSON.parse(storedOrder);

        const shippingMethod =
            (localStorage.getItem("shippingMethod") as
                | "standard"
                | "express") || "standard";

        const shippingFee =
            shippingMethod === "express"
                ? 30
                : 15;

        const subtotal = order.items.reduce(
            (sum: number, item: any) =>
                sum + item.price * item.quantity,
            0
        );

        const updatedOrder = {
            ...order,
            shippingMethod,
            shippingFee,
            subtotal,
            total: subtotal + shippingFee,
        };

        localStorage.setItem(
            "currentOrder",
            JSON.stringify(updatedOrder)
        );

        router.push(`/${mockUser.id}/payment`);
    };
    return (
        <div className="lg:sticky lg:top-24">
            <div className="bg-white border border-orange-200 rounded-xl p-5">

        <div className="space-y-3 border-t pt-5 text-sm">
          <div className="flex justify-between">
            <span>Subtotal ({totalItems})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-between border-t pt-5">
          <span>Total</span>
          <h3 className="text-2xl font-bold">${total.toFixed(2)}</h3>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full mt-5 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 rounded-lg"
        >
          Place Order
        </button>

        <div className="flex justify-center gap-5 mt-6 text-neutral-400">
          <ShieldCheck className="w-5 h-5" />
          <Lock className="w-5 h-5" />
          <QrCode className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
