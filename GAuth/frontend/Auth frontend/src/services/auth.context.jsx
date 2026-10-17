import { createContext, useCallback, useEffect, useState, useContext } from "react";
import { GAuth, getCurrentUser, login, logoutApi, otpVerify, register } from "./auth.api";

//it connect the api layer to react state management

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        const restoreSession = async () => {
            try {
                const data = await getCurrentUser();
                if (isActive) setUser(data.user);
            } catch {
                if (isActive) setUser(null);
            } finally {
                if (isActive) setAuthLoading(false);
            }
        };

        restoreSession();

        return () => {
            isActive = false;
        };
    }, []);

    const handleRegister = async (formData) => {
        setError(null);

        try {
            const data = await register(formData);

            setUser(data.user);

            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Registration failed";
            setError(errorMessage);

            return { success: false, message: errorMessage };
        }
    };

    const handleVerifyOtp = async (email, otp) => {
        setError(null);

        try {
            const data = await otpVerify({ email, otp });

            setUser(data.user);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "OTP verification failed";
            setError(errorMessage);
            alert('invalid otp')
            return { success: false, message: errorMessage };
        }
    }

    const handleLogin = async (email, password) => {
        setError(null);

        try {
            const data = await login({ email, password });
            setUser(data.user || data);
            return { success: true ,data};
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "LogIn Failed";
            setError(errorMessage);

            return { success: false, message: errorMessage };

        }
    }

    const handleGAuthLogin = useCallback(async (token) => {
        setError(null);

        try {
            const data = await GAuth({ token });
            setUser(data.user);
            return { success: true, data };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || "GAuth Failed";
            setError(errorMessage);

            return { success: false, message: errorMessage };

        }

    }, []);

    const handleLogout = async () => {
        setError(null);

        try {
            const data =await logoutApi();
            setUser(null);
            return { success: true };
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Logout Failed";
            setError(errorMessage);

            return { success: false, message: errorMessage };

        }
    }



    return (
        <AuthContext.Provider value={{ user, error, authLoading, handleRegister, handleVerifyOtp, handleLogin, handleGAuthLogin, handleLogout }} >
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}