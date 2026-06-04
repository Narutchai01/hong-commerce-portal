"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import {
    CheckCircle2,
    ReceiptText,
    House,
    ChevronRight,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { mockUser, type CartItem } from "@/data/mockUser";

export default function PaymentSuccessPage() {
    const router = useRouter();

    const [items, setItems] = useState<CartItem[]>([]);
    const [orderId, setOrderId] =
        useState("");

    const [totalAmount, setTotalAmount] =
        useState(0);

    const [paidDate, setPaidDate] =
        useState("");

    useEffect(() => {
        const storedItems =
            localStorage.getItem(
                "checkoutItems"
            );

        const storedOrderId =
            localStorage.getItem("orderId");

        const storedTotal =
            localStorage.getItem(
                "paymentTotal"
            );

        if (storedItems) {
            const checkoutItems: CartItem[] =
                JSON.parse(storedItems);

            setItems(checkoutItems);

            const storedCart =
                localStorage.getItem("cart");

            if (storedCart) {
                const cartItems: CartItem[] =
                    JSON.parse(storedCart);

                const updatedCart =
                    cartItems.filter(
                        (cartItem) =>
                            !checkoutItems.some(
                                (checkoutItem) =>
                                    checkoutItem.id ===
                                    cartItem.id
                            )
                    );

                localStorage.setItem(
                    "cart",
                    JSON.stringify(updatedCart)
                );

                window.dispatchEvent(
                    new Event("cartUpdated")
                );
            }
        }
        if (storedOrderId) {
            setOrderId(storedOrderId);
        }

        if (storedTotal) {
            setTotalAmount(
                JSON.parse(storedTotal)
            );
        }

        const storedPaidDate =
            localStorage.getItem("paidDate");

        if (storedPaidDate) {
            setPaidDate(storedPaidDate);
        }

        if (
            storedItems &&
            storedOrderId &&
            storedTotal
        ) {
            const checkoutItems: CartItem[] =
                JSON.parse(storedItems);

            const newOrder = {
                orderId: storedOrderId,

                totalAmount: JSON.parse(
                    storedTotal
                ),

                paidDate: storedPaidDate,

                status: "toShip",

                items: checkoutItems,
            };

            const existingOrders =
                localStorage.getItem("orders");

            const orders = existingOrders
                ? JSON.parse(existingOrders)
                : [];

            const alreadyExists =
                orders.some(
                    (order: any) =>
                        order.orderId ===
                        storedOrderId
                );

            if (!alreadyExists) {
                orders.unshift(newOrder);

                localStorage.setItem(
                    "orders",
                    JSON.stringify(orders)
                );
            }
        }

        localStorage.removeItem(
            "paymentExpireAt"
        );

        localStorage.removeItem(
            "checkoutItems"
        );
    }, []);

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-sm">
                    <div className="bg-[#fdfdfd] px-6 py-10 text-center">
                        <div className="mx-auto relative flex h-24 w-24 items-center justify-center rounded-3xl bg-green-50">
                            <CheckCircle2 className="h-14 w-14 text-green-600" />

                            <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-orange-200" />

                            <div className="absolute bottom-4 left-2 h-3 w-3 rounded-full bg-red-100" />
                        </div>

                        <h1 className="mt-6 text-4xl font-bold text-neutral-900">
                            ชำระเงินสำเร็จ!
                        </h1>

                        <p className="mt-3 text-neutral-500">
                            ขอบคุณสำหรับการสั่งซื้อของคุณ
                            รายการของคุณกำลังดำเนินการ
                        </p>
                    </div>
                    <div className="border-t border-orange-100 p-6">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-orange-100 p-4">
                                <p className="text-sm text-neutral-400">
                                    เลขที่รายการ
                                </p>

                                <h3 className="mt-2 text-lg font-bold text-neutral-900">
                                    {orderId}
                                </h3>
                            </div>

                            <div className="rounded-xl border border-orange-100 p-4">
                                <p className="text-sm text-neutral-400">
                                    วิธีการชำระเงิน
                                </p>

                                <h3 className="mt-2 text-lg font-bold text-neutral-900">
                                    QR Code Payment
                                </h3>
                            </div>

                            <div className="rounded-xl border border-orange-100 p-4">
                                <p className="text-sm text-neutral-400">
                                    วันที่เวลา
                                </p>

                                <h3 className="mt-2 text-lg font-bold text-neutral-900">
                                    {paidDate}
                                </h3>
                            </div>

                            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                                <p className="text-sm text-orange-400">
                                    ยอดชำระทั้งหมด
                                </p>

                                <h3 className="mt-2 text-3xl font-bold text-[#d93f1d]">
                                    ฿
                                    {totalAmount.toLocaleString(
                                        "th-TH",
                                        {
                                            minimumFractionDigits: 2,
                                        }
                                    )}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <button
                                onClick={() =>
                                    router.push(`/${mockUser.id}/myOrder`)
                                }
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#d93f1d] py-4 font-semibold text-white transition-colors hover:bg-[#bf3416]"
                            >
                                <ReceiptText className="h-5 w-5" />
                                ดูสถานะคำสั่งซื้อ
                            </button>

                            <button
                                onClick={() =>
                                    router.push("/")
                                }
                                className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 py-4 font-semibold text-[#d93f1d] transition-colors hover:bg-orange-50"
                            >
                                <House className="h-5 w-5" />
                                กลับหน้าหลัก
                            </button>
                        </div>
                    </div>
                    <div className="border-t border-orange-100 bg-neutral-50 p-5">
                        {items.length > 0 && (
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 overflow-hidden rounded-lg border bg-white">
                                    <img
                                        src={items[0].image}
                                        alt={items[0].title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <p className="text-xs text-neutral-400">
                                        รายการที่คุณสั่งซื้อ
                                    </p>

                                    <h3 className="font-semibold text-neutral-800">
                                        {items[0].title}

                                        {items.length > 1 &&
                                            ` และสินค้าอีก ${items.length - 1
                                            } รายการ`}
                                    </h3>
                                </div>

                                <ChevronRight className="h-5 w-5 text-neutral-400" />
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}