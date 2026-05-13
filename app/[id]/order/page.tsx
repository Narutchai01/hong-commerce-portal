"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { mockCart } from "@/data/mockUser";
import type { CartItem } from "@/data/mockUser";
import CartItems from "@/components/cardItem";
import CartSummary from "@/components/cardSummary";

export default function CartPage() {

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const storedCart = localStorage.getItem("cart");

        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch {
                setCartItems(mockCart.items);
            }
        } else {
            setCartItems(mockCart.items);
        }

        const storedSelected =
            localStorage.getItem("selectedCartItems");

        if (storedSelected) {
            try {
                setSelected(JSON.parse(storedSelected));
            } catch {
                setSelected([]);
            }
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    }, [cartItems, mounted]);

    useEffect(() => {
        if (!mounted) return;

        localStorage.setItem(
            "selectedCartItems",
            JSON.stringify(selected)
        );
    }, [selected, mounted]);
    const groupedItems = useMemo(() => {
        return cartItems.reduce(
            (
                acc: Record<string, CartItem[]>,
                item
            ) => {
                if (!acc[item.brand]) {
                    acc[item.brand] = [];
                }

                acc[item.brand].push(item);

                return acc;
            },
            {}
        );
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
        const ids = groupedItems[brand].map(
            (i) => i.id
        );

        const allSelected = ids.every((id) =>
            selected.includes(id)
        );

        setSelected((prev) => {
            if (allSelected) {
                return prev.filter(
                    (id) => !ids.includes(id)
                );
            }

            return [
                ...new Set([...prev, ...ids]),
            ];
        });
    };
    const toggleSelectAll = () => {
        if (
            selected.length ===
            cartItems.length
        ) {
            setSelected([]);
        } else {
            setSelected(
                cartItems.map((i) => i.id)
            );
        }
    };

    const deleteSelected = () => {
        setCartItems((prev) =>
            prev.filter(
                (item) =>
                    !selected.includes(item.id)
            )
        );

        setSelected([]);

        localStorage.removeItem(
            "selectedCartItems"
        );
    };

    const increaseQty = (id: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1,
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
                            quantity:
                                item.quantity - 1,
                        }
                        : item
                )
                .filter(
                    (item) => item.quantity > 0
                )
        );
    };

    const selectedItems = cartItems.filter(
        (item) =>
            selected.includes(item.id)
    );

    const totalItems = selectedItems.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );

    const subtotal = selectedItems.reduce(
        (sum, item) =>
            sum +
            item.price * item.quantity,
        0
    );

    const freeShippingTarget = 100;

    const remainingForFreeShipping =
        Math.max(
            freeShippingTarget - subtotal,
            0
        );

    const shippingProgress = Math.min(
        (subtotal / freeShippingTarget) *
        100,
        100
    );

    const shippingFee =
        selectedItems.length ? 15 : 0;

    const total =
    subtotal + shippingFee;

    if (!mounted) {
        return null;
    }

    return (
        <main className="min-h-screen bg-[#fafafa]">
            <Navbar />

            <div className="mx-auto grid max-w-8xl grid-cols-1 gap-5 px-4 py-6 lg:grid-cols-[1fr_600px]">
                <CartItems
                    brands={brands}
                    groupedItems={
                        groupedItems
                    }
                    selected={selected}
                    cartItems={cartItems}
                    selectedItems={
                        selectedItems
                    }
                    subtotal={subtotal}
                    remainingForFreeShipping={
                        remainingForFreeShipping
                    }
                    shippingProgress={
                        shippingProgress
                    }
                    toggleItem={toggleItem}
                    toggleBrand={toggleBrand}
                    toggleSelectAll={
                        toggleSelectAll
                    }
                    deleteSelected={
                        deleteSelected
                    }
                    increaseQty={
                        increaseQty
                    }
                    decreaseQty={
                        decreaseQty
                    }
                />

                <CartSummary
                    totalItems={totalItems}
                    subtotal={subtotal}
                    shippingFee={shippingFee}
                    total={total}
                    selectedItems={selectedItems}
                />
            </div>

            <Footer />
        </main>
    );
}