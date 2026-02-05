import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function GET(req, context) {
  try {
    await connectDB();

  
    const { id } = await context.params;

    const recipe = await Recipe.findById(id)
      .populate("userId", "name email");

    if (!recipe) {
      return Response.json({ error: "Recipe not found" }, { status: 404 });
    }

    return Response.json(recipe);

  } catch (error) {
    console.error("GET RECIPE ERROR:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}