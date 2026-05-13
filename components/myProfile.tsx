'use client'

interface MyProfileProps {
    username: string;
    fullName: string;
    setFullName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    gender: string;
    setGender: (val: string) => void;
    onPasswordChangeClick: () => void;
    onSaveProfile: () => void;
}

export default function MyProfileSection({
    username, fullName, setFullName, email, setEmail, gender, setGender, onPasswordChangeClick, onSaveProfile
}: MyProfileProps) {
    return (
        <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col space-y-1 mb-6">
                <h1 className="text-3xl font-semibold text-gray-900">My Profile</h1>
                <p className="text-sm text-gray-500">Manage and protect your account</p>
            </div>
            <hr className="border-gray-100 mb-10" />

            <div className="space-y-7">
                <div className="grid grid-cols-[120px,1fr] gap-x-4 items-center">
                    <label className="text-l text-gray-600">Username</label>
                    <div className="px-4 py-3 text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-200 uppercase tracking-tight">
                        {username}
                    </div>
                </div>

                <div className="grid grid-cols-[120px,1fr] gap-x-4 items-center">
                    <label className="text-l text-gray-600">FullName</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 hover:border-primary rounded-lg text-l focus:ring-1 focus:ring-red-800 outline-none transition-colors"
                    />
                </div>

                <div className="grid grid-cols-[120px,1fr] gap-x-4 items-center">
                    <label className="text-l text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 hover:border-primary rounded-lg text-l focus:ring-1 focus:ring-red-800 outline-none transition-colors"
                    />
                </div>

                <div className="grid grid-cols-[120px,1fr] gap-x-4 items-center">
                    <label className="text-l text-gray-600">Password</label>
                    <div className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-l flex items-center justify-between bg-white transition-all">
                        <span className="tracking-widest font-bold text-gray-700">********</span>
                        <button
                            type="button"
                            onClick={onPasswordChangeClick}
                            className="text-red-600 hover:underline font-medium"
                        >
                            Change
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-[120px,1fr] gap-x-4 items-center">
                    <label className="text-l text-gray-600">Gender</label>
                    <div className="flex items-center space-x-6 text-l">
                        {["Male", "Female", "Other"].map((option) => (
                            <label key={option} className="flex items-center space-x-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="gender"
                                    value={option}
                                    checked={gender === option}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="accent-primary w-4 h-4 cursor-pointer"
                                />
                                <span className="group-hover:text-primary transition-colors">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={onSaveProfile}
                        className="px-12 py-3 bg-primary text-white font-medium rounded-lg text-l shadow-md w-full md:w-auto hover:opacity-90 transition-opacity active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}