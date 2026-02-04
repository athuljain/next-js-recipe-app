"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

  if (!recipe) return <div style={{backgroundColor: "black", minHeight: "100vh", color: "white", padding: "20px"}}>Loading...</div>;

  return (
    <div style={{ backgroundColor: "black", minHeight: "100vh", color: "white", padding: "40px 20px" }}>
      <div style={{ maxWidth: "800px", margin: "auto" }}>
        
        <button 
          onClick={() => router.back()} 
          style={{ background: "transparent", color: "white", border: "1px solid white", padding: "8px 15px", cursor: "pointer", marginBottom: "20px" }}
        >
          ⬅ Back to Dashboard
        </button>

        {/* 📸 FOOD IMAGE */}
        {recipe.image && (
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            style={{ width: "100%", maxHeight: "500px", objectFit: "cover", borderRadius: "15px", border: "1px solid #333", marginBottom: "20px" }} 
          />
        )}

        <h1 style={{ fontSize: "42px", margin: "10px 0" }}>{recipe.title}</h1>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px", padding: "10px", background: "#111", borderRadius: "8px" }}>
           {/* Note: We assume API returns user details via populate */}
           <p style={{ margin: 0, color: "#bbb" }}>Submitted by: <strong style={{color: "white"}}>{recipe.userId?.name || "Unknown"}</strong></p>
        </div>

        <div style={{ display: "grid", gap: "30px" }}>
          <section>
            <h2 style={{ borderBottom: "2px solid white", display: "inline-block", paddingBottom: "5px" }}>INGREDIENTS</h2>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#ccc" }}>{recipe.ingredients}</p>
          </section>

          <section>
            <h2 style={{ borderBottom: "2px solid white", display: "inline-block", paddingBottom: "5px" }}>STEPS</h2>
            <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "#ccc" }}>{recipe.steps}</p>
          </section>
        </div>

        <div style={{ marginTop: "40px", borderTop: "1px solid #333", paddingTop: "20px" }}>
          <button 
            onClick={likeRecipe} 
            style={{ padding: "12px 25px", fontSize: "18px", background: "white", color: "black", border: "none", borderRadius: "30px", cursor: "pointer", fontWeight: "bold" }}
          >
            {recipe.likes?.includes(userId) ? "❤️ Liked" : "🤍 Like"} — {recipe.likes?.length || 0}
          </button>
        </div>
      </div>
    </div>
  );
}