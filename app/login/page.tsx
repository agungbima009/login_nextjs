"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.success) {
            localStorage.setItem("username", data.username);
            router.push("/dashboard");
        } else {
            alert("Login gagal");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-blue-900">
            <form
                onSubmit={handleLogin}
                className="bg-white/90 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
            >
                <div className="flex flex-col items-center mb-2">
                    <div className="bg-blue-600 rounded-full p-3 mb-2 shadow-lg">
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                            <path
                                fill="#fff"
                                d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.418 0-8 2.239-8 5v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.761-3.582-5-8-5z"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-blue-800 mb-1">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Please sign in to your account
                    </p>
                </div>
                <div>
                    <label
                        className="block text-blue-700 font-semibold mb-1"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-blue-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                        autoComplete="username"
                    />
                </div>
                <div>
                    <label
                        className="block text-blue-700 font-semibold mb-1"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-blue-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-black"
                        autoComplete="current-password"
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-lg ${
                        loading
                            ? "opacity-60 cursor-not-allowed"
                            : ""
                    }`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div className="text-center text-sm text-gray-500 mt-2">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Sign up
                    </a>
                </div>
            </form>
        </div>
    );
}
