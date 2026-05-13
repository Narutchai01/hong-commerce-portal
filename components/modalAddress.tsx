'use client'
import { X } from "lucide-react";

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    data: any;
    onChange: (e: any) => void;
    onSave: () => void;
}

export default function AddressModal({ isOpen, onClose, title, data, onChange, onSave }: AddressModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <button onClick={onClose}><X className="w-6 h-6 text-gray-400 hover:text-gray-600" /></button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-l font-semibold">Full Name</label>
                            <input name="fullName" value={data.fullName} onChange={onChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-l font-semibold">Phone Number</label>
                            <input name="phone" value={data.phone} onChange={onChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-l font-semibold">Country</label>
                        <input name="country" value={data.country} onChange={onChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-l font-semibold">City</label>
                            <input name="city" value={data.city} onChange={onChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-l font-semibold">Zip Code</label>
                            <input name="zipCode" value={data.zipCode} onChange={onChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-l font-semibold">Address Detail</label>
                        <textarea name="detail" rows={3} value={data.detail} onChange={onChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:border-primary resize-none" />
                    </div>
                </div>
                <div className="px-6 py-4 flex gap-3 bg-gray-50">
                    <button onClick={onClose} className="flex-1 py-3 border rounded-xl font-bold">Cancel</button>
                    <button onClick={onSave} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold">Save</button>
                </div>
            </div>
        </div>
    );
}