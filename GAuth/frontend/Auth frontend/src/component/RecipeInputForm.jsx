// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../services/auth.api";

// const RecepieInputForm = () => {
//     const navigate = useNavigate();

//     // Single unified state object
//     const [formData, setFormData] = useState({
//         title: "",
//         image: "",
//         difficulty: "Easy",
//         ingredients: [""],
//         instructions: [""]
//     });

//     const [loading, setLoading] = useState(false);

//     // Handler for standard text inputs and select dropdown
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // Handlers for dynamic array fields (ingredients & instructions)
//     const handleArrayChange = (index, value, field) => {
//         const list = [...formData[field]];
//         list[index] = value;
//         setFormData((prev) => ({
//             ...prev,
//             [field]: list
//         }));
//     };

//     const addField = (field) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: [...prev[field], ""]
//         }));
//     };

//     const removeField = (index, field) => {
//         const list = formData[field].filter((_, i) => i !== index);
//         setFormData((prev) => ({
//             ...prev,
//             [field]: list
//         }));
//     };

//     // Form submission handler
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // Filter out empty lines before sending
//         const filteredIngredients = formData.ingredients.filter(item => item.trim() !== "");
//         const filteredInstructions = formData.instructions.filter(item => item.trim() !== "");

//         const payload = {
//             ...formData,
//             ingredients: filteredIngredients,
//             instructions: filteredInstructions
//         };

//         try {
//             await api.post("api/recipes/recipes", payload);
//             alert("Recipe published successfully!");
//             navigate("/RecipeList");
//         } catch (err) {
//             console.error("Network error:", err);
//             if (err.response?.status === 403) {
//                 alert("Access Denied: Only Creators or Admins can publish recipes.");
//                 navigate("/");
//                 return;
//             }

//             alert(err.response?.data?.error || err.response?.data?.message || "Something went wrong connecting to the server.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-[#faf9f6] py-12 px-4 sm:px-6">
//             <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-[#deded8] p-8 md:p-12">
                
//                 {/* Header */}
//                 <div className="mb-8 text-center">
//                     <h1 className="text-2xl font-serif font-bold text-[#171914]">Share Your Recipe</h1>
//                     <p className="text-xs text-gray-500 mt-1">Add your ingredients and step-by-step instructions for the community.</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-6">
                    
//                     {/* Title */}
//                     <div>
//                         <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Recipe Title</label>
//                         <input 
//                             type="text" 
//                             name="title"
//                             required
//                             placeholder="e.g., Creamy White Sauce Pasta" 
//                             value={formData.title} 
//                             onChange={handleChange} 
//                             className="w-full px-4 py-3 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
//                         />
//                     </div>

//                     {/* Image URL */}
//                     <div>
//                         <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Image URL</label>
//                         <input 
//                             type="url" 
//                             name="image"
//                             required
//                             placeholder="https://images.unsplash.com/photo-..." 
//                             value={formData.image} 
//                             onChange={handleChange} 
//                             className="w-full px-4 py-3 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
//                         />
//                     </div>

//                     {/* Difficulty Selection */}
//                     <div>
//                         <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Difficulty</label>
//                         <select 
//                             name="difficulty"
//                             value={formData.difficulty} 
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-white cursor-pointer"
//                         >
//                             <option value="Easy">Easy</option>
//                             <option value="Medium">Medium</option>
//                             <option value="Hard">Hard</option>
//                         </select>
//                     </div>

//                     {/* Dynamic Ingredients Section */}
//                     <div>
//                         <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Ingredients</label>
//                         {formData.ingredients.map((ingredient, index) => (
//                             <div key={index} className="flex gap-2 mb-2">
//                                 <input 
//                                     type="text" 
//                                     required
//                                     placeholder={`Ingredient ${index + 1} (e.g., 2 cups Pasta)`}
//                                     value={ingredient}
//                                     onChange={(e) => handleArrayChange(index, e.target.value, "ingredients")}
//                                     className="w-full px-4 py-2.5 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
//                                 />
//                                 {formData.ingredients.length > 1 && (
//                                     <button 
//                                         type="button" 
//                                         onClick={() => removeField(index, "ingredients")}
//                                         className="px-3 text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer"
//                                     >
//                                         ✕
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                         <button 
//                             type="button" 
//                             onClick={() => addField("ingredients")}
//                             className="text-xs font-semibold text-[#506650] hover:underline mt-1 cursor-pointer"
//                         >
//                             + Add another ingredient
//                         </button>
//                     </div>

//                     {/* Dynamic Instructions Section */}
//                     <div>
//                         <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Instructions</label>
//                         {formData.instructions.map((step, index) => (
//                             <div key={index} className="flex gap-2 mb-2">
//                                 <input 
//                                     type="text" 
//                                     required
//                                     placeholder={`Step ${index + 1} (e.g., Boil pasta in salted water...)`}
//                                     value={step}
//                                     onChange={(e) => handleArrayChange(index, e.target.value, "instructions")}
//                                     className="w-full px-4 py-2.5 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
//                                 />
//                                 {formData.instructions.length > 1 && (
//                                     <button 
//                                         type="button" 
//                                         onClick={() => removeField(index, "instructions")}
//                                         className="px-3 text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer"
//                                     >
//                                         ✕
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                         <button 
//                             type="button" 
//                             onClick={() => addField("instructions")}
//                             className="text-xs font-semibold text-[#506650] hover:underline mt-1 cursor-pointer"
//                         >
//                             + Add another step
//                         </button>
//                     </div>

