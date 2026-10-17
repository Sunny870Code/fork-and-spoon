import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#faf9f6] via-[#f4f2ec] to-[#eae5d8] text-[#171914] px-4 sm:px-8 py-12 md:py-20 selection:bg-[#506650] selection:text-white">
            <div className="max-w-6xl mx-auto space-y-28 md:space-y-36">
                
                {/* 1. HERO SECTION */}
                <section className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-8">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#506650]/10 text-[#506650] text-xs font-bold tracking-widest uppercase shadow-xs">
                            Community Crafted Cuisine
                        </span>
                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-extrabold tracking-tight leading-[1.05]">
                            Where every recipe tells a story.
                        </h1>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg font-normal">
                            Explore minimalist, seasonal dishes shared by home creators and artisan chefs around the world. Discover video tutorials, precise ingredients, and share your own culinary journey.
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <button 
                                onClick={() => navigate("/RecipeList")}
                                className="px-8 py-4 rounded-full bg-[#506650] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#3f533f] transition-all shadow-md cursor-pointer hover:scale-105"
                            >
                                Explore Recipes Feed &rarr;
                            </button>
                            <button 
                                onClick={() => navigate("/signin")}
                                className="px-8 py-4 rounded-full border-2 border-[#deded8] bg-white/60 backdrop-blur-md text-[#171914] font-bold text-xs uppercase tracking-wider hover:bg-white hover:border-[#171914] transition-all cursor-pointer shadow-xs"
                            >
                                Creator Sign In
                            </button>
                        </div>
                    </div>

                    {/* Hero Image Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="rounded-[2rem] overflow-hidden h-72 shadow-lg border border-[#deded8] bg-white">
                                <img 
                                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800" 
                                    alt="Fresh salad bowl" 
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="rounded-[2rem] overflow-hidden h-44 shadow-lg border border-[#deded8] bg-white">
                                <img 
                                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800" 
                                    alt="Artisan Pizza" 
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 pt-10">
                            <div className="rounded-[2rem] overflow-hidden h-44 shadow-lg border border-[#deded8] bg-white">
                                <img 
                                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800" 
                                    alt="Healthy bowl" 
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="rounded-[2rem] overflow-hidden h-72 shadow-lg border border-[#deded8] bg-white">
                                <img 
                                    src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=800" 
                                    alt="Pancakes" 
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. LIVE STATS TRUST BAR */}
                <section className="bg-white/80 backdrop-blur-md rounded-[2.5rem] border border-[#deded8] p-8 md:p-12 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div className="space-y-1">
                        <h4 className="text-3xl md:text-4xl font-serif font-extrabold text-[#506650]">100%</h4>
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Community Driven</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-3xl md:text-4xl font-serif font-extrabold text-[#171914]">4K+</h4>
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Active Cooks</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-3xl md:text-4xl font-serif font-extrabold text-[#506650]">HD</h4>
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Video Tutorials</p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-3xl md:text-4xl font-serif font-extrabold text-[#171914]">0</h4>
                        <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Annoying Ads</p>
                    </div>
                </section>

                {/* 3. HOW IT WORKS (THE WORKFLOW) */}
                <section className="space-y-12">
                    <div className="text-center max-w-xl mx-auto space-y-3">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-[#506650]">Seamless Experience</span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold">How Fork & Spoon Works</h2>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">Designed for speed, clarity, and visual appetite.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-[2rem] p-8 border border-[#deded8] shadow-sm space-y-4 hover:border-[#506650] transition-colors">
                            <span className="w-12 h-12 rounded-2xl bg-[#506650]/10 text-[#506650] font-bold text-lg flex items-center justify-center">01</span>
                            <h3 className="font-serif font-bold text-xl">Discover Feed</h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                Browse through community-published dishes complete with difficulty ratings, detailed checklists, and creator attributions.
                            </p>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 border border-[#deded8] shadow-sm space-y-4 hover:border-[#506650] transition-colors">
                            <span className="w-12 h-12 rounded-2xl bg-[#506650]/10 text-[#506650] font-bold text-lg flex items-center justify-center">02</span>
                            <h3 className="font-serif font-bold text-xl">Watch & Cook</h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                Follow step-by-step instructions or watch embedded YouTube video tutorials directly inside the interactive recipe cards.
                            </p>
                        </div>

                        <div className="bg-white rounded-[2rem] p-8 border border-[#deded8] shadow-sm space-y-4 hover:border-[#506650] transition-colors">
                            <span className="w-12 h-12 rounded-2xl bg-[#506650]/10 text-[#506650] font-bold text-lg flex items-center justify-center">03</span>
                            <h3 className="font-serif font-bold text-xl">Publish & Share</h3>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                                Log in as a verified creator to instantly publish your own secret recipes, add ingredients, and build your foodie following.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. FEATURED SEASONAL SPOTLIGHT (CARD PREVIEW) */}
                <section className="bg-white rounded-[2.5rem] border border-[#deded8] p-8 md:p-12 shadow-sm grid md:grid-cols-2 gap-10 items-center">
                    <div className="rounded-3xl overflow-hidden h-80 bg-gray-100 shadow-inner">
                        <img 
                            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" 
                            alt="Avocado Salad Spotlight" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    <div className="space-y-6">
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider border border-emerald-200">
                            Editor's Choice
                        </span>
                        <h3 className="text-3xl font-serif font-bold">Artisan Harvest Avocado Bowl</h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                            A refreshing blend of crisp greens, toasted seeds, and creamy artisanal avocado dressing. Crafted by our top community creators to energize your morning ritual.
                        </p>
                        <div className="pt-2">
                            <button 
                                onClick={() => navigate("/RecipeList")}
                                className="px-7 py-3 rounded-full bg-[#171914] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#506650] transition-colors shadow-sm cursor-pointer"
                            >
                                View Recipe in Feed &rarr;
                            </button>
                        </div>
                    </div>
                </section>

                {/* 5. CREATOR SPOTLIGHT QUOTE */}
                <section className="max-w-3xl mx-auto text-center space-y-6 py-8">
                    <span className="text-4xl text-[#506650]">“</span>
                    <blockquote className="text-xl sm:text-2xl font-serif font-medium leading-relaxed text-[#171914]">
                        Publishing my pasta recipes here took zero effort, and seeing other home cooks try my video tutorials is absolute magic.
                    </blockquote>
                    <div className="space-y-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#506650]">Chef Elena Vance</p>
                        <p className="text-[11px] text-gray-400">Verified Master Creator</p>
                    </div>
                </section>

                {/* 6. FINAL HIGH-CONVERSION BANNER */}
                <section className="bg-[#171914] text-white rounded-[3rem] p-10 md:p-16 text-center space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-[#506650]/40 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="space-y-3 max-w-2xl mx-auto relative z-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#8fa88f]">Join the Movement</span>
                        <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight">Ready to share your signature dish?</h2>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                            Sign up today to unlock your creator dashboard, publish recipes, and connect with fellow culinary minimalists.
                        </p>
                    </div>
                    
                    <div className="pt-2 flex flex-wrap justify-center gap-4 relative z-10">
                        <Link 
                            to="/register" 
                            className="px-8 py-4 rounded-full bg-[#506650] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#3f533f] transition-all shadow-md cursor-pointer hover:scale-105"
                        >
                            Get Started Free
                        </Link>
                        <Link 
                            to="/RecipeList" 
                            className="px-8 py-4 rounded-full border border-gray-700 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all cursor-pointer"
                        >
                            Explore Community Feed
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
}