"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Load userId after page loads
  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);
  }, []);

  const loadRecipes = async () => {
    const res = await fetch("/api/recipes/get");
    const data = await res.json();
    setRecipes(data);
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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        recipeId: id,
        userId
      })
    });

    loadRecipes();
  };

  return (
    <div>
      <h1>All Recipes</h1>

      <a href="/submit">➕ Add Recipe</a>

      {loading && <p>Loading...</p>}

      {recipes.map((r) => (
        <div
          key={r._id}
          style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}
        >
          <h3>{r.title}</h3>
          <p>{r.ingredients}</p>

          <button onClick={() => likeRecipe(r._id)}>
            {r.likes.includes(userId) ? "❤️" : "🤍"} {r.likes.length}
          </button>
        </div>
      ))}
    </div>
  );
}
