import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribe email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-[#F0F1F1] border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-orange-600">Logo</h2>
          <p className="text-gray-600 mt-3 text-sm leading-relaxed">
            The world's most vibrant digital bazaar. Fast, reliable, and packed
            with incredible finds.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Customer Care</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-orange-600 cursor-pointer">Help Center</li>
            <li className="hover:text-orange-600 cursor-pointer">Track Order</li>
            <li className="hover:text-orange-600 cursor-pointer">Contact Us</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">About Us</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-orange-600 cursor-pointer">Terms of Service</li>
            <li className="hover:text-orange-600 cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Newsletter</h3>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="bg-orange-600 text-white px-4 rounded-r-md hover:bg-orange-700"
            >
              Join
            </button>
          </form>

          <p className="text-xs text-gray-500 mt-3">
            © 2024 BazaarFlow. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}