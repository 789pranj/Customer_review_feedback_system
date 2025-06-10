import { useState } from "react";
import { login } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 px-4 py-12">
      {/* Brand Title */}
      <h1 className="text-5xl font-extrabold text-green-700 drop-shadow-sm tracking-wide">
        Codeiter
      </h1>
      {/* Tagline */}
      <p className="mt-1 mb-10 text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-blue-500">
        Speak your mind, let us transcribe!
      </p>

      {/* Login Form */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-green-100">
        <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
          >
            <LogIn className="w-5 h-5" />
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
