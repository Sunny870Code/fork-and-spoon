import React, { useState } from "react";

// Helper function to convert standard YouTube links into playable embed URLs
const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};

const RecipeCard = ({ recipe }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Safety check so it never crashes if recipe is undefined
    if (!recipe) return null;

    const embedUrl = getYouTubeEmbedUrl(recipe.youtubeUrl);

    // Difficulty badge styling helper with rich earthy/vibrant tones
    const getDifficultyStyle = (diff) => {
        switch (diff?.toLowerCase()) {
            case 'medium': return 'bg-amber-50/90 text-amber-800 border-amber-200/60';
            case 'hard': return 'bg-rose-50/90 text-rose-800 border-rose-200/60';
            default: return 'bg-emerald-50/90 text-emerald-800 border-emerald-200/60';
        }
    };

    return (
        <div className="max-w-2xl mx-auto w-full bg-white rounded-[2rem] shadow-[0_4px_25px_-4px_rgba(0,0,0,0.05)] border border-[#deded8]/80 overflow-hidden transition-all duration-300 hover:shadow-[0_10px_35px_-5px_rgba(80,102,80,0.1)] group">
            
            {/* TOP MEDIA SECTION: YouTube Video or Image */}
            <div className="relative h-60 sm:h-68 w-full bg-gradient-to-br from-gray-100 to-[#faf9f6] overflow-hidden">
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
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-400 font-medium">No Image Available</div>
                )}

                {/* Soft gradient shadow overlay at the top for badge pop */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

                {/* Difficulty Badge Overlay with Frosted Glass Effect */}
                <span className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-[11px] font-semibold backdrop-blur-md border shadow-xs z-10 transition-transform duration-300 hover:scale-105 ${getDifficultyStyle(recipe.difficulty)}`}>
                    {recipe.difficulty || "Easy"}
                </span>
            </div>

            {/* CONTENT AREA WITH SUBTLE BACKGROUND ACCENT */}
            <div className="p-6 sm:p-8 space-y-5 bg-gradient-to-b from-white via-white to-[#faf9f6]/30">
                
                {/* Title & Creator */}
                <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171914] tracking-tight group-hover:text-[#506650] transition-colors capitalize">
                        {recipe.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">
                        Recipe by <span className="text-[#506650] font-semibold capitalize">{recipe.createdBy?.username || "Community Creator"}</span>
                    </p>
                </div>

                {/* Ingredients Preview/List Container */}
                <div className="bg-[#faf9f6] rounded-2xl p-4 border border-[#deded8]/50 space-y-1.5 capitalize">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#506650]">Ingredients</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(" • ") : recipe.ingredients}
                    </p>
                </div>

                {/* EXPANDABLE INSTRUCTIONS ACCORDION */}
                <div className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1200px] opacity-100 pt-1' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-[#faf9f6] rounded-2xl p-4 border border-[#deded8]/50 space-y-2.5">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#506650]">Step-by-Step Instructions</h4>
                        <ol className="space-y-2.5">
                            {recipe.instructions?.map((step, index) => (
                                <li key={index} className="text-xs text-gray-600 flex gap-3 leading-relaxed capitalize">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#506650]/10 text-[#506650] font-bold flex items-center justify-center text-[10px]">
                                        {index + 1}
                                    </span>
                                    <span className="pt-0.5">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                {/* BOTTOM ACTION BAR */}
                <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs font-semibold text-[#506650] hover:text-[#3f533f] flex items-center gap-1.5 cursor-pointer py-1 group/btn"
                    >
                        <span>{isExpanded ? 'Hide Full Recipe' : 'View Full Recipe'}</span>
                        <svg className={`w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-y-0.5 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {recipe.youtubeUrl && !embedUrl && (
                        <a 
                            href={recipe.youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[11px] font-medium text-gray-400 hover:text-rose-600 transition-colors flex items-center gap-1"
                        >
                            <span>Watch on YouTube</span> &rarr;
                        </a>
                    )}
                </div>

            </div>
        </div>
    );
};

export default RecipeCard;