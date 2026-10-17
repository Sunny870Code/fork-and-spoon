import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/auth.context";
import { getAllRecipes } from "../services/auth.api";

// Helper function to extract YouTube Video ID and return embed URL
const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    // 🚀 Track which recipe cards are expanded by their ID
    const [expandedRecipes, setExpandedRecipes] = useState({});

    const toggleExpand = (id) => {
        setExpandedRecipes((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const categories = ["All", "Quick & Easy", "Plant-Based", "Artisan Breads", "Sweet Treats"];

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const data = await getAllRecipes();
                setRecipes(data);
            } catch (err) {
                console.error("Error fetching feed:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeed();
    }, []);

    const isCreator = user?.role === "creator" || user?.role === "admin";

    return (
        <div className="min-h-screen bg-[#faf9f6] text-[#171914] py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto space-y-12">
                
                {/* 1. PERSONALIZED WELCOME BANNER */}
                <div className="bg-white rounded-3xl border border-[#deded8] p-8 md:p-10 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-[#506650]/10 text-[#506650] text-xs font-semibold uppercase tracking-wider">
                                {user?.role || "Member"} Dashboard
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                            Welcome back, {user?.username || "Chef"}! 🍳
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500">
                            Discover new seasonal creations or watch creator tutorials shared by the community.
                        </p>
                    </div>

                    {isCreator ? (
                        <button
                            onClick={() => navigate("/add-recipe")}
                            className="whitespace-nowrap px-6 py-3.5 rounded-full bg-[#506650] text-white text-xs font-medium hover:bg-[#3f533f] transition-all shadow-sm cursor-pointer"
                        >
                            + Publish New Recipe
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/recipeList")}
                            className="whitespace-nowrap px-6 py-3.5 rounded-full bg-[#171914] text-white text-xs font-medium hover:bg-gray-800 transition-all shadow-sm cursor-pointer"
                        >
                            Browse All Recipes &rarr;
                        </button>
                    )}
                </div>

                {/* 2. CATEGORY FILTER PILLS */}
                <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-none">
                    <div className="flex gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer border whitespace-nowrap ${
                                    selectedCategory === category
                                        ? "bg-[#171914] text-white border-[#171914]"
                                        : "bg-white text-[#41433e] border-[#deded8] hover:border-[#171914]"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. RECIPE FEED GRID WITH FULL EXPANDABLE DETAILS */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-serif font-bold text-[#171914]">Community Feed & Tutorials</h2>
                        <span className="text-xs text-gray-400">{recipes.length} recipes available</span>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-xs text-gray-400">Loading fresh dishes...</div>
                    ) : recipes.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-3xl border border-[#deded8] space-y-3">
                            <p className="text-sm text-gray-500">No recipes published in the community yet.</p>
                            {isCreator && (
                                <button 
                                    onClick={() => navigate("/add-recipe")} 
                                    className="text-xs font-semibold text-[#506650] hover:underline"
                                >
                                    Be the first creator to add one!
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
                            {recipes.map((recipe) => {
                                const embedUrl = getYouTubeEmbedUrl(recipe.youtubeUrl);
                                const isExpanded = expandedRecipes[recipe._id];

                                return (
                                    <div 
                                        key={recipe._id}
                                        className="bg-white rounded-3xl border border-[#deded8] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                                    >
                                        <div>
                                            {/* Media Section */}
                                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                                {embedUrl ? (
                                                    <iframe 
                                                        src={embedUrl}
                                                        title={recipe.title}
                                                        className="w-full h-full border-0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : recipe.image ? (
                                                    <img 
                                                        src={recipe.image} 
                                                        alt={recipe.title} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-xs text-gray-400">No Media Available</div>
                                                )}

                                                <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-semibold backdrop-blur-md bg-white/90 z-10 shadow-xs ${
                                                    recipe.difficulty === 'Easy' ? 'text-emerald-700' :
                                                    recipe.difficulty === 'Medium' ? 'text-amber-700' : 'text-rose-700'
                                                }`}>
                                                    {recipe.difficulty || "Easy"}
                                                </span>
                                            </div>

                                            {/* Card Content & Expandable Section */}
                                            <div className="p-6 space-y-4">
                                                <h3 className="text-lg font-serif font-bold text-[#171914]">{recipe.title}</h3>

                                                {/* Expanded Content: Ingredients & Instructions */}
                                                {isExpanded ? (
                                                    <div className="space-y-4 pt-2 border-t border-gray-100 text-xs text-gray-600 animate-fadeIn">
                                                        
                                                        {/* Ingredients List */}
                                                        <div>
                                                            <h4 className="font-semibold uppercase tracking-wider text-[#41433e] mb-1.5">Ingredients:</h4>
                                                            <ul className="list-disc list-inside space-y-1">
                                                                {recipe.ingredients?.map((item, idx) => (
                                                                    <li key={idx}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>

                                                        {/* Instructions List */}
                                                        <div>
                                                            <h4 className="font-semibold uppercase tracking-wider text-[#41433e] mb-1.5">Instructions:</h4>
                                                            <ol className="list-decimal list-inside space-y-1.5">
                                                                {recipe.instructions?.map((step, idx) => (
                                                                    <li key={idx} className="leading-relaxed">{step}</li>
                                                                ))}
                                                            </ol>
                                                        </div>

                                                    </div>
                                                ) : (
                                                    /* Collapsed preview */
                                                    <p className="text-xs text-gray-500 line-clamp-2">
                                                        Ingredients: {recipe.ingredients?.join(", ")}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Card Footer: Toggle Button & Creator Attribution */}
                                        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-xs bg-gray-50/50">
                                            <span className="text-gray-400">By {recipe.createdBy?.username || "Creator"}</span>
                                            
                                            <button 
                                                onClick={() => toggleExpand(recipe._id)}
                                                className="text-[#506650] font-semibold hover:underline cursor-pointer"
                                            >
                                                {isExpanded ? "Show Less ▲" : "View Recipe ▼"}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}