"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTachometerAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUsername(storedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-600 to-blue-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 shadow-lg flex flex-col">
        <div className="flex items-center gap-3 px-6 py-6 border-b border-blue-100">
          <div className="bg-blue-700 rounded-full p-2">
            <FaTachometerAlt className="text-white text-2xl" />
          </div>
          <span className="text-xl font-bold text-blue-800">Projnex</span>
        </div>
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 bg-blue-100 font-semibold hover:bg-blue-200 transition"
              >
                <FaTachometerAlt />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-700 hover:bg-blue-100 transition"
              >
                <FaUser />
                Profile
              </a>
            </li>
          </ul>
        </nav>
        <div className="px-4 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
          >
            <FaSignOutAlt />
            Log Out
          </button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 shadow px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-800">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center font-bold">
              {username ? username[0].toUpperCase() : "U"}
            </div>
            <span className="text-blue-800 font-semibold">{username}</span>
          </div>
        </header>
        {/* Content */}
        <section className="flex-1 p-8">
          <div className="bg-white/90 rounded-xl shadow p-8">
            <h2 className="text-xl font-bold text-blue-700 mb-2">
              Welcome to Dashboard
            </h2>
            <p className="text-gray-600">
              Selamat datang,{" "}
              <span className="font-semibold text-blue-700">
                {username || "tidak ditemukan"}
              </span>{" "}
              👋
            </p>
            {/* Tambahkan konten dashboard lain di sini */}
          </div>
        </section>
      </main>
    </div>
  );
}
