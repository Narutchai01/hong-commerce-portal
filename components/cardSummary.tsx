"use client";

import { useRouter } from "next/navigation";
import type { CartItem } from "@/data/mockUser";
import { mockUser } from "@/data/mockUser";

interface Props {
    totalItems: number;
    subtotal: number;
    shippingFee: number;
    total: number;
    selectedItems: CartItem[];
}

export default function CartSummary({
    totalItems,
    subtotal,
    shippingFee,
    total,
    selectedItems,
}: Props) {
    const router = useRouter();

    const handleCheckout = () => {
  const order = {
    orderId: `BF-${Date.now()}`,
    items: selectedItems,
    subtotal,
    shippingFee,
    total: subtotal + shippingFee,
    status: "pending",
  };

  localStorage.setItem("currentOrder", JSON.stringify(order));

  router.push(`/${mockUser.id}/checkout`);
};

    return (
        <div className="h-fit rounded-md border bg-white p-5">
            <h2 className="mb-5 text-2xl font-bold">
                Order Summary
            </h2>

            <div className="space-y-3 border-t pt-5 text-sm">
                <div className="flex justify-between">
                    <span>
                        Subtotal ({totalItems} items)
                    </span>

                    <span>
                        ${subtotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>

                    <span>
                        ${shippingFee.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="mt-6 flex justify-between border-t pt-5">
                <h3 className="text-2xl font-bold">
                    ${total.toFixed(2)}
                </h3>

                <span>Estimated Total</span>
            </div>

            <button
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
                className="mt-6 h-[55px] w-full rounded-md bg-primary text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                CHECK OUT
            </button>
        </div>
    );
}