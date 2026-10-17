import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";
import { useAuth } from "../services/auth.context";

const SignIn = () => {
    const navigate = useNavigate();

    // using custom hook
    const { handleLogin, error, handleGAuthLogin } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [googleError, setGoogleError] = useState("");
    const googleButtonRef = useRef(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await handleLogin(formData.email, formData.password);

            if (result.success) {
                alert(`Welcome back, ${result.data.user.username}!`);
                const userRole = result.data.user.role;
                if (userRole === "creator" || userRole === "admin") {
                    navigate("/Main"); // Send creators directly to the input form
                } else {
                    navigate("/"); // Send regular users to the home/browse page
                }
            } else {
                console.error("LogIn failed:", result.message);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "LogIn Failed";
            console.error("LogIn Failed:", errorMessage);
        }
    }

    const handleGAuth = useCallback(async (response) => {
        const token = response?.credential;
        if (!token) {
            setGoogleError("Google did not return a sign-in credential. Please try again.");
            return;
        }

        setGoogleError("");
        try {
            const result = await handleGAuthLogin(token);
            if (result.success) {
                const userRole = result.data.user.role;
                if (userRole === "creator" || userRole === "admin") {
                    navigate("/Main");
                } else {
                    navigate("/");
                }
            } else {
                setGoogleError(result.message || "Google authentication failed.");
            }
        } catch (error) {
            console.error("GAuth verification failed:", error);
            setGoogleError(error.response?.data?.message || error.response?.data?.error || error.message || "Google authentication failed.");
        }
    }, [handleGAuthLogin, navigate]);

    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    useEffect(() => {
        const buttonContainer = googleButtonRef.current;

        if (!buttonContainer) return;
        if (!googleClientId) return;

        const renderGoogleButton = () => {
            if (!window.google?.accounts?.id) return;

            window.google.accounts.id.initialize({
                client_id: googleClientId,
                callback: handleGAuth
            });
            window.google.accounts.id.renderButton(buttonContainer, {
                theme: "outline",
                size: "large",
                text: "continue_with",
                shape: "rectangular",
                width: 280 // Adjusted slightly for robust mobile responsiveness
            });
        };

        const scriptUrl = "https://accounts.google.com/gsi/client";
        let script = document.querySelector(`script[src="${scriptUrl}"]`);
        const onScriptError = () => setGoogleError("Could not load Google sign-in. Check your connection and try again.");

        if (window.google?.accounts?.id) {
            renderGoogleButton();
        } else {
            if (!script) {
                script = document.createElement("script");
                script.src = scriptUrl;
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
            }
            script.addEventListener("load", renderGoogleButton);
            script.addEventListener("error", onScriptError);
        }

        return () => {
            script?.removeEventListener("load", renderGoogleButton);
            script?.removeEventListener("error", onScriptError);
            buttonContainer.replaceChildren();
        };
    }, [googleClientId, handleGAuth]);

    return (
        <main className="min-h-screen bg-[#FFF8EC] flex flex-col">
            <Navbar />
            
            {/* Responsive Main Layout Container */}
            <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 lg:p-10">
                <div className="w-full max-w-4xl flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#deded8]">

                    {/* Left Window: Credentials SignIn */}
                    <div className="bg-[#FFF8EC] w-full lg:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
                        <div className="max-w-md w-full mx-auto">
                            
                            <div className="mb-6">
                                <span className="text-xs font-semibold uppercase tracking-wider text-[#546B41]">Auth System</span>
                                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171914] mt-1">Welcome Back</h1>
                                <p className="text-xs text-gray-500 mt-1">Sign in to manage your recipes and account.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-1.5">
                                        Email
                                    </label>
                                    <input 
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={formData.email}
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
                                        onChange={handleChange}
                                        value={formData.password}
                                        required
                                        placeholder="Enter password"
                                        className="w-full border border-[#deded8] px-3.5 py-2.5 rounded-xl text-sm bg-white focus:outline-none focus:border-[#546B41]" 
                                    />
                                </div>

                                <div className="text-right">
                                    <Link to="/" className="text-xs text-[#546B41] font-semibold hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>

                                {error && <p className="text-xs text-red-700 bg-red-50 p-2 rounded-lg" role="alert">{error}</p>}

                                <button
                                    type="submit"
                                    className="w-full bg-[#546B41] p-3.5 mt-2 rounded-2xl text-[#FFF8EC] font-medium text-sm hover:bg-[#435534] transition-all active:scale-95 shadow-sm cursor-pointer"
                                >
                                    Sign In
                                </button>
                            </form>

                            <p className="mt-6 text-xs text-center text-gray-600">
                                Don't have an account?{" "}
                                <Link to={"/register"} className="text-[#546B41] font-semibold hover:underline">
                                    Register
                                </Link>
                            </p>

                        </div>
                    </div>

                    {/* Right Window: Google OAuth 2.0 Section */}
                    <div className="bg-[#546B41] w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-[#FFF8EC]">
                        <div className="max-w-sm mx-auto w-full space-y-6">

                            {/* GAuth Header */}
                            <div className="text-center space-y-1">
                                <h2 className="text-2xl font-serif font-bold text-[#FFF8EC]">
                                    GAuth 2.0
                                </h2>
                                <p className="text-xs text-[#DCE8D2]">
                                    Fast & secure authentication
                                </p>
                            </div>

                            {/* Google Auth Card */}
                            <div className="bg-[#FFF8EC] rounded-2xl p-6 sm:p-7 shadow-lg text-[#171914]">
                                
                                <h3 className="text-base font-semibold text-[#546B41]">
                                    Continue with Google
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 mb-6">
                                    Use your verified Google account
                                </p>

                                <div ref={googleButtonRef} className="flex min-h-10 justify-center w-full overflow-hidden" />

                                {(googleError || !googleClientId) && (
                                    <p className="mt-3 text-center text-xs text-red-700 bg-red-50 p-2 rounded-lg" role="alert">
                                        {googleError || "Google sign-in is not configured."}
                                    </p>
                                )}

                                {/* Footer */}
                                <p className="text-[10px] text-gray-400 text-center mt-6 uppercase tracking-wider font-medium">
                                    Secured by GAuth 2.0
                                </p>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default SignIn;