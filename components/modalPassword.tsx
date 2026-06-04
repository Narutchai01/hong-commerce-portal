'use client'
import { X } from "lucide-react";

interface PasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    oldPass: string;
    setOldPass: (v: string) => void;
    newPass: string;
    setNewPass: (v: string) => void;
    onSave: () => void;
}

export default function PasswordModal({ isOpen, onClose, oldPass, setOldPass, newPass, setNewPass, onSave }: PasswordModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
                    <button onClick={onClose}><X className="w-6 h-6 text-gray-400 hover:text-gray-600" /></button>
                </div>
                <div className="p-6 space-y-5">
                    <div className="space-y-1">
                        <label className="text-sm font-semibold">Old Password</label>
                        <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-primary" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold">New Password</label>
                        <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full px-4 py-3 border rounded-xl outline-none focus:border-primary" placeholder="Min. 4 characters" />
                    </div>
                </div>
                <div className="px-6 py-4 flex gap-3 bg-gray-50">
                    <button onClick={onClose} className="flex-1 py-3 border border-gray-300 rounded-xl font-bold">Cancel</button>
                    <button onClick={onSave} className="flex-1 py-3 bg-primary text-white rounded-xl font-bold">Save</button>
                </div>
            </div>
        </div>
    );
}