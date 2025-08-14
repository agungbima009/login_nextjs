"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Ambil username dari localStorage
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      router.push("/login"); // kalau belum login, balik ke login
    } else {
      setUsername(storedUser);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">
        Selamat datang, {username || "tidak ditemukan"} 👋
      </h1>

      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
      >
        Log Out
      </button>
    </div>
  );
}
