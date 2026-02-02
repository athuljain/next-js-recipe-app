"use client";
import { useEffect,  useState  } from "react";
import { useParams, useRouter } from "next/navigation";

export default function RecipeDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState(null);
  const [userId, setUserId] = useState(null);

  // Load userId
  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  // Fetch recipe
  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    const res = await fetch(`/api/recipes/${id}`);
    const data = await res.json();
    setRecipe(data);
  };

  // ❤️ Like
  const likeRecipe = async () => {
    if (!userId) {
      alert("Please login to like recipes");
      return;
    }

    await fetch("/api/recipes/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeId: id,
        userId
      })
    });

    // reload updated data
    loadRecipe();
  };

  if (!recipe) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20, maxWidth: 700, margin: "auto" }}>
      <button onClick={() => router.back()}>⬅ Back</button>

      <h1>{recipe.title}</h1>
      <p><strong>Submitted by:</strong> {recipe.userId?.name}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Status:</strong> {recipe.status}</p>

      <button onClick={likeRecipe}>
        {recipe.likes?.includes(userId) ? "❤️" : "🤍"}{" "}
        {recipe.likes?.length || 0}
      </button>
    </div>
  );
}
