import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    withCredentials: true
})

export async function register({ username, email, password,role }) {
    try {
        const response = await api.post('api/auth/register', {
            username, email, password,role
        }, {
            withCredentials: true
        })
        return response.data;

    } catch (error) {
        console.error("Register API error:", error.response?.data || error.message);
        throw error;
    }

}

export async function otpVerify({ email, otp }) {

    try {
        const response = await api.post('api/auth/verifyotp',
            { email, otp }, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.error("verify otp API error:", error.response?.data || error.message);
        throw error;
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post('api/auth/login',
            { email, password },
            { withCredentials: true })
            return response.data;
    } catch(error){
        console.error("LogIn api error :", error.response?.data || error.message);
        throw error;
    }
}

export async function getCurrentUser() {
    const response = await api.get("api/auth/me");
    return response.data;
}

export async function GAuth({token}) {
    try{
        const response = await api.post('api/auth/gauth',
            {token},
            {withCredentials:true}
        )
        return response.data;
    } catch(error){
        console.error("GAuth failed:",error.response?.data || error.message);
        throw error;
    }
    
}

export async function logoutApi() {
    try{
        const response = await api.post('api/auth/logout',{},{withCredentials:true});
        return response.data;
    }catch(error){
        console.error("Logout failed:",error.response?.data || error.message);
        throw error;
    }
    
}


export async function getAllRecipes() {
    try {
        const response = await api.get("/api/recipes/getRecipe");
        return response.data; // Returns just the array of recipes
    } catch (error) {
        console.error("Get recipes API error:", error.response?.data || error.message);
        throw error;
    }
}

