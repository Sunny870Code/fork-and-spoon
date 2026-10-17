import { createBrowserRouter, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import AnnouncementBar from "./component/announcement";
import Register from "./pages/Signup";
import SignIn from "./pages/SignIn";
import Main from "./component/Mainpage";
import ScrollingBanner from "./component/scrolllingbar";
import Footer from "./component/footer";
import RecipeList from "./component/RecipeList";
import AddRecipe from "./component/RecipeInputForm";
import { useAuth } from "./services/auth.context";
import About from "./pages/about";

const RequireAuth = ({ children }) => {
    const { user, authLoading } = useAuth();
    if (authLoading) return null;
    return user ? children : <Navigate to="/SignIn" replace />;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element:
            (
                <>
                    <AnnouncementBar />
                    <Navbar />
                    <Home />
                    <ScrollingBanner />
                    <Footer />
                </>
            ),

    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/SignIn",
        element: <SignIn />
    },
    {
        path: "/Main",
        element: <RequireAuth><>
            <Navbar />
            <Main />
        </></RequireAuth>
    }, {
        path: "/RecipeList",
        element: (
            <>
                <AnnouncementBar />
                <Navbar />
                <RecipeList />
                <Footer />
            </>
        )
    },
    {
        path: "/Add-Recipe",
        element: <RequireAuth><>
            <AnnouncementBar />
            <Navbar />
            <AddRecipe />
        </></RequireAuth>
    }, {
        path: "/about",
        element: <>
            <Navbar />
            <About />
        </>

    }
])