"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { mockCart, CartItem } from "@/data/mockUser";
import CartItems from "./component/cardItem";
import CartSummary from "./component/cardSummary";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        if (typeof window !== "undefined") {
            const storedCart = localStorage.getItem("cart");

            if (storedCart) {
                return JSON.parse(storedCart) as CartItem[];
            }
        }

        return mockCart.items;
    });
    const [selected, setSelected] = useState<number[]>([]);
    const groupedItems = useMemo(() => {
        return cartItems.reduce((acc: Record<string, typeof cartItems>, item) => {
            if (!acc[item.brand]) acc[item.brand] = [];

            acc[item.brand].push(item);

            return acc;
        }, {});
    }, [cartItems]);

    const brands = Object.keys(groupedItems);

    const toggleItem = (id: number) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const toggleBrand = (brand: string) => {
        const ids = groupedItems[brand].map((i) => i.id);

        const allSelected = ids.every((id) =>
            selected.includes(id)
        );

        setSelected((prev) => {
            if (allSelected) {
                return prev.filter((id) => !ids.includes(id));
            }

            return [...new Set([...prev, ...ids])];
        });
    };

    const toggleSelectAll = () => {
        if (selected.length === cartItems.length) {
            setSelected([]);
        } else {
            setSelected(cartItems.map((i) => i.id));
        }
    };

    const deleteSelected = () => {
        setCartItems((prev) =>
            prev.filter((item) => !selected.includes(item.id))
        );

        setSelected([]);
    };


    const increaseQty = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const decreaseQty = (id: number) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };


    const selectedItems = cartItems.filter((item) =>
        selected.includes(item.id)
    );

    const totalItems = selectedItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const subtotal = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const freeShippingTarget = 100;

    const remainingForFreeShipping = Math.max(
        freeShippingTarget - subtotal,
        0
    );

    const shippingProgress = Math.min(
        (subtotal / freeShippingTarget) * 100,
        100
    );

    const shippingFee = selectedItems.length ? 15 : 0;

    const voucherDiscount = selectedItems.length ? 23.4 : 0;

    const shippingDiscount = selectedItems.length ? 5 : 0;

    const total =
        subtotal +
        shippingFee -
        voucherDiscount -
        shippingDiscount;


    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

        window.dispatchEvent(new Event("cartUpdated"));
    }, [cartItems]);

    return (
        <main className="min-h-screen bg-[#fafafa]">
            <Navbar />

            <div className="mx-auto grid max-w-8xl grid-cols-1 gap-5 px-4 py-6 lg:grid-cols-[1fr_600px]">

                <CartItems
                    brands={brands}
                    groupedItems={groupedItems}
                    selected={selected}
                    cartItems={cartItems}
                    selectedItems={selectedItems}
                    subtotal={subtotal}
                    remainingForFreeShipping={remainingForFreeShipping}
                    shippingProgress={shippingProgress}
                    toggleItem={toggleItem}
                    toggleBrand={toggleBrand}
                    toggleSelectAll={toggleSelectAll}
                    deleteSelected={deleteSelected}
                    increaseQty={increaseQty}
                    decreaseQty={decreaseQty}
                />

                <CartSummary
                    totalItems={totalItems}
                    subtotal={subtotal}
                    shippingFee={shippingFee}
                    voucherDiscount={voucherDiscount}
                    shippingDiscount={shippingDiscount}
                    total={total}
                />
            </div>

            <Footer />
        </main>
    );
}