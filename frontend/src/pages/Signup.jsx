import { useState } from "react";
import { signup } from "../api/auth";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });
  const setUser = useAuthStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
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
        Signup and start speaking your thoughts!
      </p>

      {/* Signup Form */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-green-100">
        <h2 className="text-3xl font-bold mb-6 text-green-700 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