//                     {/* Submit Button */}
//                     <button 
//                         type="submit" 
//                         disabled={loading}
//                         className="w-full py-3.5 rounded-full bg-[#506650] text-white font-medium hover:bg-[#3f533f] transition-colors text-sm shadow-sm cursor-pointer mt-4 disabled:opacity-50"
//                     >
//                         {loading ? "Publishing Recipe..." : "Publish Recipe"}
//                     </button>

//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RecepieInputForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/auth.api";

const RecepieInputForm = () => {
    const navigate = useNavigate();

    // Single unified state object (added youtubeUrl)
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        youtubeUrl: "",
        difficulty: "Easy",
        ingredients: [""],
        instructions: [""]
    });

    const [loading, setLoading] = useState(false);

    // Handler for standard text inputs and select dropdown
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handlers for dynamic array fields (ingredients & instructions)
    const handleArrayChange = (index, value, field) => {
        const list = [...formData[field]];
        list[index] = value;
        setFormData((prev) => ({
            ...prev,
            [field]: list
        }));
    };

    const addField = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""]
        }));
    };

    const removeField = (index, field) => {
        const list = formData[field].filter((_, i) => i !== index);
        setFormData((prev) => ({
            ...prev,
            [field]: list
        }));
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Filter out empty lines before sending
        const filteredIngredients = formData.ingredients.filter(item => item.trim() !== "");
        const filteredInstructions = formData.instructions.filter(item => item.trim() !== "");

        const payload = {
            ...formData,
            ingredients: filteredIngredients,
            instructions: filteredInstructions
        };

        try {
            await api.post("api/recipes/recipes", payload);
            alert("Recipe published successfully!");
            navigate("/RecipeList");
        } catch (err) {
            console.error("Network error:", err);
            if (err.response?.status === 403) {
                alert("Access Denied: Only Creators or Admins can publish recipes.");
                navigate("/");
                return;
            }

            alert(err.response?.data?.error || err.response?.data?.message || "Something went wrong connecting to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#faf9f6] py-12 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-[#deded8] p-8 md:p-12">
                
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-serif font-bold text-[#171914]">Share Your Recipe</h1>
                    <p className="text-xs text-gray-500 mt-1">Add your ingredients, instructions, and video tutorial for the community.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Recipe Title</label>
                        <input 
                            type="text" 
                            name="title"
                            required
                            placeholder="e.g., Creamy White Sauce Pasta" 
                            value={formData.title} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Image URL</label>
                        <input 
                            type="url" 
                            name="image"
                            required
                            placeholder="https://images.unsplash.com/photo-..." 
                            value={formData.image} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
                        />
                    </div>

                    {/* 🚀 YouTube Video Link (Optional) */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">
                            YouTube Video Link <span className="text-gray-400 font-normal lowercase">(optional)</span>
                        </label>
                        <input 
                            type="url" 
                            name="youtubeUrl"
                            placeholder="https://www.youtube.com/watch?v=..." 
                            value={formData.youtubeUrl} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
                        />
                    </div>

                    {/* Difficulty Selection */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Difficulty</label>
                        <select 
                            name="difficulty"
                            value={formData.difficulty} 
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-white cursor-pointer"
                        >
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    {/* Dynamic Ingredients Section */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Ingredients</label>
                        {formData.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input 
                                    type="text" 
                                    required
                                    placeholder={`Ingredient ${index + 1} (e.g., 2 cups Pasta)`}
                                    value={ingredient}
                                    onChange={(e) => handleArrayChange(index, e.target.value, "ingredients")}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
                                />
                                {formData.ingredients.length > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={() => removeField(index, "ingredients")}
                                        className="px-3 text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <button 
                            type="button" 
                            onClick={() => addField("ingredients")}
                            className="text-xs font-semibold text-[#506650] hover:underline mt-1 cursor-pointer"
                        >
                            + Add another ingredient
                        </button>
                    </div>

                    {/* Dynamic Instructions Section */}
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#41433e] mb-2">Instructions</label>
                        {formData.instructions.map((step, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input 
                                    type="text" 
                                    required
                                    placeholder={`Step ${index + 1} (e.g., Boil pasta in salted water...)`}
                                    value={step}
                                    onChange={(e) => handleArrayChange(index, e.target.value, "instructions")}
                                    className="w-full px-4 py-2.5 rounded-xl border border-[#deded8] focus:outline-none focus:border-[#506650] text-sm bg-[#faf9f6]/50"
                                />
                                {formData.instructions.length > 1 && (
                                    <button 
                                        type="button" 
                                        onClick={() => removeField(index, "instructions")}
                                        className="px-3 text-red-500 hover:text-red-700 text-xs font-bold cursor-pointer"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                        <button 
                            type="button" 
                            onClick={() => addField("instructions")}
                            className="text-xs font-semibold text-[#506650] hover:underline mt-1 cursor-pointer"
                        >
                            + Add another step
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-3.5 rounded-full bg-[#506650] text-white font-medium hover:bg-[#3f533f] transition-colors text-sm shadow-sm cursor-pointer mt-4 disabled:opacity-50"
                    >
                        {loading ? "Publishing Recipe..." : "Publish Recipe"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default RecepieInputForm;