"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();



        if (data.success) {
            localStorage.setItem("username", data.username);
            router.push("/dashboard");
        } else {
            alert("Login gagal");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-md rounded-lg p-6 w-96"
            >
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border rounded w-full p-2 mb-3"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded w-full p-2 mb-3"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
                    Login
                </button>
            </form>
        </div>
    );
}
