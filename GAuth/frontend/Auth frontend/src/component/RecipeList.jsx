import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { getAllRecipes } from "../services/auth.api";

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const data = await getAllRecipes();
                setRecipes(data);
            } catch (err) {
                setError("Failed to load recipes from the server");
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, []); 

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-sm text-gray-500 bg-gradient-to-br from-[#f4f2ec] via-[#eae5d8] to-[#dfd9cc]">
                Loading delicious recipes...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-sm text-rose-600 bg-gradient-to-br from-[#f4f2ec] via-[#eae5d8] to-[#dfd9cc]">
                {error}
            </div>
        );
    }

    return (
        /* 🚀 Attractive earthy background gradient replacing bg-gray-300 */
        <div className="min-h-screen bg-gradient-to-br from-[#f4f2ec] via-[#eae5d8] to-[#dfd9cc] py-12 px-4 sm:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Page Header */}
                <div className="text-center mb-8 space-y-2">
                    <h1 className="text-3xl font-serif font-extrabold text-[#171914]">Community Feed</h1>
                    <p className="text-xs text-gray-500 font-medium">Explore and cook dishes shared by creators.</p>
                </div>

                {/* Empty database check */}
                {recipes.length === 0 ? (
                    <div className="text-center py-16 text-sm text-gray-600 bg-white/80 backdrop-blur-md rounded-3xl border border-[#deded8] shadow-sm">
                        No recipes found in the database yet. Publish one to see it here!
                    </div>
                ) : (
                    /* Recipe Feed Container */
                    <div className="space-y-6">
                        {recipes.map((recipe) => (
                            <RecipeCard key={recipe._id} recipe={recipe} />
                        ))}
                    </div>
                )}
                
            </div>
        </div>
    );
}