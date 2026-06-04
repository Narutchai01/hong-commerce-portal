'use client'
import { X } from "lucide-react";
import { mockUser } from "@/data/mockUser";
import { useRouter } from "next/navigation";

interface OrderDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: any;
    subtotal: number;
    shippingFee: number;
    onCancel: (id: string) => void;
}

export default function OrderDetailModal({ 
    isOpen, onClose, order, subtotal, shippingFee, onCancel 
}: OrderDetailModalProps) {
    const router = useRouter();
    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white w-full max-w-2xl rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-neutral-800">Order Detail</h2>
                    <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-neutral-500" />
                    </button>
                </div>
                <p className="text-sm text-neutral-400 mb-5 font-mono">{order.orderId}</p>

                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="p-4 border rounded-xl bg-neutral-50">
                        <h3 className="font-bold text-xs uppercase text-neutral-500 mb-2">Shipping Address</h3>
                        <p className="text-sm font-semibold text-neutral-800">{mockUser.fullName}</p>
                        <p className="text-sm text-neutral-500 leading-relaxed">
                            {mockUser.address.detail}, {mockUser.address.city}, {mockUser.address.country}, {mockUser.address.zipCode}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {order.items.map((item: any) => (
                            <div key={item.id} className="flex items-center gap-4">
                                <img src={item.image} className="h-16 w-16 rounded-lg object-cover border" alt="" />
                                <div className="flex-1">
                                    <p className="font-semibold text-neutral-800 line-clamp-1">{item.title}</p>
                                    <p className="text-sm text-neutral-400">x{item.quantity}</p>
                                </div>
                                <p className="font-bold text-[#d93f1d]">฿{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Subtotal</span>
                            <span className="font-medium">฿{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-500">Shipping Fee</span>
                            <span className="font-medium">฿{shippingFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-3 border-dashed">
                            <span>Total Amount</span>
                            <span className="text-[#d93f1d]">฿{order.totalAmount.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="pt-2 pb-2">
                        {order.status === "toPay" && (
                            <button onClick={() => router.push(`/${mockUser.id}/payment`)} className="w-full py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-orange-200 ">
                                ชำระเงินทันที
                            </button>
                        )}
                        {order.status === "toShip" && (
                            <button onClick={() => onCancel(order.orderId)} className="w-full py-3.5 bg-red-500 text-white border border-red-100 rounded-xl font-bold shadow-lg shadow-red-200">
                                ยกเลิกคำสั่งซื้อ
                            </button>
                        )}
                        {(order.status === "cancelled" || order.status === "completed") && (
                            <button onClick={() => router.push(`/detailProduct/${order.items[0]?.id}`)} className="w-full py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-orange-200">
                                ซื้ออีกครั้ง
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}