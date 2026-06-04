"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Package } from "lucide-react";
import { orderStatusMap } from "@/utils/orderStatus";
import OrderTabs from "@/components/myOrder/orderTabs";
import OrderCard from "@/components/myOrder/orderCard";
import OrderDetailModal from "@/components/myOrder/orderDetailModal";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string>("all");
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        }
    }, []);

    const filteredOrders = useMemo(() => {
        return activeTab === "all"
            ? orders
            : orders.filter((order) => order.status === activeTab);
    }, [orders, activeTab]);

    const tabs = [
        { key: "all", label: "ทั้งหมด" },
        ...Object.entries(orderStatusMap).map(([key, value]) => ({
            key,
            label: value.label,
        })),
    ];

    const subtotal = useMemo(() => {
        if (!selectedOrder) return 0;
        return selectedOrder.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    }, [selectedOrder]);

    const shippingFee = useMemo(() => {
        if (!selectedOrder) return 0;
        return Math.max(selectedOrder.totalAmount - subtotal, 0);
    }, [selectedOrder, subtotal]);

    const handleCancelOrder = (orderId: string) => {
        const updatedOrders = orders.map((order) => 
            order.orderId === orderId ? { ...order, status: "cancelled" } : order
        );
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        setOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-10">
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-neutral-900">My Orders</h1>
                        <p className="text-neutral-500 mt-2">รายการคำสั่งซื้อทั้งหมดของคุณ</p>
                    </div>

                    <OrderTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="space-y-5">
                        {filteredOrders.length === 0 ? (
                            <div className="bg-neutral-50 border border-dashed rounded-2xl p-16 text-center">
                                <Package className="w-16 h-16 mx-auto text-neutral-200" />
                                <h2 className="mt-4 text-lg font-medium text-neutral-400">ยังไม่มีคำสั่งซื้อในหมวดนี้</h2>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <OrderCard 
                                    key={order.orderId} 
                                    order={order} 
                                    onClick={() => { setSelectedOrder(order); setOpen(true); }} 
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>

            <OrderDetailModal 
                isOpen={open} 
                onClose={() => setOpen(false)} 
                order={selectedOrder} 
                subtotal={subtotal} 
                shippingFee={shippingFee} 
                onCancel={handleCancelOrder}
            />
            <Footer />
        </div>
    );
}