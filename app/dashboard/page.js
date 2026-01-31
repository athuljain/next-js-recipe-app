"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const loadRecipes = async () => {
   const res = await fetch("/api/recipes/get");
  const data = await res.json();

  // ✅ keep only approved
  const approvedOnly = data.filter(r => r.status === "approved");

  setRecipes(approvedOnly);
  setLoading(false);
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const likeRecipe = async (id) => {
    if (!userId) {
      alert("Please login to like recipes");
      return;
    }

    await fetch("/api/recipes/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id, userId }),
    });

    loadRecipes();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
      <h1>All Recipes</h1>
      <a href="/submit">➕ Add Recipe</a>

      {loading && <p>Loading...</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {recipes.map((r) => (
          <div
            key={r._id}
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "15px",
              width: "300px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
            }}
           onClick={() => router.push(`/recipe/${r._id}`)}
          >
            {/* User Info */}
            <p style={{ fontWeight: "bold", marginBottom: 5 }}>
              Submitted by: {r.userName || "Unknown"}
            </p>

            {/* Recipe Title & Ingredients */}
            <h3>{r.title}</h3>
            <p>{r.ingredients}</p>

            {/* Recipe Status */}
            {/* {r.status && (
              <p>
                <strong>Status:</strong> {r.status}
              </p>
            )} */}

            {/* Likes Button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent navigation when clicking like
                likeRecipe(r._id);
              }}
              style={{ marginTop: 10 }}
            >
              {r.likes.includes(userId) ? "❤️" : "🤍"} {r.likes.length}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
