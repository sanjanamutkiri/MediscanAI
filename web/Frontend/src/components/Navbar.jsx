import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions.js";

// Constants
const NAV_ITEMS = [
    { path: "/", label: "Home" },
    { path: "/telemedicine", label: "Emergency Video Call" },
    { path: "/chat", label: "Chat Consult" },
    { path: "/analysis", label: "Analysis" },
    { path: "http://localhost:5174/", label: "Emergency" },
];

export default function Navbar() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.user);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const logoutUser = async (e) => {
        e.preventDefault();
        dispatch(logout());
    };

    return (
        <div className="fixed top-0 z-50 w-full">
            <nav className="flex justify-between items-center p-2 md:p-5 bg-white shadow-lg">
                <a href="/" className="flex items-center">
                    <div className="h-10 w-10">
                        <img
                            src="/src/assets/logo.png"
                            alt="Logo"
                            className="w-auto object-contain ml-4 md:ml-8 cursor-pointer transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </a>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-gray-700 hover:text-blue-800 focus:outline-none transition-colors duration-200"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    mobileMenuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center space-x-4 lg:space-x-9">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.path}
                            href={item.path}
                            className="text-gray-800 hover:text-blue-800 transition-colors duration-200"
                        >
                            <li className="text-lg font-semibold">{item.label}</li>
                        </a>
                    ))}
                </ul>

                {/* Desktop buttons */}
                <div className="hidden md:flex items-center space-x-4 mr-2 md:mr-6">
                    <div id="google_translate_element" className="ml-4" />
                    {!isAuthenticated ? (
                        <a
                            href="/login"
                            className="bg-blue-800 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-900 transition-colors duration-200 shadow-md"
                        >
                            Login
                        </a>
                    ) : (
                        <button
                            onClick={logoutUser}
                            className="bg-blue-800 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-900 transition-colors duration-200 shadow-md"
                        >
                            Logout
                        </button>
                    )}
                    <a
                        href="/account"
                        className="transform hover:scale-110 transition-transform duration-200"
                    >
                        <img
                            className="w-10 h-10 rounded-full border-2 border-blue-800"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt="Profile"
                        />
                    </a>
                </div>
            </nav>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="block md:hidden bg-white shadow-lg animate-fadeIn">
                    <ul className="flex flex-col p-4">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.path}
                                href={item.path}
                                className="py-3 text-gray-800 hover:text-blue-800 transition-colors duration-200"
                            >
                                <li className="text-base font-semibold">{item.label}</li>
                            </a>
                        ))}
                    </ul>
                    <div className="p-4">
                        {!isAuthenticated ? (
                            <a
                                href="/login"
                                className="block w-full text-center bg-blue-800 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-900 transition-colors duration-200 shadow-md"
                            >
                                Login
                            </a>
                        ) : (
                            <button
                                onClick={logoutUser}
                                className="w-full bg-blue-800 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-blue-900 transition-colors duration-200 shadow-md"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
