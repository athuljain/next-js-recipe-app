"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function RecipeDetail() {
  const params = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`/api/recipes/${params.id}`);
      const data = await res.json();
      setRecipe(data);
    };

    fetchRecipe();
  }, [params.id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
      <button onClick={() => router.back()}>⬅ Back</button>

      <h1>{recipe.title}</h1>

      <p><strong>Submitted by:</strong> {recipe.userName}</p>

      <p><strong>Ingredients:</strong></p>
      <p>{recipe.ingredients}</p>

      <p><strong>Status:</strong> {recipe.status}</p>

      <p><strong>Likes:</strong> ❤️ {recipe.likes.length}</p>
    </div>
  );
}
