import React from "react";
import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f2ec] via-[#eae5d8] to-[#dfd9cc] text-[#171914] py-16 px-6 sm:px-8 selection:bg-[#506650] selection:text-white">
            <div className="max-w-4xl mx-auto space-y-20">
                
                {/* 1. HERO INTRO */}
                <section className="text-center space-y-6 max-w-2xl mx-auto">
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#506650]/10 text-[#506650] text-xs font-semibold tracking-wider uppercase">
                        Our Philosophy
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-serif font-extrabold tracking-tight leading-[1.1]">
                        Bringing simplicity back to the kitchen.
                    </h1>
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        Fork & Spoon is a minimalist community-driven space where home creators, artisan chefs, and food lovers unite to share seasonal dishes, stories, and culinary inspiration without the clutter.
                    </p>
                </section>

                {/* 2. IMAGE COLLAGE SECTION */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                    <div className="rounded-3xl overflow-hidden h-72 shadow-sm border border-[#deded8] bg-white">
                        <img 
                            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" 
                            alt="Cooking prep" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="rounded-3xl overflow-hidden h-80 sm:-translate-y-6 shadow-sm border border-[#deded8] bg-white">
                        <img 
                            src="https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=800" 
                            alt="Fresh ingredients" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="rounded-3xl overflow-hidden h-72 shadow-sm border border-[#deded8] bg-white">
                        <img 
                            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800" 
                            alt="Healthy meal" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </section>

                {/* 3. CORE VALUES GRID */}
                <section className="grid sm:grid-cols-3 gap-8 pt-6">
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#deded8] shadow-sm space-y-3">
                        <span className="text-2xl">🌱</span>
                        <h3 className="font-serif font-bold text-lg text-[#171914]">Seasonal & Fresh</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            We champion whole ingredients and recipes that harmonize with natural seasons and sustainable living.
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#deded8] shadow-sm space-y-3">
                        <span className="text-2xl">🤝</span>
                        <h3 className="font-serif font-bold text-lg text-[#171914]">Creator First</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Empowering passionate food creators with direct publishing tools, video embedding, and total control over their craft.
                        </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#deded8] shadow-sm space-y-3">
                        <span className="text-2xl">✨</span>
                        <h3 className="font-serif font-bold text-lg text-[#171914]">Zero Clutter UI</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            No annoying pop-ups or walls of text. Just clean layouts, clear ingredient checklists, and step-by-step clarity.
                        </p>
                    </div>
                </section>

                {/* 4. CALL TO ACTION BANNER */}
                <section className="bg-[#171914] text-white rounded-[2.5rem] p-10 md:p-14 text-center space-y-6 shadow-xl relative overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#506650]/30 rounded-full blur-3xl pointer-events-none" />
                    
                    <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">Ready to share your signature dish?</h2>
                    <p className="text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                        Join our community of creators today, publish your first recipe card, and inspire home cooks worldwide.
                    </p>
                    
                    <div className="pt-2 flex flex-wrap justify-center gap-4">
                        <Link 
                            to="/register" 
                            className="px-8 py-3.5 rounded-full bg-[#506650] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3f533f] transition-colors shadow-sm"
                        >
                            Become a Creator
                        </Link>
                        <Link 
                            to="/recipeList" 
                            className="px-8 py-3.5 rounded-full border border-gray-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                        >
                            Explore Feed
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}