import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { LogOut, UserPlus, LogIn, Home, Text, HomeIcon, Mic } from "lucide-react";
import { logout } from "../api/auth";
import { useEffect } from "react";

export default function Navbar() {
    const user = useAuthStore((s) => s.user);
    const setUser = useAuthStore((s) => s.setUser);
    const clearUser = useAuthStore((s) => s.clearUser);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        clearUser();
        navigate("/login");
    };

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-green-50 shadow-md sticky top-0 z-50 rounded-b-md border border-green-100">
            <div className="flex items-center space-x-3 text-green-700 font-extrabold text-xl select-none">
                <Link to="/" className="hover:text-green-900 transition-colors duration-300">
                    Codeiter
                </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm font-semibold text-green-800">
                {!user ? (
                    <>
                        <Link
                            to="/"
                            className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-purple-100 hover:text-purple-900 transition-colors duration-200"
                        >
                            <UserPlus className="w-5 h-5" />
                            <span>Signup</span>
                        </Link>
                        <Link
                            to="/login"
                            className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-orange-100 hover:text-orange-900 transition-colors duration-200"
                        >
                            <LogIn className="w-5 h-5" />
                            <span>Login</span>
                        </Link>
                    </>
                ) : (
                    <>

                        <Link
                            to="/dashboard"
                            className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-yellow-100 hover:text-yellow-900 transition-colors duration-200"
                        >
                            <HomeIcon className="w-5 h-5" />
                            <span>Home</span>
                        </Link>

                        <Link
                            to="/live-record"
                            className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-pink-100 hover:text-pink-900 transition-colors duration-200"
                        >
                            <Mic className="w-5 h-5" />
                            <span>Live</span>
                        </Link>




                        <Link
                            to="/audio-upload"
                            className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-blue-100 hover:text-green-900 transition-colors duration-200"
                        >
                            <Text className="w-5 h-5" />
                            <span>Text</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white shadow-sm hover:bg-red-100 hover:text-red-600 transition-colors duration-200 focus:outline-none"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
