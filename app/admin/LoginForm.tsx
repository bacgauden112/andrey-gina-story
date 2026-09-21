"use client";

import { useState } from "react";
import { login } from "./auth-actions";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(password);
    if (res.error) {
      setError(res.error);
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-20">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Đăng nhập Admin</h2>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 transition"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
