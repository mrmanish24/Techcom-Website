// pages/admin/login.tsx
"use client"
import { useState } from "react";
import { useRouter } from "next/router";

const AdminLogin = () => {
  const [key, setKey] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === "manish24") {
      router.push("/admin");
    } else {
      alert("Incorrect key!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 border rounded shadow-lg">
        <h2 className="text-2xl font-semibold">Admin Login</h2>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter admin key"
          className="my-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
