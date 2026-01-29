import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function POST(req){
    const {recipeId,userId}=await req.json()
    await connectDB()
    const recipe=await Recipe.findById(recipeId);
     if (recipe.likes.includes(userId)) {
    recipe.likes.pull(userId);
  } else {
    recipe.likes.push(userId);
  }

    await recipe.save();
  return Response.json({ likes: recipe.likes.length });
}