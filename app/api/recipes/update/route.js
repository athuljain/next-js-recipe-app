import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function PUT(req) {
  try {
    await connectDB();
    const { recipeId, userId, title, ingredients, steps, image } = await req.json();

    // Update the recipe ONLY if it belongs to the user
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, userId: userId },
      { title, ingredients, steps, image, status: "pending" }, // Reset to pending for re-approval
      { new: true }
    );

    if (!updatedRecipe) {
      return Response.json({ error: "Recipe not found or unauthorized" }, { status: 404 });
    }

    return Response.json({ message: "Updated successfully", recipe: updatedRecipe });
  } catch (error) {
    return Response.json({ error: "Update failed" }, { status: 500 });
  }
}