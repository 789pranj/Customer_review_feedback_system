import { useAuthStore } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../api/auth";
import { Mic, Text, HomeIcon, LogOut } from "lucide-react";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const clearUser = useAuthStore((s) => s.clearUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    clearUser();
    navigate("/login");
  };

  if (!user) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-sky-100 p-8 flex flex-col items-center">

      {/* 🧠 Brand Title */}
      <div className="mb-2 text-center">
        <h1 className="text-4xl font-extrabold text-green-700 drop-shadow-sm tracking-wide">
          Codeiter
        </h1>
      </div>

      {/* ✨ Tagline */}
      <div className="mb-8 text-center">
        <p className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 drop-shadow-md">
          Speak it. See it. Understand it.
        </p>
      </div>

      {/* 📦 Main Card */}
      <div className="bg-white rounded-xl shadow-md w-full max-w-3xl p-6 text-center space-y-6">
        
        {/* 🙋‍♂️ Welcome */}
        <h2 className="text-xl font-semibold text-gray-800">Welcome, {user.fullName}!</h2>
        <p className="text-gray-600">Choose a feature to continue:</p>

        {/* 🚀 Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/live-record"
            className="flex flex-col items-center justify-center bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg p-4 shadow transition-all"
          >
            <Mic size={32} />
            <span className="mt-2 font-semibold">Live Record</span>
          </Link>

          <Link
            to="/audio-upload"
            className="flex flex-col items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg p-4 shadow transition-all"
          >
            <Text size={32} />
            <span className="mt-2 font-semibold">Upload Audio</span>
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg shadow transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
}
