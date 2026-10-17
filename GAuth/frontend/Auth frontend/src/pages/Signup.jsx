import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useAuth } from "../services/auth.context";
import AnimatedOTP from "../component/otpSystem";

const Register = () => {
    const navigate = useNavigate();

    const [showOtpScreen, setShowOtpScreen] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "user" // Default role set to user
    });

    const { handleRegister, error, handleVerifyOtp } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await handleRegister(formData);

            if (result.success) {
                setShowOtpScreen(true);
            } else {
                alert("Registration failed. Please try again.");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed";
            console.error("Registration failed:", errorMessage);
        }
    }

    const verifyOtp = async (otp) => {
        try {
            const result = await handleVerifyOtp(formData.email, otp);

            if (result.success) {
                navigate("/Main");
            } else {
                alert("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            const errorMessage = error.response?.data?.message || "OTP verification failed";
            alert(errorMessage);
        }
    };

    return (
        <main className="min-h-screen bg-[#FFF8EC] flex flex-col">
            <Navbar />

            {/* Main responsive wrapper */}
            <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 lg:p-10">
                <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#deded8]">

                    {/* Left Window: Form Section */}
                    <div className="bg-[#FFF8EC] w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
                        <div className="max-w-md w-full mx-auto">
                            
                            <div className="mb-6">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#546B41]">Auth System</span>
                                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171914] mt-1">Create Account</h1>
                                <p className="text-xs text-gray-500 mt-1">Sign up to start sharing or exploring recipes.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-1.5">
                                        Username
                                    </label>
                                    <input 
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your name"
                                        className="w-full border border-[#deded8] px-3.5 py-2.5 rounded-xl text-sm bg-white focus:outline-none focus:border-[#546B41]" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-1.5">
                                        Email
                                    </label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter email"
                                        className="w-full border border-[#deded8] px-3.5 py-2.5 rounded-xl text-sm bg-white focus:outline-none focus:border-[#546B41]" 
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-1.5">
                                        Password
                                    </label>
                                    <input 
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter password"
                                        className="w-full border border-[#deded8] px-3.5 py-2.5 rounded-xl text-sm bg-white focus:outline-none focus:border-[#546B41]" 
                                    />
                                </div>
                                
                                <div className="flex items-center justify-between pt-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#41433e]">
                                        Select Role:
                                    </label>
                                    <select 
                                        name="role" 
                                        value={formData.role} 
                                        onChange={handleChange} 
                                        required 
                                        className="border border-[#deded8] rounded-xl px-4 py-2 text-sm bg-white focus:outline-none focus:border-[#546B41] cursor-pointer"
                                    >
                                        <option value="user">User</option>
                                        <option value="creator">Creator</option>
                                    </select>
                                </div>

                                {/* OTP Verification Component Area */}
                                {showOtpScreen && (
                                    <div className="py-2">
                                        <AnimatedOTP onVerify={verifyOtp} />
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-[#546B41] py-3.5 mt-2 rounded-2xl text-[#FFF8EC] font-medium text-sm hover:bg-[#435534] transition-all active:scale-95 shadow-sm cursor-pointer"
                                >
                                    Register
                                </button>
                            </form>

                            <p className="mt-6 text-xs text-center text-gray-600">
                                Already have an account?{" "}
                                <Link to="/SignIn" className="text-[#546B41] font-semibold hover:underline">
                                    Sign In
                                </Link>
                            </p>

                        </div>
                    </div>

                    {/* Right Window: Features Panel (Hidden on small mobile, visible on large screens) */}
                    <div className="bg-[#546B41] w-full lg:w-1/2 p-8 lg:p-12 hidden lg:flex flex-col justify-center text-[#FFF8EC]">
                        <div className="max-w-sm mx-auto space-y-6">
                            
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs uppercase tracking-widest font-semibold opacity-80">Platform Highlights</h3>
                            </div>

                            <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-md">
                                <img
                                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
                                    alt="Cooking preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-lg font-serif font-bold">Fast & Secure Experience</h4>
                                <p className="text-xs opacity-90 leading-relaxed">
                                    Join our culinary ecosystem to publish recipes, embed video tutorials, and connect with fellow home chefs seamlessly.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Register;