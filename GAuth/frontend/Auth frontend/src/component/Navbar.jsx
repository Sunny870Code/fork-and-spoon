
// export default Navbar;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.context"; // Adjust to your actual auth hook path

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, handleLogout } = useAuth(); // Pull user state and logout handler from context
    const navigate = useNavigate();
    const homePath = user ? "/Main" : "/";

    const navLinks = [
        { name: "home", path: user ? "/Main" : "/" },
        { name: "recipes", path: "/recipeList" },
        { name: "about", path: "/About" },
    ];

    const onLogout = async () => {
        const result = await handleLogout();
        if (result.success) {
            navigate("/SignIn", { replace: true });
        } else {
            console.error("Logout failed:", result.message);
        }
    };

    return (
        <nav className="w-full bg-[#faf9f6] border-b border-[#deded8] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-4
                    flex items-center justify-between">

                {/* Logo */}
                <Link to={homePath} className="flex items-center gap-2">
                    <span className="text-2xl text-[#26372c]">⚒</span>
                    <span className="text-2xl font-serif text-[#171914]">
                        Fork & Spoon
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm text-[#41433e] capitalize
                         hover:text-[#617762] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* 🚀 Show Add Recipe link ONLY for creators or admins */}
                    {user && (user.role === "creator" || user.role === "admin") && (
                        <Link
                            to="/Add-Recipe"
                            className="text-sm text-[#506650] font-semibold hover:text-[#3f533f] transition-colors"
                        >
                            Add Recipe
                        </Link>
                    )}
                </div>

                {/* Desktop Right Side: Auth / Profile */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            {/* Account Recipes Link */}
                            <Link 
                                to="/my-recipes" 
                                className="text-xs font-semibold uppercase tracking-wider text-[#41433e] hover:text-[#171914] transition-colors"
                            >
                                My Recipes
                            </Link>

                            {/* User Profile Badge */}
                            <div className="flex items-center gap-2.5 pl-3 border-l border-[#deded8]">
                                <div className="w-8 h-8 rounded-full bg-[#506650] text-white flex items-center justify-center text-xs font-bold uppercase shadow-sm">
                                    {user.username ? user.username.charAt(0) : "U"}
                                </div>
                                <span className="text-xs font-semibold text-[#171914]">
                                    {user.username}
                                </span>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={onLogout}
                                className="px-4 py-2 rounded-full border border-[#deded8] text-xs font-medium text-[#171914] hover:bg-white transition-all cursor-pointer shadow-sm"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/register"
                                className="px-5 py-2 rounded-full border
                               border-[#718571] text-[#354536]
                               hover:bg-[#eef0eb] transition-colors text-sm"
                            >
                                Sign Up
                            </Link>

                            <Link
                                to="/signin"
                                className="px-5 py-2 rounded-full bg-[#506650]
                               text-white hover:bg-[#3f533f]
                               transition-colors text-sm"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col justify-center
                     items-center gap-1.5 w-10 h-10
                     text-[#26372c]"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? (
                        <span className="text-3xl leading-none">&times;</span>
                    ) : (
                        <>
                            <span className="w-6 h-0.5 bg-current rounded-full" />
                            <span className="w-6 h-0.5 bg-current rounded-full" />
                            <span className="w-6 h-0.5 bg-current rounded-full" />
                        </>
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden border-t border-[#deded8]
                        bg-[#faf9f6] px-6 py-6
                        flex flex-col gap-5">

                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="text-[#41433e] capitalize
                         hover:text-[#617762] text-sm font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Mobile Add Recipe Link */}
                    {user && (user.role === "creator" || user.role === "admin") && (
                        <Link
                            to="/add-recipe"
                            onClick={() => setIsOpen(false)}
                            className="text-[#506650] font-semibold text-sm"
                        >
                            + Add Recipe
                        </Link>
                    )}

                    <div className="border-t border-[#deded8] pt-4
                         flex flex-col gap-3">
                        {user ? (
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 py-1">
                                    <div className="w-8 h-8 rounded-full bg-[#506650] text-white flex items-center justify-center text-xs font-bold uppercase">
                                        {user.username ? user.username.charAt(0) : "U"}
                                    </div>
                                    <span className="text-sm font-semibold text-[#171914]">
                                        {user.username}
                                    </span>
                                </div>

                                <Link
                                    to="/my-recipes"
                                    onClick={() => setIsOpen(false)}
                                    className="text-sm text-[#41433e]"
                                >
                                    My Recipes
                                </Link>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        onLogout();
                                    }}
                                    className="w-full text-center py-2.5 rounded-full border border-[#deded8] text-[#171914] text-xs font-medium"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/signIn"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2 rounded-full
                               border border-[#718571] text-[#354536] text-sm"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2 rounded-full
                               bg-[#506650] text-white text-sm"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;