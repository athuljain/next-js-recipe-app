"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  // ✅ Get logged user from localStorage
  useEffect(() => {
    const id = localStorage.getItem("userId");
    const name = localStorage.getItem("name");

    setUserId(id);
    setUserName(name);
  }, []);

  // ✅ Load recipes
  const loadRecipes = async () => {
    const res = await fetch("/api/recipes/get");
    const data = await res.json();

    // only approved recipes
    const approvedOnly = data.filter(r => r.status === "approved");

    setRecipes(approvedOnly);
    setLoading(false);
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // ✅ Like recipe
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

    loadRecipes(); // refresh list
  };

  return (
    <div style={{ padding: "20px" }}>

      {/* ===== HEADER ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h1>All Recipes</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => router.push("/submit")}>
            ➕ Add Recipe
          </button>

          <button
            onClick={() => router.push("/profile")}
            style={{
              padding: "8px 15px",
              borderRadius: "8px",
              background: "#333",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            👤 {userName || "User"}
          </button>
        </div>
      </div>

      {/* ===== LOADING ===== */}
      {loading && <p>Loading...</p>}

      {/* ===== RECIPES GRID ===== */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        {recipes.map((r) => (
          <div
            key={r._id}
            onClick={() => router.push(`/recipe/${r._id}`)}
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "15px",
              width: "280px",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          >
            <p><b>Submitted by:</b> {r.userName || "Unknown"}</p>

            <h3>{r.title}</h3>
            <p>{r.ingredients}</p>

            {/* LIKE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                likeRecipe(r._id);
              }}
              style={{ marginTop: "10px" }}
            >
              {r.likes?.includes(userId) ? "❤️" : "🤍"} {r.likes?.length || 0}
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
