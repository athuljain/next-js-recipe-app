import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function DELETE(req) {
  try {
    await connectDB();
    const { recipeId, userId } = await req.json();

    
    const recipe = await Recipe.findOneAndDelete({ 
      _id: recipeId, 
      userId: userId 
    });

    if (!recipe) {
      return Response.json({ error: "Recipe not found or unauthorized" }, { status: 404 });
    }

    return Response.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return Response.json({ error: "Failed to delete" }, { status: 500 });
  }
}