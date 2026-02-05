import { connectDB } from "@/lib/db";
import Recipe from "@/models/Recipe";

export async function POST(req) {
  try {
    const { recipeId, userId } = await req.json();

    if (!recipeId || !userId) {
      return Response.json(
        { error: "recipeId and userId required" },
        { status: 400 }
      );
    }

    await connectDB();

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return Response.json(
        { error: "Recipe not found" },
        { status: 404 }
      );
    }

    // Toggle like
    if (recipe.likes.includes(userId)) {
      recipe.likes.pull(userId);   // unlike
    } else {
      recipe.likes.push(userId);   // like
    }

    await recipe.save();

  
    return Response.json({
      likes: recipe.likes.length,
      liked: recipe.likes.includes(userId)
    });

  } catch (error) {
    console.error("LIKE ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}