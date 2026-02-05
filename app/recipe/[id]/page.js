// "use client";
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";

// export default function RecipeDetail() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [recipe, setRecipe] = useState(null);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     setUserId(localStorage.getItem("userId"));
//     loadRecipe();
//   }, [id]);

//   const loadRecipe = async () => {
//     const res = await fetch(`/api/recipes/${id}`);
//     const data = await res.json();
//     setRecipe(data);
//   };

//   const likeRecipe = async () => {
//     if (!userId) {
//       alert("Please login to like recipes");
//       return;
//     }
//     await fetch("/api/recipes/like", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ recipeId: id, userId })
//     });
//     loadRecipe();
//   };

//   if (!recipe) return <div style={{backgroundColor: "black", minHeight: "100vh", color: "white", padding: "20px"}}>Loading...</div>;

//   return (
//     <div style={{ backgroundColor: "black", minHeight: "100vh", color: "white", padding: "40px 20px" }}>
//       <div style={{ maxWidth: "800px", margin: "auto" }}>
        
//         <button 
//           onClick={() => router.back()} 
//           style={{ background: "transparent", color: "white", border: "1px solid white", padding: "8px 15px", cursor: "pointer", marginBottom: "20px" }}
//         >
//           ⬅ Back to Dashboard
//         </button>

//         {/* 📸 FOOD IMAGE */}
//        {recipe.image && (
//   <div style={{ position: "relative", width: "100%", height: "500px", marginBottom: "20px" }}>
//     <Image
//       src={recipe.image} 
//       alt={recipe.title} 
//       width={800} 
//       height={500} 
//       unoptimized={true} 
//       style={{ 
//         width: "100%", 
//         height: "auto", 
//         maxHeight: "500px", 
//         objectFit: "cover", 
//         borderRadius: "15px", 
//         border: "1px solid #333" 
//       }} 
//     />
//   </div>
// )}

//         <h1 style={{ fontSize: "42px", margin: "10px 0" }}>{recipe.title}</h1>
        
//         <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px", padding: "10px", background: "#111", borderRadius: "8px" }}>
//            {/* Note: We assume API returns user details via populate */}
//            <p style={{ margin: 0, color: "#bbb" }}>Submitted by: <strong style={{color: "white"}}>{recipe.userId?.name || "Unknown"}</strong></p>
//         </div>

//         <div style={{ display: "grid", gap: "30px" }}>
//           <section>
//             <h2 style={{ borderBottom: "2px solid white", display: "inline-block", paddingBottom: "5px" }}>INGREDIENTS</h2>
//             <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#ccc" }}>{recipe.ingredients}</p>
//           </section>

//           <section>
//             <h2 style={{ borderBottom: "2px solid white", display: "inline-block", paddingBottom: "5px" }}>STEPS</h2>
//             <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#ccc" }}>{recipe.steps}</p>
//           </section>
//         </div>

//         <div style={{ marginTop: "40px", borderTop: "1px solid #333", paddingTop: "20px" }}>
//           <button 
//             onClick={likeRecipe} 
//             style={{ padding: "12px 25px", fontSize: "18px", background: "white", color: "black", border: "none", borderRadius: "30px", cursor: "pointer", fontWeight: "bold" }}
//           >
//             {recipe.likes?.includes(userId) ? "❤️ Liked" : "🤍 Like"} — {recipe.likes?.length || 0}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

export default function RecipeDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    const res = await fetch(`/api/recipes/${id}`);
    const data = await res.json();
    setRecipe(data);
  };

  const likeRecipe = async () => {
    if (!userId) {
      alert("Please login to like recipes");
      return;
    }
    await fetch("/api/recipes/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id, userId })
    });
    loadRecipe();
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-foreground/10 border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* ===== TOP NAVIGATION ===== */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-sm font-medium hover:opacity-60 transition-opacity"
          >
            ← Back to Feed
          </button>
          <div className="flex items-center gap-4">
             <span className="text-xs uppercase tracking-widest text-foreground/40 font-bold">
               By {recipe.userId?.name || "Chef"}
             </span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-8">
        {/* ===== HERO IMAGE ===== */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-foreground/5"
        >
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
              <p className="text-foreground/20 italic">No image available</p>
            </div>
          )}
        </motion.div>

        {/* ===== HEADER ===== */}
        <header className="mt-12 mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tight mb-6"
          >
            {recipe.title}
          </motion.h1>
          
          <div className="flex justify-center items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={likeRecipe} 
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all shadow-lg ${
                recipe.likes?.includes(userId) 
                ? "bg-red-500 text-white" 
                : "bg-foreground text-background"
              }`}
            >
              {recipe.likes?.includes(userId) ? "❤️ Liked" : "🤍 Like"} 
              <span className="opacity-60">|</span>
              {recipe.likes?.length || 0}
            </motion.button>
          </div>
        </header>

        {/* ===== CONTENT GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-foreground/5 pt-12">
          
          {/* Sidebar: Ingredients */}
          <aside className="md:col-span-1">
            <h2 className="text-xs uppercase tracking-[0.2em] font-black mb-6 text-foreground/40">
              Ingredients
            </h2>
            <div className="space-y-4">
              {recipe.ingredients.split("\n").map((item, i) => (
                <div key={i} className="flex gap-3 text-sm leading-relaxed border-b border-foreground/5 pb-2">
                  <span className="text-foreground/20 font-mono italic">0{i+1}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Main: Steps */}
          <main className="md:col-span-2">
            <h2 className="text-xs uppercase tracking-[0.2em] font-black mb-6 text-foreground/40">
              Method
            </h2>
            <div className="space-y-12">
              {recipe.steps.split("\n").map((step, i) => (
                <div key={i} className="group flex gap-6">
                  <div className="flex-none w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center font-bold text-sm group-hover:bg-foreground group-hover:text-background transition-colors">
                    {i + 1}
                  </div>
                  <p className="text-lg leading-relaxed text-foreground/80 pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}