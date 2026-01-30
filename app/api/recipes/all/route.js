import { connectDB } from "../../../../lib/db";
import Recipe from "../../../../models/Recipe";

export async function GET() {
  await connectDB();

  const recipes = await Recipe.find()
    .populate("userId", "name email")
    .lean();

  return Response.json(recipes);
}