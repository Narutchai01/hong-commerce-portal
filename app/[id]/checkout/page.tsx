"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import type { CartItem } from "@/data/mockUser";
import CheckoutForm from "@/components/checkout";
import PlaceOrder from "@/components/placeOrder";

export default function CheckoutPage() {
    const [items, setItems] = useState<CartItem[]>([]);
    const [shippingMethod, setShippingMethod] =
        useState<"standard" | "express">("standard");

    useEffect(() => {
    const stored = localStorage.getItem("currentOrder");

    if (!stored) {
        setItems([]);
        return;
    }

    try {
        const order = JSON.parse(stored);

        if (!order) {
            setItems([]);
            return;
        }
        const items = Array.isArray(order.items)
            ? order.items
            : [];

        if (items.length === 0) {
            setItems([]);
            return;
        }

        setItems(
            items.map((i: any) => ({
                id: Number(i.id),
                title: i.title ?? "",
                price: Number(i.price ?? 0),
                quantity: Number(i.quantity ?? 1),
                image: i.image ?? "",
                brand: i.brand ?? "",
            }))
        );
    } catch (err) {
        setItems([]);
    }
}, []);

    const totalItems = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
    }, [items]);

    const subtotal = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }, [items]);

    const shippingFee =
        shippingMethod === "standard" ? 15 : 30;

    const total = subtotal + shippingFee;
    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />

                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">
                        ไม่มีสินค้าใน checkout
                    </p>
                </div>

                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-8xl mx-auto w-full px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    <CheckoutForm
                        items={items}
                        shippingMethod={shippingMethod}
                        setShippingMethod={setShippingMethod}
                    />

                    <PlaceOrder
                        totalItems={totalItems}
                        subtotal={subtotal}
                        shippingFee={shippingFee}
                        total={total}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}